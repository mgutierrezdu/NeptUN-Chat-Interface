"use client"

import { motion } from "framer-motion"

export function NeptUNLogo({ className }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Planet ring */}
      <circle cx="24" cy="24" r="21" stroke="#3B82F6" strokeWidth="1.5" opacity="0.35" />
      {/* Stylized trident */}
      <g stroke="#3B82F6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* central shaft */}
        <path d="M24 13 L24 37" />
        {/* outer prongs */}
        <path d="M15 18 L15 11" />
        <path d="M33 18 L33 11" />
        {/* crossbar connecting prongs */}
        <path d="M15 18 Q24 24 33 18" />
        {/* base foot */}
        <path d="M19 37 L29 37" />
      </g>
      {/* central prong tip accent */}
      <circle cx="24" cy="13" r="2" fill="#93C5FD" />
    </motion.svg>
  )
}
