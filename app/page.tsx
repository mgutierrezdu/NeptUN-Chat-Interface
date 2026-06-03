"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UNALShield } from "@/components/unal-shield"
import { ChatPanel } from "@/components/chat-panel"
import { RecursosPanel } from "@/components/recursos-panel"
import { MuralPanel } from "@/components/mural-panel"
import { MessageCircle, FolderOpen, Pin } from "lucide-react"

export default function UNamigoApp() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f4f6fb]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 items-center gap-4 border-b-[3px] border-[#FFCC00] bg-gradient-to-r from-[#001f52] to-[#003380] px-5 py-3 shadow-lg"
      >
        <UNALShield />
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-wide text-[#FFCC00]">UNamigo</h1>
          <p className="hidden text-[10px] uppercase tracking-widest text-[#ccd8f0] sm:block">
            Universidad Nacional de Colombia - Sede Medellín
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className="bg-[#FFCC00] text-[9px] font-extrabold uppercase tracking-wide text-[#001f52] hover:bg-[#FFCC00]">
            Beta
          </Badge>
          <span className="text-[10px] text-[#adc4f0]">Prototipo v0.1</span>
        </div>
      </motion.header>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        {/* Tab Navigation */}
        <TabsList className="h-auto w-full shrink-0 justify-stretch rounded-none border-b-2 border-[#001f52] bg-[#003380] p-0">
          <TabsTrigger
            value="chat"
            className="flex-1 gap-2 rounded-none border-b-[3px] border-transparent py-3 text-sm font-medium text-[#adc4f0] data-[state=active]:border-[#001f52] data-[state=active]:bg-[#FFCC00] data-[state=active]:font-bold data-[state=active]:text-[#001f52]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">UNamigo IA</span>
            <span className="sm:hidden">Chat</span>
          </TabsTrigger>
          <TabsTrigger
            value="recursos"
            className="flex-1 gap-2 rounded-none border-b-[3px] border-transparent py-3 text-sm font-medium text-[#adc4f0] data-[state=active]:border-[#001f52] data-[state=active]:bg-[#FFCC00] data-[state=active]:font-bold data-[state=active]:text-[#001f52]"
          >
            <FolderOpen className="h-4 w-4" />
            Recursos
          </TabsTrigger>
          <TabsTrigger
            value="mural"
            className="flex-1 gap-2 rounded-none border-b-[3px] border-transparent py-3 text-sm font-medium text-[#adc4f0] data-[state=active]:border-[#001f52] data-[state=active]:bg-[#FFCC00] data-[state=active]:font-bold data-[state=active]:text-[#001f52]"
          >
            <Pin className="h-4 w-4" />
            Mural
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="chat" className="mt-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <ChatPanel />
        </TabsContent>
        <TabsContent value="recursos" className="mt-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <RecursosPanel />
        </TabsContent>
        <TabsContent value="mural" className="mt-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <MuralPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
