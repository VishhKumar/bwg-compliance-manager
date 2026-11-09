export default {
  name: 'complianceControl',
  title: 'Statutory Compliance Checklists',
  type: 'document',
  fields: [
    { name: 'controlTitle', title: 'Compliance Rule / Requirement', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Rule Details & Guidelines', type: 'text' },
    { 
      name: 'frequency', 
      title: 'Audit Frequency', 
      type: 'string',
      options: {
        list: [
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Annually', value: 'annually' }
        ]
      }
    },
    { 
      name: 'status', 
      title: 'Current Audit Status', 
      type: 'string',
      options: {
        list: [
          { title: 'Compliant', value: 'compliant' },
          { title: 'Action Required', value: 'action_required' },
          { title: 'Non-Compliant', value: 'non_compliant' }
        ]
      },
      initialValue: 'compliant'
    }
  ]
}