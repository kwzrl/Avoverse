import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css"

const nohemi = localFont({
	src: '../public/fonts/Nohemi-VF.ttf',
	variable: '--font-nohemi',
	display: 'swap',
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
	variable: '--font-instrument',
	subsets: ['latin'],
	weight: '400',
	style: ['italic', 'normal'],
});

export const metadata: Metadata = {
	title: 'Avoverse - Create Your Worlds',
	description: 'Experience a new dimension of storytelling. Dive into infinite galleries, immersive environments, and cinematic journeys.',
	keywords: ['Avoverse', 'creative platform', 'storytelling', 'immersive', 'WebGL', 'cinematic'],
	openGraph: {
		title: 'Avoverse - Create Your Worlds',
		description: 'Experience a new dimension of storytelling with immersive galleries and cinematic experiences.',
		type: 'website',
		siteName: 'Avoverse',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Avoverse - Create Your Worlds',
		description: 'Experience a new dimension of storytelling with immersive galleries and cinematic experiences.',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: '#000000',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${nohemi.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
