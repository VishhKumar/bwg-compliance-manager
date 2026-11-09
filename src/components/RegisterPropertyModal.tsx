'use client'

import { useState } from 'react'
import { Building2, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPropertyModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    totalUnits: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    dailyTargetKg: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsOpen(false)
        setFormData({
          propertyName: '',
          address: '',
          totalUnits: '',
          contactPerson: '',
          contactEmail: '',
          contactPhone: '',
          dailyTargetKg: '',
        })
        router.refresh()
      } else {
        const data = await res.json()
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      alert('Failed to register property.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Register New Property
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative border border-slate-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Register Facility / Society</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Property / Society Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Heights Cooperative Housing"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street, Area, Pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Units / Flats *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 150"
                    value={formData.totalUnits}
                    onChange={(e) => setFormData({ ...formData, totalUnits: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Daily Waste Cap (Kg)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={formData.dailyTargetKg}
                    onChange={(e) => setFormData({ ...formData, dailyTargetKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  placeholder="Facility Manager Name"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="manager@domain.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Registering...' : 'Save Facility'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}