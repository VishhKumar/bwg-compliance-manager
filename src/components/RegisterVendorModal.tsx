'use client'

import { useState } from 'react'
import { Truck, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterVendorModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    vendorName: '',
    licenseNumber: '',
    wasteCategory: 'recyclable',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    isAuthorized: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsOpen(false)
        setFormData({
          vendorName: '',
          licenseNumber: '',
          wasteCategory: 'recyclable',
          contactPerson: '',
          contactPhone: '',
          contactEmail: '',
          isAuthorized: true,
        })
        router.refresh()
      } else {
        const data = await res.json()
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      alert('Failed to register vendor.')
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
        Add Authorized Vendor
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
                <Truck className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Add Authorized Vendor / Recycler</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agency / Vendor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EcoClean Recyclers Pvt Ltd"
                  value={formData.vendorName}
                  onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Municipal License No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MPCB-AUT-9921"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Waste Category *
                  </label>
                  <select
                    value={formData.wasteCategory}
                    onChange={(e) => setFormData({ ...formData, wasteCategory: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="wet">Wet / Organic Waste</option>
                    <option value="recyclable">Dry / Recyclables</option>
                    <option value="sanitary">Sanitary Waste</option>
                    <option value="e-waste">E-Waste</option>
                    <option value="hazardous">Hazardous / Special Care</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  placeholder="Representative Name"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@vendor.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isAuthorized"
                  checked={formData.isAuthorized}
                  onChange={(e) => setFormData({ ...formData, isAuthorized: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <label htmlFor="isAuthorized" className="text-xs text-slate-700 font-medium">
                  Verified Municipal Authorized Vendor
                </label>
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
                  {loading ? 'Adding...' : 'Save Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}