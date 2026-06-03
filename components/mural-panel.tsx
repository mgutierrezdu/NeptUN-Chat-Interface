"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { POST_CATS, CAT_COLORS, INITIAL_POSTS, type Post } from "@/lib/data"
import { Plus, X, Heart, Share2, MessageCircle } from "lucide-react"

export function MuralPanel() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [formOpen, setFormOpen] = useState(false)
  const [autor, setAutor] = useState("")
  const [titulo, setTitulo] = useState("")
  const [body, setBody] = useState("")
  const [cat, setCat] = useState(POST_CATS[0])

  const filters = ["Todos", ...POST_CATS]
  const filteredPosts = activeFilter === "Todos" ? posts : posts.filter((p) => p.cat === activeFilter)

  const handleSubmit = () => {
    if (!titulo.trim() || !body.trim()) {
      alert("El título y el contenido son obligatorios.")
      return
    }

    const newPost: Post = {
      id: Date.now(),
      autor: autor.trim() || "Estudiante anónimo",
      avatar: "🙋",
      cat,
      titulo: titulo.trim(),
      body: body.trim(),
      likes: 0,
      time: "ahora mismo",
      liked: false,
    }

    setPosts((prev) => [newPost, ...prev])
    setAutor("")
    setTitulo("")
    setBody("")
    setFormOpen(false)
  }

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id && !p.liked ? { ...p, liked: true, likes: p.likes + 1 } : p))
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-3xl p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#003380]">Mural estudiantil</h2>
            <p className="text-sm text-[#5a6480]">Publicaciones de la comunidad UNAL Sede Medellín</p>
          </div>
          <Button
            onClick={() => setFormOpen(!formOpen)}
            className="gap-2 rounded-lg bg-[#003380] font-bold hover:bg-[#001f52]"
          >
            {formOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {formOpen ? "Cerrar" : "Nueva publicación"}
          </Button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border-2 border-[#dde3ef] bg-white p-5 shadow-md">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#003380]">
                  <MessageCircle className="h-4 w-4" />
                  Nueva publicación
                </div>
                <Input
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Tu nombre o seudónimo (opcional)"
                  className="mb-3 border-[#dde3ef] focus-visible:ring-[#003380]"
                />
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título de tu publicación *"
                  className="mb-3 border-[#dde3ef] focus-visible:ring-[#003380]"
                />
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="¿Qué quieres compartir? *"
                  className="mb-3 min-h-[100px] border-[#dde3ef] focus-visible:ring-[#003380]"
                />
                <div className="flex items-center gap-3">
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="flex-1 rounded-lg border-2 border-[#dde3ef] px-3 py-2 text-sm text-[#1a2340] outline-none focus:border-[#003380]"
                  >
                    {POST_CATS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={handleSubmit}
                    className="rounded-lg bg-[#003380] px-6 font-bold hover:bg-[#001f52]"
                  >
                    Publicar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full border-2 px-4 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f
                  ? "border-[#003380] bg-[#003380] font-bold text-white"
                  : "border-[#dde3ef] bg-white text-[#5a6480] hover:border-[#003380] hover:text-[#003380]"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-10 text-center text-[#5a6480]"
              >
                <div className="mb-3 text-4xl">📭</div>
                No hay publicaciones en esta categoría todavía. ¡Sé el primero!
              </motion.div>
            ) : (
              filteredPosts.map((p, i) => {
                const color = CAT_COLORS[p.cat] || "#64748b"
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
                    className="rounded-xl border-2 border-[#dde3ef] bg-white p-5 transition-shadow"
                  >
                    {/* Post Header */}
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8eef8] text-xl">
                        {p.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#1a2340]">{p.autor}</div>
                        <div className="text-xs text-[#5a6480]">{p.time}</div>
                      </div>
                      <span
                        className="rounded-full border px-3 py-1 text-xs font-bold"
                        style={{
                          background: `${color}18`,
                          borderColor: `${color}55`,
                          color,
                        }}
                      >
                        {p.cat}
                      </span>
                    </div>

                    {/* Post Content */}
                    <h3 className="mb-2 font-bold text-[#1a2340]">{p.titulo}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-[#5a6480]">{p.body}</p>

                    {/* Post Footer */}
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={!p.liked ? { scale: 1.05 } : {}}
                        whileTap={!p.liked ? { scale: 0.95 } : {}}
                        onClick={() => handleLike(p.id)}
                        disabled={p.liked}
                        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-all ${
                          p.liked
                            ? "border-red-300 bg-red-50 text-red-500"
                            : "border-[#dde3ef] bg-[#f4f6fb] text-[#5a6480] hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${p.liked ? "fill-current" : ""}`} />
                        {p.likes}
                      </motion.button>
                      <button className="flex items-center gap-2 text-xs text-[#5a6480] hover:text-[#003380]">
                        <Share2 className="h-4 w-4" />
                        Compartir
                      </button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollArea>
  )
}
