import { getProperties } from '@/sanity/lib/queries'
import RegisterPropertyModal from '@/components/RegisterPropertyModal'
import { Building2 } from 'lucide-react'

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Registered Facilities</h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage bulk waste generator properties, housing societies, and commercial complexes.
          </p>
        </div>
        <RegisterPropertyModal />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Property Name</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Total Units</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Daily Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No registered properties found. Click &quot;Register New Property&quot; to add your first facility.
                  </td>
                </tr>
              ) : (
                properties.map((p: any) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      {p.propertyName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs">{p.address || '—'}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{p.totalUnits ?? 0} units</td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{p.contactPerson || '—'}</div>
                      <div className="text-xs text-slate-400">{p.contactEmail || ''}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">{p.dailyTargetKg ?? 0} kg/day</td>
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