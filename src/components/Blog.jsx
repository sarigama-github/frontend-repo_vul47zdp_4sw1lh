import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function BlogGrid(){
  const [items, setItems] = useState([])
  useEffect(()=>{
    fetch(`${API_URL}/api/blogs`).then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{})
  },[])
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">Latest articles</h2>
        <Link to="/blog/new" className="text-sm text-slate-600 hover:text-slate-900">New post</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="rounded-2xl border border-slate-200 p-4 hover:shadow-sm transition-all bg-white">
            <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-indigo-100 to-cyan-100 mb-3"/>
            <h3 className="font-medium text-slate-800">{post.title}</h3>
            <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function BlogPost({ slug }){
  const [post, setPost] = useState(null)
  useEffect(()=>{
    fetch(`${API_URL}/api/blogs/${slug}`).then(async r=>{ if(!r.ok) throw new Error('not found'); return r.json() }).then(setPost).catch(()=>setPost(undefined))
  },[slug])
  if(post === undefined){
    return <div className="mx-auto max-w-3xl px-4 py-16"><p className="text-slate-600">Post not found.</p></div>
  }
  if(!post){ return <div className="mx-auto max-w-3xl px-4 py-16"><p className="text-slate-600">Loading...</p></div> }
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>{post.title}</h1>
      <p className="text-slate-500">By {post.author}</p>
      <div className="whitespace-pre-wrap">{post.content}</div>
    </article>
  )
}
