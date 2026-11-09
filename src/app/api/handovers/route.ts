import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { revalidatePath } from 'next/cache'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.propertyId || !body.vendorId || !body.handoverDate || !body.quantityKg) {
      return NextResponse.json(
        { error: 'Property, Vendor, Date, and Quantity are required.' },
        { status: 400 }
      )
    }

    const newHandover = await writeClient.create({
      _type: 'handover',
      property: { _type: 'reference', _ref: body.propertyId },
      vendor: { _type: 'reference', _ref: body.vendorId },
      handoverDate: body.handoverDate,
      wasteCategory: body.wasteCategory || 'recyclable',
      quantityKg: Number(body.quantityKg) || 0,
      receiptNumber: body.receiptNumber || '',
      notes: body.notes || '',
    })

    revalidatePath('/handovers')
    revalidatePath('/')

    return NextResponse.json({ success: true, data: newHandover })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to log handover.' },
      { status: 500 }
    )
  }
}