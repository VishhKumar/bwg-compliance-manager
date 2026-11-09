export default {
  name: 'property',
  title: 'Property Master',
  type: 'document',
  fields: [
    { name: 'propertyName', title: 'Property Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { 
      name: 'category', 
      title: 'Property Category', 
      type: 'string', 
      options: {
        list: [
          { title: 'Residential Society', value: 'residential' },
          { title: 'Commercial Complex / IT Park', value: 'commercial' },
          { title: 'Hotel / Restaurant', value: 'hospitality' },
          { title: 'Educational Institution', value: 'educational' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    { name: 'address', title: 'Full Address', type: 'text' },
    { name: 'totalUnits', title: 'Total Units / Offices', type: 'number' },
    { name: 'contactPerson', title: 'Facility Manager Name', type: 'string' },
    { name: 'phone', title: 'Contact Phone', type: 'string' },
  ]
}