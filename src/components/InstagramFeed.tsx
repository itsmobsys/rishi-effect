/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, MessageCircle, Heart } from "lucide-react";

interface InstaPost {
  id: string;
  imgUrl: string;
  likes: string;
  comments: string;
  caption: string;
  postUrl: string;
}

const INSTAGRAM_POSTS_DATA: InstaPost[] = [
  {
    id: "post_1",
    imgUrl: "https://picsum.photos/seed/agency_growth/500/600",
    likes: "1,240",
    comments: "84",
    caption: "How we took a traditional real estate developer from 200 stagnant followers to 18,400+ explosive inquiries in 90 days flat with vertical video hacks.",
    postUrl: "https://instagram.com/therishieffect",
  },
  {
    id: "post_2",
    imgUrl: "https://picsum.photos/seed/marketing_tricks/500/400",
    likes: "3,890",
    comments: "213",
    caption: "The psychology of the 3-second visual hook. If you fail to trigger physical thumb slowing inside 180 frames, you are dead to the algorithm.",
    postUrl: "https://instagram.com/therishieffect",
  },
  {
    id: "post_3",
    imgUrl: "https://picsum.photos/seed/brand_voice/500/700",
    likes: "942",
    comments: "42",
    caption: "8 brand core strategy laws most entrepreneurs ignore. Number 3 is why your competitors are running circles around your visual identity.",
    postUrl: "https://instagram.com/therishieffect",
  },
  {
    id: "post_4",
    imgUrl: "https://picsum.photos/seed/viral_loops/500/500",
    likes: "4,611",
    comments: "305",
    caption: "The exact story scripting framework we use to generate over ₹25 Lakhs in organic pipelines with absolutely zero paid ad spend.",
    postUrl: "https://instagram.com/therishieffect",
  },
  {
    id: "post_5",
    imgUrl: "https://picsum.photos/seed/creator_hacks/500/650",
    likes: "1,804",
    comments: "91",
    caption: "Personal Branding is not vanity metrics. It is the single highest leverage financial asset of the 21st century. Your network is your distribution.",
    postUrl: "https://instagram.com/therishieffect",
  },
  {
    id: "post_6",
    imgUrl: "https://picsum.photos/seed/content_factory/500/450",
    likes: "2,745",
    comments: "144",
    caption: "Inside our high-speed vertical video factory. How we output 30+ highly-polished cinematic pieces of content a month in under 4 operating hours.",
    postUrl: "https://instagram.com/therishieffect",
  },
];

export default function InstagramFeed() {
  return (
    <section 
      id="content-universe"
      className="py-24 px-4 md:px-12 bg-[#0A0A0A] border-t border-white/[0.04] relative z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0062FF]/5 blur-[150px] rounded-full pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1.5 rounded-full border border-[#C9A84C]/20 mb-3 tracking-widest uppercase">
            <span>DISTRIBUTION UNIVERSE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#F5F0E8] tracking-tight leading-none uppercase">
            INSIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0062FF] via-[#C9A84C] to-[#00D5FF]">THE EFFECT</span> HUB
          </h2>
          <p className="mt-3 font-sans text-sm md:text-base text-[#F5F0E8]/60 max-w-xl mx-auto">
            High-octane strategies, viral script layouts, and tactical marketing guidelines distributed daily across our channels.
          </p>
        </div>

        {/* Masonry Post Grid (4 Columns) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {INSTAGRAM_POSTS_DATA.map((post) => (
            <div 
              key={post.id}
              onClick={() => window.open(post.postUrl, "_blank")}
              data-cursor="view"
              className="break-inside-avoid relative rounded-2xl bg-[#111118] border border-white/[0.04] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[#0062FF] hover:shadow-[0_0_20px_rgba(0,98,255,0.15)] transform hover:-translate-y-1"
            >
              {/* Image with direct referrer tag */}
              <img 
                src={post.imgUrl} 
                alt="Instagram Content Preview" 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY WITH META READING INFO */}
              <div className="absolute inset-0 bg-void/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between z-10">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#0062FF] uppercase tracking-widest">
                    <Flame className="w-4 h-4" />
                    <span>VIRAL TELEMETRY</span>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-[#F5F0E8]/90 leading-relaxed font-semibold">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5 font-mono text-xs text-rose-500 font-bold">
                      <Heart className="w-4 h-4 fill-rose-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 font-mono text-xs text-[#00D5FF] font-bold">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#C9A84C] tracking-widest uppercase border border-[#C9A84C]/20 px-2 py-0.5 rounded">
                    READ POST
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Below Feed Callout banner */}
        <div className="mt-16 text-center">
          <div className="bg-[#111118]/70 border border-[#0062FF]/15 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/5 blur-xl rounded-full" />
            
            <h3 className="font-display text-xl md:text-2xl font-black text-[#F5F0E8] tracking-tight mb-2">
              JOIN 42,000+ WHO LEARN MARKETING DAILY
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#F5F0E8]/50 mb-6 uppercase tracking-widest font-bold">
              Unshackle your pipeline with free growth breakdowns.
            </p>

            <a 
              href="https://instagram.com/therishieffect"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#0062FF] to-[#00D5FF] hover:from-[#00D5FF] hover:to-[#0062FF] text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,98,255,0.3)] transform hover:scale-[1.03]"
            >
              <span>Follow @therishieffect on Instagram</span>
              <span className="animate-bounce">⚡</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
