import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'GameVerse',
    description: 'Find your next game',
    keywords: 'gaming, crazy, games, for all, students, unblocked games, unblocked school games',
    authors: [{ name: 'zawg123' }],
    openGraph: {
        title: 'GameVerse',
        description: 'Find your next game'
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://www.example.com" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
