import { getProperties } from '@/sanity/lib/queries'
import { Building2, Plus } from 'lucide-react'
import Link from 'next/link'

// export const revalidate = 0 // Disable cache to see live updates from Sanity Studio

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Registered Properties</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage bulk waste generator properties, societies, and commercial parks.
          </p>
        </div>
        <Link
          href="/studio"
          target="_blank"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Property in Studio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Property Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Units</th>
                <th className="py-3 px-4">Facility Manager</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No properties found. Add your first property inside the Sanity Studio!
                  </td>
                </tr>
              ) : (
                properties.map((prop: any) => (
                  <tr key={prop._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      {prop.propertyName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">
                        {prop.category || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{prop.address || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{prop.totalUnits || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{prop.contactPerson || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{prop.phone || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}