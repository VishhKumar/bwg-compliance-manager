export default {
  name: 'dailyWasteLog',
  title: 'Daily Waste Register',
  type: 'document',
  fields: [
    { name: 'date', title: 'Log Date', type: 'date', validation: (Rule: any) => Rule.required() },
    { 
      name: 'property', 
      title: 'Property', 
      type: 'reference', 
      to: [{ type: 'property' }],
      validation: (Rule: any) => Rule.required() 
    },
    { name: 'wetWasteKg', title: 'Wet Waste (Kg)', type: 'number', initialValue: 0 },
    { name: 'dryWasteKg', title: 'Dry Waste (Kg)', type: 'number', initialValue: 0 },
    { name: 'sanitaryWasteKg', title: 'Sanitary Waste (Kg)', type: 'number', initialValue: 0 },
    { name: 'specialCareKg', title: 'Special Care / E-Waste (Kg)', type: 'number', initialValue: 0 },
    { name: 'remarks', title: 'Operational Remarks', type: 'text' }
  ]
}