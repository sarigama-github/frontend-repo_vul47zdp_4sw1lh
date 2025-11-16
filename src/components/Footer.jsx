export default function Footer(){
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} FlowMint. All rights reserved.</p>
        <nav className="flex gap-4 text-sm text-slate-500">
          <a href="/privacy" className="hover:text-slate-700">Privacy</a>
          <a href="/terms" className="hover:text-slate-700">Terms</a>
          <a href="/contact" className="hover:text-slate-700">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
