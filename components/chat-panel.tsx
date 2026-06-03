"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
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
      text: "¡Hola! Soy UNamigo, tu asistente virtual de la Universidad Nacional de Colombia, Sede Medellín. Puedo ayudarte con preguntas sobre el reglamento estudiantil, trámites, fechas y más. ¿En qué te puedo ayudar hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

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
    <div className="flex h-full flex-col">
      {/* Chat Header */}
      <div className="flex shrink-0 items-center gap-3 border-b-2 border-[#001f52] bg-[#003380] px-5 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFCC00] text-xl">
          <Bot className="h-5 w-5 text-[#001f52]" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">UNamigo</div>
          <div className="text-xs text-[#adc4f0]">Asistente virtual UNAL - RAG sobre documentos institucionales</div>
        </div>
        <Badge className="border-green-500 bg-green-500/10 text-green-500">En línea</Badge>
      </div>

      {/* Demo Notice */}
      <div className="mx-4 mt-3 shrink-0 rounded-lg border border-dashed border-[#c9a000] bg-[#fff8dc] px-4 py-2 text-sm text-[#7a5900]">
        <strong>Modo demostración:</strong> UNamigo está en construcción. El módulo RAG será integrado con los
        documentos oficiales de la UNAL en la próxima fase.
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
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
                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {msg.role === "bot" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
                  {msg.role === "bot" ? "UNamigo" : "Tú"} - ahora
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-[#003380] text-white"
                      : "rounded-bl-sm border border-[#dde3ef] bg-white text-[#1a2340] shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2"
            >
              <div className="rounded-2xl rounded-bl-sm border border-[#dde3ef] bg-white px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-[#003380]"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-[#003380]"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-[#003380]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area - Siempre visible (fijo en la parte inferior) */}
      <div className="shrink-0 border-t-2 border-[#dde3ef] bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta sobre la UNAL..."
            className="flex-1 rounded-full border-[#dde3ef] px-4 focus-visible:ring-[#003380]"
          />
          <Button
            onClick={() => sendMessage()}
            className="rounded-full bg-[#003380] px-6 font-bold hover:bg-[#001f52]"
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
              className="rounded-full border border-[#dde3ef] bg-[#e8eef8] px-3 py-1.5 text-xs text-[#003380] transition-colors hover:bg-[#d0daf5]"
            >
              {chip}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
