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

    if (!body.vendorName || !body.wasteCategory) {
      return NextResponse.json(
        { error: 'Vendor Name and Waste Category are required fields.' },
        { status: 400 }
      )
    }

    const newVendor = await writeClient.create({
      _type: 'vendor',
      vendorName: body.vendorName,
      licenseNumber: body.licenseNumber || '',
      wasteCategory: body.wasteCategory,
      contactPerson: body.contactPerson || '',
      contactPhone: body.contactPhone || '',
      contactEmail: body.contactEmail || '',
      isAuthorized: body.isAuthorized ?? true,
    })

    revalidatePath('/vendors')
    revalidatePath('/')

    return NextResponse.json({ success: true, data: newVendor })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to register vendor.' },
      { status: 500 }
    )
  }
}