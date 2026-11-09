import { groq } from 'next-sanity'
import { client } from './client'

// 1. Fetch all properties
export async function getProperties() {
  return await client.fetch(
    groq`*[_type == "property"] | order(_createdAt desc) {
      _id,
      propertyName,
      category,
      address,
      totalUnits,
      contactPerson,
      phone
    }`
  )
}

// 2. Fetch daily waste logs with property reference details
export async function getDailyWasteLogs() {
  return await client.fetch(
    groq`*[_type == "dailyWasteLog"] | order(date desc) {
      _id,
      date,
      "propertyName": property->propertyName,
      wetWasteKg,
      dryWasteKg,
      sanitaryWasteKg,
      specialCareKg,
      remarks
    }`
  )
}

// 3. Fetch handovers with vendor & property details
export async function getHandovers() {
  return await client.fetch(
    groq`*[_type == "handover"] | order(handoverDate desc) {
      _id,
      handoverDate,
      "propertyName": property->propertyName,
      "vendorName": vendor->vendorName,
      wasteCategory,
      quantityKg,
      receiptNumber
    }`
  )
}

// 4. Fetch dashboard metric totals
export async function getDashboardStats() {
  const [propertiesCount, totalWasteLogs, openIssuesCount] = await Promise.all([
    client.fetch(groq`count(*[_type == "property"])`),
    client.fetch(groq`*[_type == "dailyWasteLog"] { wetWasteKg, dryWasteKg }`),
    client.fetch(groq`count(*[_type == "issue" && status != "resolved"])`),
  ])

  const totalKg = totalWasteLogs.reduce(
    (acc: number, log: { wetWasteKg?: number; dryWasteKg?: number }) =>
      acc + (log.wetWasteKg || 0) + (log.dryWasteKg || 0),
    0
  )

  return {
    propertiesCount,
    totalKg,
    openIssuesCount,
  }
}