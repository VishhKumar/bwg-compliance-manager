import { getDashboardStats, getDailyWasteLogs, getIssues } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { Building2, Trash2, AlertTriangle, Truck, ArrowUpRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'

export default async function DashboardPage() {
  // Signal to Next.js Cache Components that this request depends on a live connection
  await connection()

  // 1. Check for session cookie
  const cookieStore = await cookies()
  const userSession = cookieStore.get('app_user_session')?.value

  if (!userSession) {
    redirect('/sign-in')
  }

  // 2. Verify user in Sanity database with no-store cache strategy
  const userQuery = `*[_type == "appUser" && email == $email && isActive == true][0]{ _id, allowedTabs }`
  const authorizedUser = await client.fetch(
    userQuery, 
    { email: userSession }, 
    { cache: 'no-store' }
  )

  // If email isn't in Sanity or access is revoked, force login
  if (!authorizedUser) {
    redirect('/sign-in')
  }

  // 3. Fetch Dashboard Data
  const stats = await getDashboardStats()
  const recentLogs = (await getDailyWasteLogs()).slice(0, 5)
  const activeIssues = (await getIssues()).filter((i: any) => i.status !== 'resolved').slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">BWG Compliance Overview</h1>
          <p className="text-slate-600 mt-1">
            Real-time waste segregation monitoring, facility audits, and municipal compliance tracking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            target="_blank"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Open Sanity Studio
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered Properties</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">{stats.totalProperties}</span>
            <Link href="/properties" className="text-xs font-medium text-emerald-600 hover:underline flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Waste Tracked</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">{stats.totalWasteKg.toLocaleString()} <span className="text-sm font-normal text-slate-500">kg</span></span>
            <Link href="/daily-waste" className="text-xs font-medium text-blue-600 hover:underline flex items-center">
              Logs <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Open Infractions</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">{stats.openIssues}</span>
            <Link href="/issues" className="text-xs font-medium text-amber-600 hover:underline flex items-center">
              Inspect <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Certified Vendors</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">{stats.activeVendors}</span>
            <Link href="/vendors" className="text-xs font-medium text-purple-600 hover:underline flex items-center">
              Directory <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Daily Logs Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-emerald-600" /> Recent Daily Waste Activity
            </h2>
            <Link href="/daily-waste" className="text-xs font-medium text-emerald-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-sm">
            {recentLogs.length === 0 ? (
              <p className="py-6 text-center text-slate-500">No waste logs recorded yet.</p>
            ) : (
              recentLogs.map((log: any) => (
                <div key={log._id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{log.propertyName || 'Unassigned Facility'}</p>
                    <p className="text-xs text-slate-500">{log.date ? new Date(log.date).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
                      {(log.wetWasteKg || 0) + (log.dryWasteKg || 0)} kg wet+dry
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Inspection Issues Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Pending Non-Compliance Issues
            </h2>
            <Link href="/issues" className="text-xs font-medium text-amber-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-sm">
            {activeIssues.length === 0 ? (
              <p className="py-6 text-center text-slate-500">No pending issues! System fully compliant.</p>
            ) : (
              activeIssues.map((issue: any) => (
                <div key={issue._id} className="py-3.5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{issue.title}</p>
                    <p className="text-xs text-slate-500">{issue.propertyName || 'General'}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase ${
                    issue.severity === 'high' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {issue.severity || 'Medium'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}