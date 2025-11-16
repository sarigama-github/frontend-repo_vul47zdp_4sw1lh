import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import { LoginForm, SignupForm } from './components/AuthForms'
import { BlogGrid, BlogPost } from './components/Blog'
import Contact from './components/Contact'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useAuth(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const cached = localStorage.getItem('auth')
    if(cached){ setUser(JSON.parse(cached)) }
  },[])
  const login = (data)=>{ setUser(data); localStorage.setItem('auth', JSON.stringify(data)) }
  const logout = ()=>{ setUser(null); localStorage.removeItem('auth') }
  return { user, login, logout }
}

function Home(){
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i)=>(
            <div key={i} className="rounded-2xl p-6 bg-white border border-slate-200 hover:shadow-sm transition-all">
              <h3 className="font-medium text-slate-800 mb-1">Elegant Card {i}</h3>
              <p className="text-slate-600 text-sm">Calm pastel backgrounds, rounded corners, and gentle shadows create a friendly, professional feel.</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function Dashboard(){
  const [data, setData] = useState(null)
  const auth = JSON.parse(localStorage.getItem('auth') || 'null')
  useEffect(()=>{
    const token = auth?.token
    fetch(`${API_URL}/api/dashboard?token=${token || ''}`).then(r=>r.json()).then(setData).catch(()=>{})
  },[])
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Dashboard</h2>
      {!data ? (
        <p className="text-slate-600">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-white border border-slate-200">
            <h3 className="font-medium text-slate-800 mb-1">{data.welcome}</h3>
            <p className="text-slate-600 text-sm">Here’s a quick overview of your workspace.</p>
          </div>
          {Object.entries(data.stats).map(([k,v])=> (
            <div key={k} className="rounded-2xl p-6 bg-white border border-slate-200">
              <div className="text-slate-400 text-xs">{k}</div>
              <div className="text-3xl font-semibold text-slate-800">{v}</div>
            </div>
          ))}
          <div className="md:col-span-3 rounded-2xl p-6 bg-white border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3">Quick actions</h4>
            <div className="flex gap-3 flex-wrap">
              {data.quick_actions.map(a => (
                <a key={a.href} href={a.href} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800">{a.label}</a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function BlogPostPage(){
  const { slug } = useParams()
  return <BlogPost slug={slug} />
}

function LoginPage({ onAuth }){
  return (
    <section className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Welcome back</h2>
      <div className="rounded-2xl p-6 bg-white border border-slate-200">
        <LoginForm onAuth={onAuth} />
      </div>
    </section>
  )
}

function SignupPage({ onAuth }){
  return (
    <section className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Create your account</h2>
      <div className="rounded-2xl p-6 bg-white border border-slate-200">
        <SignupForm onAuth={onAuth} />
      </div>
    </section>
  )
}

function Resources(){
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-6">
      <h2 className="text-2xl font-semibold text-slate-800">Resources</h2>
      <p className="text-slate-600 max-w-3xl">Curated links and guides to help you move faster with clarity.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="rounded-2xl p-6 bg-white border border-slate-200">
            <h3 className="font-medium text-slate-800 mb-2">Guide {i}</h3>
            <p className="text-slate-600 text-sm">Short, focused resources to deepen understanding without overwhelm.</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Pricing(){
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Simple pricing</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {name:'Starter', price:'Free', features:['Basic dashboard','Access to blog']},
          {name:'Pro', price:'$12/mo', features:['Everything in Starter','Priority support','Advanced analytics']},
          {name:'Teams', price:'$29/mo', features:['Everything in Pro','Team seats','Shared resources']},
        ].map(t => (
          <div key={t.name} className="rounded-2xl p-6 bg-white border border-slate-200">
            <h3 className="font-medium text-slate-800">{t.name}</h3>
            <div className="text-3xl font-semibold text-slate-800 my-2">{t.price}</div>
            <ul className="text-slate-600 text-sm space-y-1">
              {t.features.map(f => <li key={f}>• {f}</li>)}
            </ul>
            <button className="mt-4 w-full px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800">Choose</button>
          </div>
        ))}
      </div>
    </section>
  )
}

function Layout({ user, onLogout, children }){
  const location = useLocation()
  useEffect(()=>{ window.scrollTo(0,0) }, [location.pathname])
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <Navbar user={user} onLogout={onLogout} />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default function App(){
  const { user, login, logout } = useAuth()
  const handleAuth = (data)=>{ login(data) }
  return (
    <Routes>
      <Route path="/" element={<Layout user={user} onLogout={logout}><Home/></Layout>} />
      <Route path="/dashboard" element={<Layout user={user} onLogout={logout}><Dashboard/></Layout>} />
      <Route path="/resources" element={<Layout user={user} onLogout={logout}><Resources/></Layout>} />
      <Route path="/pricing" element={<Layout user={user} onLogout={logout}><Pricing/></Layout>} />
      <Route path="/support" element={<Layout user={user} onLogout={logout}><Contact/></Layout>} />
      <Route path="/contact" element={<Layout user={user} onLogout={logout}><Contact/></Layout>} />
      <Route path="/blog" element={<Layout user={user} onLogout={logout}><BlogGrid/></Layout>} />
      <Route path="/blog/:slug" element={<Layout user={user} onLogout={logout}><BlogPostPage/></Layout>} />
      <Route path="/login" element={<Layout user={user} onLogout={logout}><LoginPage onAuth={handleAuth}/></Layout>} />
      <Route path="/signup" element={<Layout user={user} onLogout={logout}><SignupPage onAuth={handleAuth}/></Layout>} />
    </Routes>
  )
}
