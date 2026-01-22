'use client';

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Play } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Cinema",
    video: "/DEMO-Vid.mp4",
  },
  {
    id: 2,
    title: "Animation",
    video: "/Vid2.mp4",
  },
  {
    id: 3,
    title: "Commercial",
    video: "/DEMO-Vid.mp4",
  },
  {
    id: 4,
    title: "Anime",
    video: "/Vid2.mp4",
  },
  {
    id: 5,
    title: "Cartoon",
    video: "/DEMO-Vid.mp4",
  }
]

export function FeaturedSection() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="py-20 md:py-32 bg-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-sans font-light text-white mb-8 md:mb-16 tracking-tight">
          <span className="text-white/50 block md:inline mr-4">Featured</span> 
          Categories
        </h2>
        
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-[500px] sm:h-[600px] w-full">
          {categories.map((category) => {
            const isActive = activeId === category.id;
            
            return (
              <div 
                key={category.id}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive 
                    ? "flex-[3] md:flex-[4] opacity-100" // Active state: takes up more space
                    : "flex-[1] opacity-60 hover:opacity-100 hover:flex-[1.2]" // Inactive state
                )}
              >
                {/* Video Background */}
                <div className="absolute inset-0 bg-neutral-900">
                   <video 
                      src={category.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                   />
                   {/* Overlay Gradient */}
                   <div className={cn(
                     "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500",
                     isActive ? "opacity-60" : "opacity-80 hover:opacity-60"
                   )} />
                </div>

                {/* Content */}
                <div className={cn(
                  "absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-all duration-500",
                  isActive ? "items-start" : "items-center md:items-start"
                )}>
                  {/* Play Icon - Only visible on inactive or hover */}
                  <div className={cn(
                    "mb-auto mt-auto md:mt-0 transition-all duration-500",
                    isActive ? "opacity-0 scale-90 hidden" : "opacity-100 scale-100"
                  )}>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className={cn(
                    "transition-transform duration-500",
                    !isActive && "md:-rotate-90 md:origin-bottom-left md:translate-x-8 md:mb-12 md:whitespace-nowrap"
                  )}>
                    <h3 className={cn(
                      "font-sans font-normal text-2xl sm:text-3xl md:text-4xl text-white tracking-wide",
                      isActive ? "scale-100" : "scale-90 opacity-80"
                    )}>
                      {category.title}
                    </h3>
                    
                    {/* Extra info only shown when active */}
                    <div className={cn(
                      "overflow-hidden transition-all duration-500 delay-100",
                      isActive ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}>
                    </div>
                  </div>
                </div>
                
                {/* Active Border/Highlight */}
                {isActive && (
                  <div className="absolute inset-0 border border-white/10 rounded-xl md:rounded-2xl pointer-events-none" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
