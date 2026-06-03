"use client"

import { motion } from "framer-motion"

export function UNALShield({ className }: { className?: string }) {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
      width="42"
      height="46"
      viewBox="0 0 60 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 2 L58 14 L58 40 C58 52 44 62 30 64 C16 62 2 52 2 40 L2 14 Z"
        fill="#003380"
        stroke="#FFCC00"
        strokeWidth="2"
      />
      <rect x="10" y="19" width="17" height="22" fill="none" stroke="#FFCC00" strokeWidth="1.5" />
      <rect x="33" y="19" width="17" height="22" fill="none" stroke="#FFCC00" strokeWidth="1.5" />
      <text x="18" y="34" textAnchor="middle" fill="#FFCC00" fontSize="9" fontFamily="serif">
        ⚖
      </text>
      <text x="41" y="34" textAnchor="middle" fill="#FFCC00" fontSize="8" fontFamily="serif">
        ♪
      </text>
      <text x="30" y="34" textAnchor="middle" fill="#FFCC00" fontSize="10" fontWeight="bold" fontFamily="serif">
        π
      </text>
      <path d="M18 44 Q30 51 42 44" stroke="#FFCC00" strokeWidth="1.5" fill="none" />
      <text x="30" y="60" textAnchor="middle" fill="#FFCC00" fontSize="5.5" fontFamily="serif" letterSpacing="1">
        UNAL
      </text>
    </motion.svg>
  )
}
