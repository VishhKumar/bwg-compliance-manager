import Link from 'next/link'
import { Building2, Trash2, Truck, AlertTriangle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Compliance & Operations Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">
          Overview of bulk waste generator logs, pickups, and statutory requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Properties</span>
            <Building2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold mt-2 text-slate-900">--</p>
          <span className="text-xs text-slate-500">Registered Societies & Parks</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Today's Waste Log</span>
            <Trash2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold mt-2 text-slate-900">-- kg</p>
          <span className="text-xs text-slate-500">Aggregated wet + dry waste</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Vendor Pickups</span>
            <Truck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold mt-2 text-slate-900">--</p>
          <span className="text-xs text-slate-500">Scheduled for today</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Open Issues</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold mt-2 text-slate-900">--</p>
          <span className="text-xs text-slate-500">Action items pending resolution</span>
        </div>
      </div>
    </div>
  )
}