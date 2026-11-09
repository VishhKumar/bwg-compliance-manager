export default {
  name: 'handover',
  title: 'Waste Handover Register',
  type: 'document',
  fields: [
    { name: 'handoverDate', title: 'Pickup Date & Time', type: 'datetime', validation: (Rule: any) => Rule.required() },
    { name: 'property', title: 'Property', type: 'reference', to: [{ type: 'property' }], validation: (Rule: any) => Rule.required() },
    { name: 'vendor', title: 'Assigned Vendor', type: 'reference', to: [{ type: 'vendor' }], validation: (Rule: any) => Rule.required() },
    { 
      name: 'wasteCategory', 
      title: 'Stream Handed Over', 
      type: 'string',
      options: {
        list: [
          { title: 'Wet Waste', value: 'wet' },
          { title: 'Dry Waste', value: 'dry' },
          { title: 'Sanitary Waste', value: 'sanitary' },
          { title: 'Special Care', value: 'special' }
        ]
      }
    },
    { name: 'quantityKg', title: 'Quantity Handed Over (Kg)', type: 'number', validation: (Rule: any) => Rule.required() },
    { name: 'receiptNumber', title: 'Vendor Challan / Receipt Number', type: 'string' }
  ]
}