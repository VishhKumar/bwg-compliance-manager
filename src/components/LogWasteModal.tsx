'use client'

import { useState, useEffect } from 'react'
import { Plus, X, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogWasteModal({ properties }: { properties: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    propertyId: '',
    date: '',
    wetKg: '',
    dryKg: '',
    sanitaryKg: '',
    specialCareKg: '',
    notes: '',
  })

  // Safe client-side date hydration
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date().toISOString().split('T')[0],
    }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/daily-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsOpen(false)
        setFormData({
          propertyId: '',
          date: new Date().toISOString().split('T')[0],
          wetKg: '',
          dryKg: '',
          sanitaryKg: '',
          specialCareKg: '',
          notes: '',
        })
        router.refresh()
      } else {
        const data = await res.json()
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      alert('Failed to submit daily waste log.')
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
        Log Daily Waste
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
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Record Daily Waste Log</h2>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">Log Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Wet Waste (Kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 45.5"
                    value={formData.wetKg}
                    onChange={(e) => setFormData({ ...formData, wetKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dry Waste (Kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 30.0"
                    value={formData.dryKg}
                    onChange={(e) => setFormData({ ...formData, dryKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sanitary Waste (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 5.2"
                    value={formData.sanitaryKg}
                    onChange={(e) => setFormData({ ...formData, sanitaryKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Special Care / Haz (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 0"
                    value={formData.specialCareKg}
                    onChange={(e) => setFormData({ ...formData, specialCareKg: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks / Notes</label>
                <textarea
                  rows={2}
                  placeholder="Optional observations..."
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
                  {loading ? 'Submitting...' : 'Save Waste Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}