import { useState } from 'react'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try{
      const res = await fetch(`${API_URL}/api/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, email, message }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed')
      setStatus('sent')
      setName(''); setEmail(''); setMessage('')
    }catch(err){ setStatus('error') }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Contact us</h2>
      <p className="text-slate-600 mb-6">Send an inquiry and we’ll get back to you.</p>
      <form onSubmit={submit} className="space-y-4 bg-white border border-slate-200 p-6 rounded-2xl">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"/>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"/>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Message</label>
          <textarea rows="5" value={message} onChange={e=>setMessage(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-200"/>
        </div>
        <button className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Send</button>
        {status==='sent' && <p className="text-green-600 text-sm">Message sent!</p>}
        {status==='error' && <p className="text-red-600 text-sm">Something went wrong.</p>}
      </form>
    </section>
  )
}
