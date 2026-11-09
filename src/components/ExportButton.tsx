'use client'

import { Download } from 'lucide-react'

interface ExportButtonProps {
  data: any[]
  filename: string
  headers: string[]
  keys: string[]
  label?: string
}

export default function ExportButton({ data, filename, headers, keys, label = 'Export CSV' }: ExportButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No data available to export.')
      return
    }

    const csvRows: string[] = []
    
    // Add header row
    csvRows.push(headers.join(','))

    // Add data rows
    for (const row of data) {
      const values = keys.map((key) => {
        // Handle nested keys or direct properties
        const val = key.includes('.') 
          ? key.split('.').reduce((obj, k) => obj?.[k], row)
          : row[key]
        
        const escaped = '' + (val !== null && val !== undefined ? val : '')
        return `"${escaped.replace(/"/g, '""')}"`
      })
      csvRows.push(values.join(','))
    }

    // Create and trigger download
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
    >
      <Download className="w-4 h-4" />
      {label}
    </button>
  )
}