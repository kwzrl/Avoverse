import type { Metadata } from 'next';
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
