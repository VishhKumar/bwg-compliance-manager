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

    if (!body.propertyId || !body.date) {
      return NextResponse.json(
        { error: 'Property and Date are required fields.' },
        { status: 400 }
      )
    }

    const newLog = await writeClient.create({
      _type: 'dailyWasteLog',
      property: { _type: 'reference', _ref: body.propertyId },
      date: body.date,
      wetWasteKg: Number(body.wetKg) || 0,
      dryWasteKg: Number(body.dryKg) || 0,
      sanitaryWasteKg: Number(body.sanitaryKg) || 0,
      specialCareKg: Number(body.specialCareKg) || 0,
      remarks: body.notes || '',
    })

    revalidatePath('/daily-waste')
    revalidatePath('/')

    return NextResponse.json({ success: true, data: newLog })
  } catch (err: any) {
    console.error('API Error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to submit daily waste log.' },
      { status: 500 }
    )
  }
}