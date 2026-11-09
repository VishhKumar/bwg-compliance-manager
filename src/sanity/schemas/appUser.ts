import { defineField, defineType } from 'sanity'

export const appUser = defineType({
  name: 'appUser',
  title: 'App Users & Access Control',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active Access',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allowedTabs',
      title: 'Allowed Pages / Tabs',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Dashboard', value: 'dashboard' },
          { title: 'Properties', value: 'properties' },
          { title: 'Daily Waste Logs', value: 'daily-waste' },
          { title: 'Handovers & Pickups', value: 'handovers' },
          { title: 'Authorized Vendors', value: 'vendors' },
          { title: 'Compliance Rules', value: 'compliance' },
          { title: 'Inspection Issues', value: 'issues' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
})