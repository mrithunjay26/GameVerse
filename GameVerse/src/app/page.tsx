'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight } from 'lucide-react'

// Floating animation variants
const floatingAnimation = {
    initial: { y: 0 },
    animate: {
        y: [0, -20, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

const glowingAnimation = {
    initial: { opacity: 0.5 },
    animate: {
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
}

const games = [
    {
        id: 1,
        title: 'Five Nights At Freddys 4',
        image: '/fnaf4.jpg?height=200&width=200',
        rating: 4.8
    },
    {
        id: 2,
        title: 'Drift King',
        image: '/drift king.PNG?height=200&width=200',
        rating: 4.5
    },
    {
        id: 3,
        title: 'Time Shooter',
        image: '/ts3.jpg?height=200&width=200',
        rating: 4.9
    },
]

export default function HomePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[100px] animate-pulse" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-green-500 rounded-full filter blur-[100px] animate-pulse" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                GameVerse
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                                <Link href="/games" className="text-gray-300 hover:text-white transition-colors">Games</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <motion.h1
                                className="text-6xl font-bold mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                PLAY & COLLECT
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-300 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Experience next-level gaming where every victory earns you unique collectibles.
                                Join the future of gaming with our revolutionary platform.
                            </motion.p>
                            <a href="/games">
                                <motion.button
                                    className="bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-shadow"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: 0.4}}
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    Get Started <ChevronRight className="inline-block ml-2"/>
                                </motion.button>
                            </a>
                        </div>
                        <div className="relative">
                            <motion.div
                                variants={floatingAnimation}
                                initial="initial"
                                animate="animate"
                                className="relative z-20"
                            >
                                <Image
                                    src="/main.svg?height=400&width=400"
                                    alt="Gaming Icon"
                                    width={400}
                                    height={400}
                                    className="w-full max-w-md mx-auto"
                                />
                                <motion.div
                                    variants={glowingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 filter blur-3xl opacity-30"
                                />
                            </motion.div>
                            {/* Floating UI Elements */}
                            <motion.div
                                className="absolute top-1/4 left-0 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl"
                                animate={{
                                    x: mousePosition.x * 0.02,
                                    y: mousePosition.y * 0.02,
                                }}
                                transition={{ type: "spring", stiffness: 50 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-sm">2,451 Online Players</span>
                                </div>
                            </motion.div>
                            <motion.div
                                className="absolute bottom-1/4 right-0 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl"
                                animate={{
                                    x: mousePosition.x * -0.02,
                                    y: mousePosition.y * -0.02,
                                }}
                                transition={{ type: "spring", stiffness: 50 }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    <span className="text-sm">500+ Games Available</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Trending Games Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold">Currently Trending Games</h2>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                            See All
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {games.map((game) => (
                            <motion.div
                                key={game.id}
                                className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                            <span className="ml-2">{game.rating}</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 py-2 rounded-full transition-colors">
                                        Play Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}