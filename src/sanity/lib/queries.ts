import { groq } from 'next-sanity'
import { client } from './client'
import { unstable_cache } from 'next/cache'

// 1. Fetch all properties
export const getProperties = unstable_cache(
  async () => {
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
  },
  ['properties-list'],
  { revalidate: 60, tags: ['properties'] }
)

// 2. Fetch daily waste logs
export const getDailyWasteLogs = unstable_cache(
  async () => {
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
  },
  ['daily-waste-logs-list'],
  { revalidate: 60, tags: ['daily-waste'] }
)

// 3. Fetch handovers
export const getHandovers = unstable_cache(
  async () => {
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
  },
  ['handovers-list'],
  { revalidate: 60, tags: ['handovers'] }
)

// 4. Fetch vendors
export const getVendors = unstable_cache(
  async () => {
    return await client.fetch(
      groq`*[_type == "vendor"] | order(vendorName asc) {
        _id,
        vendorName,
        serviceType,
        authorizationNumber,
        contactPerson,
        phone
      }`
    )
  },
  ['vendors-list'],
  { revalidate: 60, tags: ['vendors'] }
)

// 5. Fetch compliance rules
export const getComplianceControls = unstable_cache(
  async () => {
    return await client.fetch(
      groq`*[_type == "complianceControl"] | order(_createdAt desc) {
        _id,
        controlTitle,
        category,
        frequency,
        description
      }`
    )
  },
  ['compliance-list'],
  { revalidate: 60, tags: ['compliance'] }
)

// 6. Fetch inspection issues
export const getIssues = unstable_cache(
  async () => {
    return await client.fetch(
      groq`*[_type == "issue"] | order(_createdAt desc) {
        _id,
        title,
        "propertyName": property->propertyName,
        severity,
        status,
        reportedDate
      }`
    )
  },
  ['issues-list'],
  { revalidate: 60, tags: ['issues'] }
)

// 7. Fetch summary metrics for dashboard home
export const getDashboardStats = unstable_cache(
  async () => {
    const [propertiesCount, logs, openIssuesCount, vendorsCount] = await Promise.all([
      client.fetch(groq`count(*[_type == "property"])`),
      client.fetch(groq`*[_type == "dailyWasteLog"] { wetWasteKg, dryWasteKg, sanitaryWasteKg, specialCareKg }`),
      client.fetch(groq`count(*[_type == "issue" && status != "resolved"])`),
      client.fetch(groq`count(*[_type == "vendor"])`),
    ])

    const totalWasteKg = logs.reduce(
      (sum: number, log: any) =>
        sum + (log.wetWasteKg || 0) + (log.dryWasteKg || 0) + (log.sanitaryWasteKg || 0) + (log.specialCareKg || 0),
      0
    )

    return {
      totalProperties: propertiesCount || 0,
      totalWasteKg,
      openIssues: openIssuesCount || 0,
      activeVendors: vendorsCount || 0,
    }
  },
  ['dashboard-stats'],
  { revalidate: 60, tags: ['dashboard'] }
)