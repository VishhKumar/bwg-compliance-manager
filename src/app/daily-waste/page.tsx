import { getDailyWasteLogs, getProperties } from '@/sanity/lib/queries'
import ExportButton from '@/components/ExportButton'

import LogWasteModal from '@/components/LogWasteModal'
import { FileText } from 'lucide-react'

export default async function DailyWastePage() {
  const logs = await getDailyWasteLogs()
  const properties = await getProperties()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Daily Waste Logs</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track daily wet, dry, sanitary, and special care waste generation per property.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton 
            data={logs} 
            filename="daily-waste-audit-report"
            headers={['Date', 'Property Name', 'Wet Waste (Kg)', 'Dry Waste (Kg)', 'Sanitary Waste (Kg)', 'Special Care (Kg)', 'Remarks']}
            keys={['date', 'propertyName', 'wetWasteKg', 'dryWasteKg', 'sanitaryWasteKg', 'specialCareKg', 'remarks']}
            label="Export CSV Report"
          />
          <LogWasteModal properties={properties} />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Wet (Kg)</th>
                <th className="py-3 px-4">Dry (Kg)</th>
                <th className="py-3 px-4">Sanitary (Kg)</th>
                <th className="py-3 px-4">Special Care (Kg)</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No daily waste logs recorded yet. Click &quot;Log Daily Waste&quot; to submit your first entry.
                  </td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {log.date ? new Date(log.date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      {log.propertyName || '—'}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">{log.wetWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">{log.dryWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-purple-600 font-semibold">{log.sanitaryWasteKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-amber-600 font-semibold">{log.specialCareKg ?? 0} kg</td>
                    <td className="py-3 px-4 text-slate-500 text-xs truncate max-w-xs">{log.remarks || '—'}</td>
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