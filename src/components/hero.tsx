"use client"

import { Button } from "../components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// --- Icons (unchanged) ---
const ArrowRight = () => (
  <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
const BookOpen = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)
const Users = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
  </svg>
)
const Award = () => (
  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806" />
  </svg>
)

// --- Mobile sparkle particles (unchanged) ---
const MobileParticles = () => {
  const [dimensions, setDimensions] = useState({ w: 360, h: 640 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = () => setDimensions({ w: window.innerWidth, h: window.innerHeight })
      update()
      window.addEventListener("resize", update)
      return () => window.removeEventListener("resize", update)
    }
  }, [])

  const density = dimensions.w < 480 ? 26 : 34
  const dots = Array.from({ length: density })

  return (
    <div className="absolute inset-0 sm:hidden z-0 pointer-events-none">
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-80"
          initial={{
            x: Math.random() * dimensions.w,
            y: Math.random() * dimensions.h,
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2.4 + Math.random() * 2.4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}

// --- Desktop network background (canvas + framer-motion fade-in) ---
const BackgroundNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1
    const setSize = () => {
      const w = Math.floor(window.innerWidth * dpr)
      const h = Math.floor(window.innerHeight * dpr)
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setSize()

    // choose particle count by viewport width for performance
    const vw = window.innerWidth
    const particleCount = vw < 600 ? 26 : vw < 900 ? 36 : vw < 1400 ? 48 : 70

    type P = { x: number; y: number; vx: number; vy: number; r: number }
    const particles: P[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 1 + Math.random() * 1.6,
      })
    }

    let rafId = 0
    const maxConnectDistance = window.innerWidth < 600 ? 110 : 140

    const render = () => {
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // draw particles & lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // wrap around edges for subtle continuity
        if (p.x < -10) p.x = window.innerWidth + 10
        if (p.x > window.innerWidth + 10) p.x = -10
        if (p.y < -10) p.y = window.innerHeight + 10
        if (p.y > window.innerHeight + 10) p.y = -10

        // draw dot
        ctx.beginPath()
        ctx.fillStyle = "rgba(59,130,246,0.95)" // blue-ish
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        // draw connections to later particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.7
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`
            ctx.lineWidth = window.innerWidth < 600 ? 0.5 : 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(render)
    }

    render()

    const onResize = () => {
      dpr = window.devicePixelRatio || 1
      setSize()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  // visible on all screens
  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    />
  )
}

// --- Hero Section (full content preserved) ---
export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative pt-20 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden flex items-center min-h-[80vh]"
    >
      {/* Blobs (behind network) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-200 rounded-full filter blur-3xl opacity-30 animate-pulse -z-10"></div>

      {/* Desktop network canvas */}
      <BackgroundNetwork />

      {/* Mobile sparkle particles disabled (using canvas on all sizes) */}

      <div className="relative z-10 container mx-auto px-3 sm:px-6 lg:px-8 max-w-screen-xl">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-6 md:mb-8">
            <motion.h1
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-blue-900 mb-3 md:mb-6 leading-snug bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 animate-gradient-x text-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              Kerala Blockchain Academy Innovation Club
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-2xl lg:text-3xl text-blue-700 mb-6 md:mb-8 leading-relaxed font-semibold text-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Empowering minds through accessible, high-quality blockchain education to thrive in the digital future
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="inline-block">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md sm:shadow-lg transition-all duration-300 text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-5"
                onClick={() => scrollToSection("team")}
              >
                Meet Our Team <ArrowRight />
              </Button>
            </motion.div>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }} className="inline-block">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-5"
                onClick={() => scrollToSection("about")}
              >
                About KBA Club
              </Button>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            {[
              {
                title: "Education",
                desc: "Comprehensive blockchain courses from foundation to advanced levels",
                icon: <BookOpen />,
                bg: "bg-blue-100 group-hover:bg-blue-200",
                id: "about",
              },
              {
                title: "Community",
                desc: "Connect with like-minded students and industry professionals",
                icon: <Users />,
                bg: "bg-indigo-100 group-hover:bg-indigo-200",
                id: "partners",
              },
              {
                title: "Excellence",
                desc: "Centre of Excellence under Kerala University of Digital Sciences",
                icon: <Award />,
                bg: "bg-cyan-100 group-hover:bg-cyan-200",
                id: "certificate",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="text-center group hover:scale-105 transition-transform cursor-pointer px-2"
                onClick={() => scrollToSection(item.id)}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: idx * 0.3 }}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-blue-900">{item.title}</h3>
                <p className="text-xs sm:text-sm text-blue-700">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
