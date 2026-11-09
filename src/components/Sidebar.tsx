'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Building2, 
  Trash2, 
  Truck, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  LayoutDashboard,
  FileText
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Properties', href: '/properties', icon: Building2 },
  { name: 'Daily Waste Logs', href: '/daily-waste', icon: Trash2 },
  { name: 'Handovers & Pickups', href: '/handovers', icon: Truck },
  { name: 'Authorized Vendors', href: '/vendors', icon: Users },
  { name: 'Compliance Rules', href: '/compliance', icon: ShieldCheck },
  { name: 'Inspection Issues', href: '/issues', icon: AlertTriangle },
  { name: 'Sanity Studio', href: '/studio', icon: FileText, external: true },
]

export default function Sidebar() {
  const pathname = usePathname()

  // Hide main navigation sidebar inside embedded Sanity Studio route
  if (pathname.startsWith('/studio')) return null

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen p-4 flex flex-col border-r border-slate-800">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold tracking-tight text-emerald-400">
          BWG Compliance
        </h1>
        <p className="text-xs text-slate-400 mt-1">Bulk Waste Management</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 px-2">
        v1.0.0 — Next.js & Sanity
      </div>
    </aside>
  )
}