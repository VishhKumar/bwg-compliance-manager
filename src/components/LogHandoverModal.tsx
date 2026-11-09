'use client'

import { useState, useEffect } from 'react' // 1. Add useEffect here
import { Truck, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogHandoverModal({
  properties,
  vendors,
}: {
  properties: any[]
  vendors: any[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    propertyId: '',
    vendorId: '',
    handoverDate: '', // 2. Change this from new Date() to an empty string ''
    wasteCategory: 'recyclable',
    quantityKg: '',
    receiptNumber: '',
    notes: '',
  })

  // 3. Add this useEffect to safely assign today's date on the client side
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      handoverDate: new Date().toISOString().split('T')[0],
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/handovers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsOpen(false)
        setFormData({
          propertyId: '',
          vendorId: '',
          handoverDate: new Date().toISOString().split('T')[0],
          wasteCategory: 'recyclable',
          quantityKg: '',
          receiptNumber: '',
          notes: '',
        })
        router.refresh()
      } else {
        const data = await res.json()
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      alert('Failed to submit handover record.')
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
        Log Handover Pickup
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
              <h2 className="text-xl font-bold text-slate-900">Record Waste Handover Pickup</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Property *</label>
                <select
                  required
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">-- Choose Facility --</option>
                  {properties.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.propertyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Recycler / Vendor *
                </label>
                <select
                  required
                  value={formData.vendorId}
                  onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">-- Choose Authorized Vendor --</option>
                  {vendors.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.vendorName} ({v.wasteCategory})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Handover Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.handoverDate}
                    onChange={(e) => setFormData({ ...formData, handoverDate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Waste Category *
                  </label>
                  <select
                    value={formData.wasteCategory}
                    onChange={(e) => setFormData({ ...formData, wasteCategory: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="recyclable">Dry / Recyclables</option>
                    <option value="wet">Wet / Organic</option>
                    <option value="sanitary">Sanitary Waste</option>
                    <option value="e-waste">E-Waste</option>
                    <option value="hazardous">Hazardous</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Quantity Handed Over (Kg) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 120"
                    value={formData.quantityKg}
                    onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Receipt / Manifest No.
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. RCP-8832"
                    value={formData.receiptNumber}
                    onChange={(e) => setFormData({ ...formData, receiptNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
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
                  {loading ? 'Submitting...' : 'Save Handover'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}