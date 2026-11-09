import { getVendors } from '@/sanity/lib/queries'
import RegisterVendorModal from '@/components/RegisterVendorModal'
import { Truck, CheckCircle2, XCircle } from 'lucide-react'

export default async function VendorsPage() {
  const vendors = await getVendors()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Authorized Waste Vendors</h1>
          <p className="text-sm text-slate-600 mt-1">
            Directory of certified recyclers and authorized municipal waste transporters.
          </p>
        </div>
        <RegisterVendorModal />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Vendor Name</th>
                <th className="py-3 px-4">License No.</th>
                <th className="py-3 px-4">Waste Category</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No authorized vendors found. Click &quot;Add Authorized Vendor&quot; to add your first recycler.
                  </td>
                </tr>
              ) : (
                vendors.map((v: any) => (
                  <tr key={v._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      {v.vendorName}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">{v.licenseNumber || '—'}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {v.wasteCategory || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{v.contactPerson || '—'}</div>
                      <div className="text-xs text-slate-400">{v.contactPhone || ''}</div>
                    </td>
                    <td className="py-3 px-4">
                      {v.isAuthorized ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Authorized
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                          <XCircle className="w-3.5 h-3.5" /> Pending Verification
                        </span>
                      )}
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