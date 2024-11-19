'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, ChevronDown } from 'lucide-react'

const games = [
    { id: 1, title: 'Five Nights at Freddys 4', image: '/fnaf4.jpg?height=300&width=200', category: 'RPG', rating: 4.8, link: '/fnaf' },
    { id: 2, title: 'Drift King', image: '/drift king.PNG?height=300&width=200', category: 'Strategy', rating: 4.5, link: '/driftking' },
    { id: 3, title: 'Parking Fury 3D', image: '/parkingfury.jpg?height=300&width=200', category: 'Racing', rating: 4.2, link: '/parkingfury' },
    { id: 4, title: 'Solitaire Klondike', image: '/solitaire.png?height=300&width=200', category: 'MMORPG', rating: 4.7, link: '/solitaire' },
    { id: 5, title: 'Time Shooter 3: SWAT', image: '/ts3.jpg?height=300&width=200', category: 'FPS', rating: 4.6, link: '/timeshooter' },
    { id: 5, title: 'CStrike', image: '/cstrike.png?height=300&width=200', category: 'FPS', rating: 4.6, link: '/cstrike' }
]

const categories = ['All', 'RPG', 'Strategy', 'Racing', 'MMORPG', 'FPS', 'Adventure', 'Action', 'Roguelike']

const glowingOrbVariants = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.7, 0.3],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
}

export default function GamesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [filteredGames, setFilteredGames] = useState(games)

    useEffect(() => {
        const filtered = games.filter(
            (game) =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedCategory === 'All' || game.category === selectedCategory)
        )
        setFilteredGames(filtered)
    }, [searchTerm, selectedCategory])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
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

            {/* Navigation */}
            <nav className="relative z-10 border-b border-white/10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                            GameVerse
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                            <Link href="/games" className="text-white font-semibold">Games</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Discover Amazing Games</h1>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search games..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <div className="relative w-full md:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-white/10 rounded-full py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <motion.div
                            key={game.id}
                            className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-shadow"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={game.link} target={game.link.startsWith('http') ? '_blank' : '_self'}>
                                <Image
                                    src={game.image}
                                    alt={game.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">{game.category}</span>
                                        <div className="flex items-center">
                                            <Star className="text-yellow-500 w-5 h-5 fill-current" />
                                            <span className="ml-1 text-sm">{game.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredGames.length === 0 && (
                    <p className="text-center text-gray-400 mt-8">No games found. Try adjusting your search or filter.</p>
                )}
            </main>
        </div>
    )
}
