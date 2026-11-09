import { getDailyWasteLogs } from '@/sanity/lib/queries'
import { Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

// export const revalidate = 0

export default async function DailyWastePage() {
  const logs = await getDailyWasteLogs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Daily Waste Registers</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track daily wet, dry, sanitary, and special care waste quantities.
          </p>
        </div>
        <Link
          href="/studio"
          target="_blank"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Waste Log
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Wet Waste (Kg)</th>
                <th className="py-3 px-4">Dry Waste (Kg)</th>
                <th className="py-3 px-4">Sanitary (Kg)</th>
                <th className="py-3 px-4">Special Care (Kg)</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No daily waste logs found recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {log.date ? new Date(log.date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{log.propertyName || 'Unassigned'}</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">{log.wetWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">{log.dryWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-amber-600">{log.sanitaryWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-purple-600">{log.specialCareKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-slate-500 truncate max-w-xs">{log.remarks || '—'}</td>
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