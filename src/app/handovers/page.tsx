import { getHandovers } from '@/sanity/lib/queries'
import { Truck, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function HandoversPage() {
  const handovers = await getHandovers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Waste Handovers</h1>
          <p className="text-sm text-slate-600 mt-1">
            Track certified waste handovers from properties to authorized recyclers and vendors.
          </p>
        </div>
        <Link
          href="/studio"
          target="_blank"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Handover in Studio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Vendor / Recycler</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Quantity (Kg)</th>
                <th className="py-3 px-4">Receipt No.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {handovers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No waste handovers recorded yet.
                  </td>
                </tr>
              ) : (
                handovers.map((item: any) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {item.handoverDate ? new Date(item.handoverDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{item.propertyName || '—'}</td>
                    <td className="py-3 px-4 text-slate-600 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-blue-600" />
                      {item.vendorName || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {item.wasteCategory || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">{item.quantityKg ?? 0} kg</td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-500">{item.receiptNumber || '—'}</td>
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