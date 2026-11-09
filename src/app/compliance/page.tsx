import { getComplianceControls } from '@/sanity/lib/queries'
import { ShieldAlert, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function CompliancePage() {
  const controls = await getComplianceControls()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Compliance & Regulatory Rules</h1>
          <p className="text-sm text-slate-600 mt-1">Review statutory waste management rules, bylaws, and audit frequencies.</p>
        </div>
        <Link href="/studio" target="_blank" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Rule in Studio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Control Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {controls.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">No compliance rules defined yet.</td></tr>
              ) : (
                controls.map((item: any) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" /> {item.controlTitle}
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-700">{item.category || 'General'}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 capitalize">
                        {item.frequency || 'Monthly'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 truncate max-w-sm">{item.description || '—'}</td>
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