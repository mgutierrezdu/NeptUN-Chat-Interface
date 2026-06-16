"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { NeptUNLogo } from "@/components/neptun-logo"
import { ChatPanel } from "@/components/chat-panel"
import { RecursosPanel } from "@/components/recursos-panel"
import { MuralPanel } from "@/components/mural-panel"
import { MessageCircle, FolderOpen, Pin } from "lucide-react"

export default function NeptUNApp() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F6F8FC]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex shrink-0 items-center gap-4 border-b border-[#1F2C44] bg-[#0E1726] px-5 py-3.5 shadow-md"
      >
        <NeptUNLogo />
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight text-[#F1F5FB]">
            Nept<span className="text-[#3B82F6]">UN</span>
          </h1>
          <p className="hidden text-[10px] uppercase tracking-[0.18em] text-[#8A99B5] sm:block">
            Universidad Nacional de Colombia · Sede Medellín
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className="border border-[#3B82F6]/40 bg-[#3B82F6]/15 text-[9px] font-semibold uppercase tracking-wide text-[#93C5FD] hover:bg-[#3B82F6]/15">
            Beta
          </Badge>
          <span className="text-[10px] text-[#5B6678]">Prototipo v0.1</span>
        </div>
      </motion.header>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Tab Navigation */}
        <TabsList className="h-auto w-full shrink-0 justify-stretch rounded-none border-b border-[#E3E8F2] bg-[#131C2E] p-0">
          <TabsTrigger
            value="chat"
            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-sm font-medium text-[#8A99B5] data-[state=active]:border-[#3B82F6] data-[state=active]:bg-[#1B2740] data-[state=active]:font-semibold data-[state=active]:text-[#F1F5FB]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">NeptUN IA</span>
            <span className="sm:hidden">Chat</span>
          </TabsTrigger>
          <TabsTrigger
            value="recursos"
            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-sm font-medium text-[#8A99B5] data-[state=active]:border-[#3B82F6] data-[state=active]:bg-[#1B2740] data-[state=active]:font-semibold data-[state=active]:text-[#F1F5FB]"
          >
            <FolderOpen className="h-4 w-4" />
            Recursos
          </TabsTrigger>
          <TabsTrigger
            value="mural"
            className="flex-1 gap-2 rounded-none border-b-2 border-transparent py-3 text-sm font-medium text-[#8A99B5] data-[state=active]:border-[#3B82F6] data-[state=active]:bg-[#1B2740] data-[state=active]:font-semibold data-[state=active]:text-[#F1F5FB]"
          >
            <Pin className="h-4 w-4" />
            Mural
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="chat" className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <ChatPanel />
        </TabsContent>
        <TabsContent value="recursos" className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <RecursosPanel />
        </TabsContent>
        <TabsContent value="mural" className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden">
          <MuralPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}
