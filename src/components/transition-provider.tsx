"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial mount loader
    const t = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Trigger loader on route/path changes
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname || "page"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-loader"
            className="fixed inset-0 z-[60] grid place-items-center bg-white/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-busy="true"
          >
            <motion.div
              className="w-14 h-14 rounded-full border-4 border-blue-200 border-t-blue-600"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
            />
            <motion.p
              className="mt-4 text-blue-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


