"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RECURSOS, FECHAS } from "@/lib/data"
import { Calendar, ExternalLink, Info } from "lucide-react"

export function RecursosPanel() {
  const [activeFilter, setActiveFilter] = useState("Todos")

  const categories = ["Todos", ...new Set(RECURSOS.map((r) => r.cat))]
  const filteredRecursos = activeFilter === "Todos" ? RECURSOS : RECURSOS.filter((r) => r.cat === activeFilter)

  return (
    <ScrollArea className="h-full bg-[#F6F8FC]">
      <div className="mx-auto max-w-4xl p-5">
        {/* Calendar Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border-2 border-[#E3E8F2] bg-white p-5"
        >
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-[#1B2740]">
            <Calendar className="h-5 w-5" />
            Fechas importantes - Semestre 2025-I
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {FECHAS.map((f, i) => (
              <motion.div
                key={f.fecha}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg bg-[#EEF3FB] p-3"
              >
                <span className="text-xs font-extrabold text-[#1B2740]">{f.fecha}</span>
                <span className="text-xs text-[#1A2233]">{f.ev}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border-2 px-4 py-1.5 text-xs font-medium transition-all ${
                activeFilter === cat
                  ? "border-[#1B2740] bg-[#1B2740] font-bold text-white"
                  : "border-[#E3E8F2] bg-white text-[#5B6678] hover:border-[#1B2740] hover:text-[#1B2740]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredRecursos.map((r, i) => (
              <motion.a
                key={r.label}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                className="group relative block rounded-xl border-2 bg-white p-4 transition-all"
                style={{ borderColor: r.border }}
              >
                <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4 text-[#5B6678]" />
                </div>
                <div className="mb-2 text-3xl">{r.icon}</div>
                <div className="mb-1 font-bold text-[#1A2233]">{r.label}</div>
                <div className="mb-3 text-xs leading-relaxed text-[#5B6678]">{r.desc}</div>
                <span
                  className="inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: r.bg, color: r.tx, borderColor: r.border }}
                >
                  {r.cat}
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-start gap-3 rounded-xl border-l-4 border-[#1B2740] bg-[#EEF3FB] p-4 text-sm leading-relaxed text-[#5B6678]"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1B2740]" />
          <p>
            Todos los enlaces abren los portales oficiales de la Universidad Nacional de Colombia. Para acceder a
            algunos servicios necesitarás tu correo institucional <strong>@unal.edu.co</strong>.
          </p>
        </motion.div>
      </div>
    </ScrollArea>
  )
}
