'use client';

import InfiniteGallery from '@/components/InfiniteGallery';
import Starfield from '@/components/Starfield';
import { ScrollProvider } from '@/contexts/ScrollContext';

export default function Home() {
	const sampleImages = [
		{ src: '/DEMO-Vid.mp4', alt: 'Demo Video', type: 'video' as const },
		{ src: '/Vid2.mp4', alt: 'Video 2', type: 'video' as const },
		{ src: '/DEMO-Vid.mp4', alt: 'Demo Video', type: 'video' as const },
		{ src: '/Vid2.mp4', alt: 'Video 2', type: 'video' as const },
		{ src: '/DEMO-Vid.mp4', alt: 'Demo Video', type: 'video' as const },
		{ src: '/Vid2.mp4', alt: 'Video 2', type: 'video' as const },
		{ src: '/DEMO-Vid.mp4', alt: 'Demo Video', type: 'video' as const },
		{ src: '/Vid2.mp4', alt: 'Video 2', type: 'video' as const },
	];

	return (
		<ScrollProvider>
			<main className="min-h-screen">
				<Starfield />
				<InfiniteGallery
					images={sampleImages}
					speed={1.2}
					zSpacing={3}
					visibleCount={12}
					falloff={{ near: 0.8, far: 14 }}
					className="h-screen w-full rounded-lg overflow-hidden relative z-10"
					style={{ background: 'transparent' }}
				/>
				<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white z-20">
					<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
						<span className="italic">Create</span> Your Worlds
					</h1>
				</div>
			</main>
		</ScrollProvider>
	);
}
