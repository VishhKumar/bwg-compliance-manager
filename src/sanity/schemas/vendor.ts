export default {
  name: 'vendor',
  title: 'Authorized Vendors',
  type: 'document',
  fields: [
    { name: 'vendorName', title: 'Vendor / Agency Legal Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { 
      name: 'wasteTypeServiced', 
      title: 'Waste Stream Handled', 
      type: 'string',
      options: {
        list: [
          { title: 'Wet Waste / Composting', value: 'wet' },
          { title: 'Dry Waste / Recyclables', value: 'dry' },
          { title: 'Sanitary / Hazardous', value: 'sanitary' },
          { title: 'All Streams', value: 'all' }
        ]
      }
    },
    { name: 'licenseNumber', title: 'Authorized License / Authorization No.', type: 'string' },
    { name: 'licenseExpiry', title: 'License Expiration Date', type: 'date' },
    { name: 'contactPerson', title: 'Representative Name', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' }
  ]
}