"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BOT_RESPONSES, DEFAULT_RESP, CHIPS } from "@/lib/data"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  role: "bot" | "user"
  text: string
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      text: "¡Hola! Soy NeptUN, tu asistente virtual de la Universidad Nacional de Colombia, Sede Medellín. Puedo ayudarte con preguntas sobre el reglamento estudiantil, trámites, fechas y más. ¿En qué te puedo ayudar hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Find response
    const q = messageText.toLowerCase()
    let resp = DEFAULT_RESP
    for (const [key, val] of Object.entries(BOT_RESPONSES)) {
      if (q.includes(key)) {
        resp = val
        break
      }
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: resp,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F6F8FC]">
      {/* Chat Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[#1F2C44] bg-[#131C2E] px-5 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/15">
          <Bot className="h-5 w-5 text-[#93C5FD]" />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[#F1F5FB]">NeptUN</div>
          <div className="text-xs text-[#8A99B5]">Asistente virtual UNAL · RAG sobre documentos institucionales</div>
        </div>
        <Badge className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10">
          En línea
        </Badge>
      </div>

      {/* Demo Notice */}
      <div className="mx-4 mt-3 shrink-0 rounded-lg border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-4 py-2 text-sm text-[#33507f]">
        <strong className="font-semibold">Modo demostración:</strong> NeptUN está en construcción. El módulo RAG será
        integrado con los documentos oficiales de la UNAL en la próxima fase.
      </div>

      {/* Messages — flex child with min-h-0 so it scrolls independently and keeps the input fixed */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="mb-1 flex items-center gap-2 text-xs text-[#8A99B5]">
                  {msg.role === "bot" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                  {msg.role === "bot" ? "NeptUN" : "Tú"} · ahora
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-[#1B2740] text-[#F1F5FB]"
                      : "rounded-bl-sm border border-[#E3E8F2] bg-white text-[#1A2233] shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
              <div className="rounded-2xl rounded-bl-sm border border-[#E3E8F2] bg-white px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-[#3B82F6]"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-[#3B82F6]"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-[#3B82F6]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area — siempre visible y fijo en la parte inferior */}
      <div className="shrink-0 border-t border-[#E3E8F2] bg-white p-4 shadow-[0_-4px_12px_-6px_rgba(14,23,38,0.15)]">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta sobre la UNAL..."
            className="flex-1 rounded-full border-[#E3E8F2] px-4 focus-visible:ring-[#3B82F6]"
          />
          <Button
            onClick={() => sendMessage()}
            className="rounded-full bg-[#1B2740] px-6 font-semibold text-[#F1F5FB] hover:bg-[#0E1726]"
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar
          </Button>
        </div>

        {/* Quick Chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <motion.button
              key={chip}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => sendMessage(chip)}
              className="rounded-full border border-[#E3E8F2] bg-[#EEF3FB] px-3 py-1.5 text-xs text-[#33507f] transition-colors hover:border-[#3B82F6]/40 hover:bg-[#E0E9F8]"
            >
              {chip}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
