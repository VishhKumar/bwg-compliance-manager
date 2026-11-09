import { getVendors } from '@/sanity/lib/queries'
import { Users, Plus, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default async function VendorsPage() {
  const vendors = await getVendors()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Authorized Vendors & Recyclers</h1>
          <p className="text-sm text-slate-600 mt-1">Manage certified waste transporters, recyclers, and processors.</p>
        </div>
        <Link href="/studio" target="_blank" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Vendor in Studio
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Vendor Name</th>
                <th className="py-3 px-4">Service Type</th>
                <th className="py-3 px-4">Auth / License No.</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {vendors.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">No authorized vendors registered yet.</td></tr>
              ) : (
                vendors.map((v: any) => (
                  <tr key={v._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" /> {v.vendorName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 capitalize">
                        <ShieldCheck className="w-3 h-3" /> {v.serviceType || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">{v.authorizationNumber || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{v.contactPerson || '—'}</td>
                    <td className="py-3 px-4 text-slate-600">{v.phone || '—'}</td>
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