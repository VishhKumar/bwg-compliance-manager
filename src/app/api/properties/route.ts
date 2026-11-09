import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { revalidateTag } from 'next/cache'
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

    // Validate required fields
    if (!body.propertyName || !body.address || !body.totalUnits) {
      return NextResponse.json(
        { error: 'Property name, address, and unit count are required fields.' },
        { status: 400 }
      )
    }

    // Write new property document into Sanity dataset
    const newProperty = await writeClient.create({
      _type: 'property',
      propertyName: body.propertyName,
      address: body.address,
      totalUnits: Number(body.totalUnits) || 0,
      contactPerson: body.contactPerson || '',
      contactEmail: body.contactEmail || '',
      contactPhone: body.contactPhone || '',
      dailyTargetKg: Number(body.dailyTargetKg) || 0,
    })

    // Invalidate next/cache tags to immediately refresh UI tables & stats
   revalidatePath('/properties')
revalidatePath('/')

    return NextResponse.json({ success: true, data: newProperty })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to register property.' },
      { status: 500 }
    )
  }
}