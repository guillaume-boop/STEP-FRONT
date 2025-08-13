'use client'
import { useEffect, useState } from 'react'

type Health = { ok: boolean; env?: string }

export default function HealthPage() {
  const [data, setData] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE
    if (!base) {
      setError('NEXT_PUBLIC_API_BASE manquant')
      return
    }
    fetch(`${base}/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Health>
      })
      .then(setData)
      .catch((e) => setError(e.message))
  }, [])

  if (error) return <pre>Erreur: {error}</pre>
  if (!data) return <p>Chargement…</p>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
