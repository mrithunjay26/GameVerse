'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Maximize2, Minimize2, Volume2, VolumeX, ChevronLeft } from 'lucide-react'

const glowingOrbVariants = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.7, 0.3],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

export default function GamePage() {
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (iframeRef.current && iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullScreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
            {/* Glowing background orbs */}
            <motion.div
                variants={glowingOrbVariants}
                animate="animate"
                className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500 filter blur-3xl opacity-20"
            />
            <motion.div
                variants={glowingOrbVariants}
                animate="animate"
                className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20"
            />

            {/* Top navigation bar */}
            <nav className="relative z-10 bg-gray-800 bg-opacity-50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center text-white hover:text-purple-400 transition-colors">
                            <ChevronLeft className="mr-2" />
                            Back to Home
                        </Link>
                        <h1 className="text-2xl font-bold">Time Shooter 3: SWAT</h1>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
                {/* Game frame */}
                <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full max-w-4xl aspect-video">
                    <iframe
                        ref={iframeRef}
                        src="https://games-5zw4.onrender.com/timeshooter.html" // Replace with actual game URL
                        className="w-full h-full"
                        allowFullScreen
                    ></iframe>

                    {/* Game controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white hover:text-purple-400 transition-colors"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                            <button
                                onClick={toggleFullScreen}
                                className="text-white hover:text-purple-400 transition-colors"
                                aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
                            >
                                {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Game information */}
                <div className="mt-8 w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">About the Game</h2>
                    <p className="text-gray-300 mb-4">
                        Video game where the core gameplay mechanic revolves around manipulating time, often allowing players to slow down, stop, or rewind time to their advantage during combat, allowing for strategic maneuvers and precise aiming against enemies, with the primary focus still being on shooting and defeating opponents.
                    </p>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-purple-400 font-semibold">Genre:</span> Action
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors">
                            Add to Library
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
