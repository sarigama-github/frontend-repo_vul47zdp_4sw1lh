import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[68vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-10">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="space-y-6">
          <span className="inline-flex px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">Minimal. Calm. Capable.</span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-800">
            Build with clarity. Launch with confidence.
          </h1>
          <p className="text-slate-600 max-w-xl">
            A modern workspace that blends simplicity and power. Sign in to see your dashboard or explore articles crafted to help you move thoughtfully.
          </p>
          <div className="flex gap-3">
            <a href="/signup" className="px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors">Create account</a>
            <a href="/pricing" className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">View pricing</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
