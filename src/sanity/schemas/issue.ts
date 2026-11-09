export default {
  name: 'issue',
  title: 'Inspection & Issues',
  type: 'document',
  fields: [
    { name: 'issueTitle', title: 'Observation / Issue Summary', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'property', title: 'Property', type: 'reference', to: [{ type: 'property' }] },
    { 
      name: 'severity', 
      title: 'Severity Level', 
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High (Critical)', value: 'high' }
        ]
      }
    },
    { name: 'dueDate', title: 'Target Resolution Date', type: 'date' },
    { 
      name: 'status', 
      title: 'Resolution Status', 
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Resolved', value: 'resolved' }
        ]
      },
      initialValue: 'open'
    }
  ]
}