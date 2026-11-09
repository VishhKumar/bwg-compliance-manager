import { getIssues } from '@/sanity/lib/queries'
import { AlertTriangle, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function IssuesPage() {
  const issues = await getIssues()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inspection Issues & Violations</h1>
          <p className="text-sm text-slate-600 mt-1">Track logged non-compliance infractions and corrective actions.</p>
        </div>
        <Link href="/studio" target="_blank" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Log Issue in Studio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Issue Title</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Reported Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {issues.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No inspection issues reported. Great job!</td></tr>
              ) : (
                issues.map((i: any) => (
                  <tr key={i._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" /> {i.title}
                    </td>
                    <td className="py-3 px-4 text-slate-700">{i.propertyName || '—'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                        i.severity === 'high' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {i.severity || 'Medium'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        i.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {i.status || 'Open'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">
                      {i.reportedDate ? new Date(i.reportedDate).toLocaleDateString() : '—'}
                    </td>
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