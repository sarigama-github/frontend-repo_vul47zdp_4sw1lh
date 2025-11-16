import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/resources', label: 'Resources' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/support', label: 'Support' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const base = 'text-slate-600 hover:text-slate-900 transition-colors'

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-300 to-cyan-300" />
            <span className="font-semibold text-slate-800">FlowMint</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} className={({isActive}) => `${base} ${isActive ? 'text-slate-900' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.name}</span>
              <button onClick={onLogout} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-slate-900 text-sm">Log in</Link>
              <Link to="/signup" className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800 transition-colors">Sign up</Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100 px-4 py-3 space-y-2 bg-white">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} onClick={()=>setOpen(false)} className={base}>
              {n.label}
            </NavLink>
          ))}
          <div className="pt-2 flex gap-3">
            {user ? (
              <button onClick={()=>{setOpen(false); onLogout && onLogout();}} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Logout</button>
            ) : (
              <>
                <Link to="/login" onClick={()=>setOpen(false)} className="text-slate-600 text-sm">Log in</Link>
                <Link to="/signup" onClick={()=>setOpen(false)} className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
