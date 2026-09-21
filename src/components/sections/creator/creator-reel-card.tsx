
export interface CreatorReelData {
  id: string;
  title: string;
  category: string;
  views: string;
  likes: string;
  platform: "instagram" | "tiktok";
  hook: string;
  url: string;
  gradient: string;
}

export const featuredReels: CreatorReelData[] = [
  {
    id: "systems-thinking",
    title: "Why 99% of Developers Struggle with Systems Design",
    category: "Engineering Architecture",
    views: "2.4M",
    likes: "148K",
    platform: "instagram",
    hook: "Code solves syntax. Architecture solves business scale.",
    url: "https://instagram.com/aaliy4n",
    gradient: "from-[#1a1412] via-[#141212] to-copper/25",
  },
  {
    id: "creator-engineers",
    title: "The Unfair Advantage of the Creator-Engineer",
    category: "Audience & Product",
    views: "1.8M",
    likes: "112K",
    platform: "instagram",
    hook: "Building is 50%. The other 50% is getting people to care.",
    url: "https://instagram.com/aaliy4n",
    gradient: "from-[#15171c] via-[#101215] to-[#3178C6]/25",
  },
  {
    id: "bootstrapping-vector",
    title: "Bootstrapping Vector Labs: Building Beyond the Solo Dev",
    category: "Founder Mindset",
    views: "950K",
    likes: "74K",
    platform: "tiktok",
    hook: "Stop trading time for hours. Start building systems.",
    url: "https://www.tiktok.com/@aaliy4nahmad",
    gradient: "from-[#141815] via-[#101311] to-[#47A248]/20",
  },
];

export function CreatorReelCard({ reel }: { reel: CreatorReelData }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-xl border border-[var(--line-strong)] bg-surface p-6 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-copper/50 hover:shadow-[0_20px_45px_rgba(184,121,82,0.18)]"
    >
      {/* Background Gradient & Pattern */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${reel.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black/60 pointer-events-none" />

      {/* Top Bar: Category & Platform */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-wider text-bone backdrop-blur-md">
          {reel.category}
        </span>
        <div className="flex items-center gap-1.5 rounded-full border border-copper/30 bg-copper/10 px-2 py-0.5 text-[0.6rem] font-bold text-copper backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-copper animate-pulse" />
          {reel.platform === "instagram" ? "Reel" : "TikTok"}
        </div>
      </div>

      {/* Center Play Button Overlay */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        <div className="grid size-14 place-items-center rounded-full border border-white/20 bg-black/50 text-bone shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-copper group-hover:bg-copper group-hover:text-carbon">
          <svg className="ml-1 size-5 fill-current" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="mt-3 text-[0.62rem] font-semibold uppercase tracking-widest text-bone-soft/70">
          Watch on {reel.platform === "instagram" ? "Instagram" : "TikTok"} ↗
        </span>
      </div>

      {/* Bottom Content: Title, Hook & Views */}
      <div className="relative z-10 border-t border-white/10 pt-4">
        <p className="font-serif italic text-xs text-copper leading-relaxed">
          &ldquo;{reel.hook}&rdquo;
        </p>
        <h4 className="mt-2 text-sm font-semibold leading-snug text-bone tracking-tight transition-colors group-hover:text-bone-soft">
          {reel.title}
        </h4>

        <div className="mt-4 flex items-center justify-between text-[0.65rem] text-muted font-mono border-t border-white/5 pt-3">
          <span className="flex items-center gap-1 text-bone">
            <span className="text-copper">👁</span> {reel.views} Views
          </span>
          <span>❤️ {reel.likes}</span>
        </div>
      </div>
    </a>
  );
}
