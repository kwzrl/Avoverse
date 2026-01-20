'use client';

import InfiniteGallery from '@/components/InfiniteGallery';
import Starfield from '@/components/Starfield';
import { ScrollProvider } from '@/contexts/ScrollContext';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { FeaturedSection } from '@/components/FeaturedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

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
			<div className="relative min-h-screen bg-black text-white selection:bg-white/20">
				<Navbar />
				
				<main>
					{/* Hero Section */}
					<div className="relative h-screen w-full overflow-hidden">
						{/* Background Layer */}
						<div className="absolute inset-0 z-0">
							<Starfield />
							<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10 pointer-events-none" />
							<InfiniteGallery
								images={sampleImages}
								speed={1.2}
								zSpacing={3}
								visibleCount={12}
								falloff={{ near: 0.8, far: 14 }}
								className="h-full w-full"
								style={{ background: 'transparent' }}
								interactive={false}
							/>
						</div>

						{/* Content Layer - Centered Hero Text */}
						<div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 md:px-6 pointer-events-none">
							<div className="pointer-events-auto max-w-4xl mx-auto space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-10">
								<div className="space-y-1 md:space-y-2">
									<h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9]">
										<span className="italic block text-white/90">Create</span> 
										<span>Your Worlds</span>
									</h1>
								</div>
								
								<p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
									Experience a new dimension of storytelling. Dive into infinite galleries, immersive environments, and cinematic journeys.
								</p>

								<div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-4 md:pt-8 w-full px-4 sm:px-0">
									<Button 
										size="lg" 
										className="rounded-[4px] h-11 sm:h-12 px-6 sm:px-8 text-[14px] sm:text-[15px] font-medium bg-white text-black hover:bg-neutral-200 transition-colors w-full sm:w-auto"
									>
										Join Waitlist
									</Button>
									<Button 
										size="lg" 
										variant="outline" 
										className="rounded-[4px] h-11 sm:h-12 px-6 sm:px-8 text-[14px] sm:text-[15px] font-medium border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white transition-colors hover:border-white/40 w-full sm:w-auto"
									>
										Influencing Decisions
									</Button>
								</div>
							</div>
						</div>

						{/* Scroll Indicator */}
						<div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none text-white/50">
							<span className="text-[10px] sm:text-xs tracking-widest uppercase">Scroll to explore</span>
						</div>
					</div>

					{/* Content Sections */}
					<FeaturedSection />
					
					{/* Additional Studio-like Section */}
					<section className="py-20 md:py-32 bg-neutral-950 relative z-10">
						<div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
							<div className="space-y-4 md:space-y-6">
								<h2 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight">
									Cinematic depth in <br />
									<span className="italic text-white/50">every pixel.</span>
								</h2>
								<p className="text-base md:text-lg text-white/60 leading-relaxed">
									Our platform enables creators to build immersive web experiences that rival major motion picture studios. With WebGL-powered depth and fluid animations, your content becomes a world of its own.
								</p>
								<Button variant="link" className="text-white p-0 h-auto text-base md:text-lg underline-offset-4 decoration-white/30 hover:decoration-white">
									Learn about our technology
								</Button>
							</div>
							<div className="aspect-square md:aspect-[4/5] rounded-lg overflow-hidden relative bg-neutral-900 border border-white/5">
								<div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20" />
								{/* Placeholder for a cool graphic or 3D element */}
								<div className="absolute inset-0 flex items-center justify-center text-white/20 font-serif italic text-3xl md:text-4xl">
									Visuals
								</div>
							</div>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</ScrollProvider>
	);
}
