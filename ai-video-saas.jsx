import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "Templates", "Pricing", "FAQ"];

const STATS = [
  { value: "2.4M+", label: "Videos Generated" },
  { value: "180K+", label: "Active Creators" },
  { value: "99.2%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average Rating" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "AI Script Engine",
    desc: "GPT-4 powered scripts with viral hooks, CTAs, and hashtags — optimized per platform.",
    accent: "#00FFAA",
  },
  {
    icon: "🎙️",
    title: "Neural Voiceover",
    desc: "ElevenLabs integration with 120+ voices, emotion controls, and multi-language support.",
    accent: "#FF6B6B",
  },
  {
    icon: "🎬",
    title: "Auto Scene Builder",
    desc: "AI splits your script, fetches visuals from Pexels/Unsplash, and sequences scenes.",
    accent: "#7C3AED",
  },
  {
    icon: "✍️",
    title: "Smart Subtitles",
    desc: "Auto-captions with cinematic styles. Word-by-word highlighting, custom fonts.",
    accent: "#F59E0B",
  },
  {
    icon: "🎵",
    title: "Music Sync",
    desc: "Royalty-free background tracks auto-ducked under your voiceover — perfectly timed.",
    accent: "#06B6D4",
  },
  {
    icon: "📐",
    title: "Multi-Format Export",
    desc: "16:9, 9:16, 1:1 — one click renders all aspect ratios for every platform.",
    accent: "#EC4899",
  },
];

const TEMPLATES = [
  { name: "Sports Hype", emoji: "🏆", tag: "Viral", color: "#FF6B6B" },
  { name: "Documentary", emoji: "🎥", tag: "Storytelling", color: "#7C3AED" },
  { name: "Motivation", emoji: "🔥", tag: "Inspirational", color: "#F59E0B" },
  { name: "Health & Wellness", emoji: "💪", tag: "Lifestyle", color: "#00FFAA" },
  { name: "Finance Reels", emoji: "📈", tag: "Education", color: "#06B6D4" },
  { name: "AI News", emoji: "🤖", tag: "Tech", color: "#EC4899" },
  { name: "History Docs", emoji: "🏛️", tag: "Education", color: "#F97316" },
  { name: "Islamic Stories", emoji: "🌙", tag: "Spiritual", color: "#8B5CF6" },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    credits: "10 videos/mo",
    features: ["720p export", "5 AI voices", "Basic templates", "Watermark", "3 aspect ratios"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    credits: "100 videos/mo",
    features: ["4K export", "120+ AI voices", "All templates", "No watermark", "Priority render", "Custom subtitles", "API access"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/mo",
    credits: "Unlimited videos",
    features: ["4K + RAW export", "White-label", "Team workspace", "Admin panel", "SLA 99.9%", "Dedicated support", "Custom integrations"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const FAQS = [
  { q: "How fast can I create a video?", a: "Most videos are ready in under 3 minutes. Complex 10-minute documentaries may take up to 8 minutes depending on rendering queue." },
  { q: "What platforms are videos optimized for?", a: "YouTube (16:9), TikTok & Reels (9:16), and Instagram Square (1:1). Each export is auto-optimized with correct bitrate and codec." },
  { q: "Can I use my own footage and voice?", a: "Yes. Upload your own clips, images, and even record your voice directly in the editor. AI enhances what you bring." },
  { q: "Is there a free trial for Pro?", a: "Every new account gets 10 free video credits. Pro trials include all features for 7 days, no credit card required." },
  { q: "How does the credits system work?", a: "Each generated video costs 1 credit. Unused credits roll over for 1 month on Pro plans." },
];

const TESTIMONIALS = [
  { name: "Aria Tanaka", role: "YouTube Creator • 1.2M subs", text: "I went from 2 videos/week to 14. The AI scripts are genuinely good — not the usual garbage.", avatar: "AT" },
  { name: "Marcus Webb", role: "Agency Owner", text: "We produce client content at 1/10th the cost. The white-label on Business is a game-changer.", avatar: "MW" },
  { name: "Priya Nair", role: "TikTok Educator • 800K", text: "The subtitle styles alone are worth it. Looks like I spent hours editing when it's literally 2 clicks.", avatar: "PN" },
];

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [start]);
  return count;
}

function StatCard({ stat, animate }) {
  const num = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const suffix = stat.value.replace(/[0-9.]/g, "");
  const count = useCounter(stat.value, 1800, animate);
  return (
    <div className="stat-card">
      <div className="stat-value">
        {animate ? (num === Math.floor(num) ? Math.floor(count) : count.toFixed(1)) : 0}{suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

function VideoPreview() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const stages = ["Generating script…", "Building scenes…", "Syncing voiceover…", "Adding subtitles…", "Rendering…", "✓ Ready!"];
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); return 100; }
        return p + 0.8;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    setStage(Math.min(Math.floor(progress / 20), 5));
  }, [progress]);
  return (
    <div className="video-preview">
      <div className="video-screen">
        <div className="video-content">
          <div className="video-title-line" />
          <div className="video-sub-line" />
          <div className="scene-grid">
            {[0,1,2,3].map(i => (
              <div key={i} className={`scene-block ${progress > i * 25 ? 'scene-active' : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <div className="subtitle-bar">
            <span className="subtitle-word active">Create</span>
            <span className="subtitle-word">viral</span>
            <span className="subtitle-word">content</span>
            <span className="subtitle-word">with</span>
            <span className="subtitle-word">AI</span>
          </div>
        </div>
      </div>
      <div className="progress-section">
        <div className="stage-label">{stages[stage]}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-pct">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [activeTab, setActiveTab] = useState("YouTube");
  const platforms = ["YouTube", "TikTok", "Instagram", "Shorts"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #060608;
          --surface: #0E0E12;
          --surface2: #141418;
          --border: rgba(255,255,255,0.07);
          --border-glow: rgba(255,255,255,0.13);
          --text: #F0F0F5;
          --muted: #7B7B8A;
          --accent: #7C3AED;
          --accent2: #00FFAA;
          --accent3: #FF6B6B;
          --glow: rgba(124,58,237,0.35);
          --glow2: rgba(0,255,170,0.2);
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        h1, h2, h3, h4, .display {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(6,6,8,0.7);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          background: linear-gradient(135deg, #fff 0%, var(--accent2) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -0.03em;
        }
        .nav-links { display: flex; gap: 2rem; align-items: center; }
        .nav-links a {
          color: var(--muted); text-decoration: none; font-size: 0.9rem;
          font-weight: 500; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
        .btn-ghost {
          background: none; border: none; color: var(--muted); cursor: pointer;
          font-size: 0.9rem; font-weight: 500; padding: 0.5rem 1rem;
          font-family: 'DM Sans', sans-serif; transition: color 0.2s;
        }
        .btn-ghost:hover { color: var(--text); }
        .btn-primary {
          background: var(--accent); color: #fff; border: none; cursor: pointer;
          font-size: 0.9rem; font-weight: 600; padding: 0.6rem 1.25rem;
          border-radius: 10px; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.2s;
        }
        .btn-primary:hover { background: #6D28D9; transform: translateY(-1px); }
        .btn-primary:hover::after { opacity: 1; }

        /* HERO */
        .hero {
          min-height: 100vh;
          padding: 120px 2rem 80px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,255,170,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 20% 70%, rgba(255,107,107,0.06) 0%, transparent 50%);
        }
        .hero-grid {
          position: absolute; inset: 0; z-index: 0; opacity: 0.03;
          background-image: linear-gradient(var(--border-glow) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-glow) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3);
          border-radius: 100px; padding: 0.35rem 1rem;
          font-size: 0.8rem; font-weight: 600; color: #A78BFA;
          margin-bottom: 2rem; position: relative; z-index: 1;
          animation: fadeSlide 0.6s ease forwards;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent2);
          box-shadow: 0 0 8px var(--accent2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }

        .hero-headline {
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1.05;
          max-width: 900px;
          margin-bottom: 1.5rem;
          position: relative; z-index: 1;
          animation: fadeSlideUp 0.7s 0.1s ease both;
        }
        .grad-text {
          background: linear-gradient(135deg, #fff 0%, #C4B5FD 40%, var(--accent2) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-sub {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: var(--muted); max-width: 600px;
          margin-bottom: 2.5rem; font-weight: 400; line-height: 1.7;
          position: relative; z-index: 1;
          animation: fadeSlideUp 0.7s 0.2s ease both;
        }
        .hero-ctas {
          display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
          position: relative; z-index: 1;
          animation: fadeSlideUp 0.7s 0.3s ease both;
          margin-bottom: 4rem;
        }
        .btn-hero-primary {
          background: linear-gradient(135deg, var(--accent), #9333EA);
          color: #fff; border: none; cursor: pointer;
          font-size: 1rem; font-weight: 700; padding: 0.9rem 2rem;
          border-radius: 12px; font-family: 'Syne', sans-serif;
          transition: all 0.3s; box-shadow: 0 0 30px rgba(124,58,237,0.4);
          letter-spacing: -0.01em;
        }
        .btn-hero-primary:hover {
          transform: translateY(-2px); box-shadow: 0 0 50px rgba(124,58,237,0.6);
        }
        .btn-hero-ghost {
          background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border-glow);
          cursor: pointer; font-size: 1rem; font-weight: 600;
          padding: 0.9rem 2rem; border-radius: 12px; font-family: 'Syne', sans-serif;
          transition: all 0.3s; display: flex; align-items: center; gap: 0.5rem;
          backdrop-filter: blur(10px);
        }
        .btn-hero-ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }

        /* PLATFORM TABS */
        .platform-tabs {
          display: flex; gap: 0.5rem; justify-content: center;
          margin-bottom: 2rem; position: relative; z-index: 1;
          animation: fadeSlideUp 0.7s 0.35s ease both;
        }
        .tab-btn {
          background: rgba(255,255,255,0.05); border: 1px solid var(--border);
          color: var(--muted); cursor: pointer; padding: 0.4rem 1rem;
          border-radius: 8px; font-size: 0.85rem; font-weight: 500;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .tab-btn.active {
          background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.5);
          color: #A78BFA;
        }

        /* VIDEO PREVIEW */
        .video-preview-wrap {
          position: relative; z-index: 1; width: 100%; max-width: 680px;
          animation: fadeSlideUp 0.8s 0.4s ease both;
        }
        .video-preview {
          background: var(--surface);
          border: 1px solid var(--border-glow);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 0 80px rgba(124,58,237,0.15), 0 40px 80px rgba(0,0,0,0.5);
        }
        .video-screen {
          background: #0A0A10; height: 260px; position: relative; overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .video-content { padding: 1.5rem; height: 100%; display: flex; flex-direction: column; gap: 1rem; }
        .video-title-line { height: 12px; border-radius: 6px; background: rgba(255,255,255,0.1); width: 60%; }
        .video-sub-line { height: 8px; border-radius: 4px; background: rgba(255,255,255,0.05); width: 40%; }
        .scene-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 0.5rem; flex: 1; }
        .scene-block {
          border-radius: 8px; background: rgba(255,255,255,0.04);
          border: 1px solid var(--border); transition: all 0.5s ease;
        }
        .scene-block.scene-active {
          background: rgba(124,58,237,0.2); border-color: rgba(124,58,237,0.4);
          box-shadow: 0 0 15px rgba(124,58,237,0.2);
        }
        .subtitle-bar {
          display: flex; gap: 0.5rem; align-items: center;
          background: rgba(0,0,0,0.4); border-radius: 6px; padding: 0.5rem 0.75rem;
        }
        .subtitle-word { font-size: 0.8rem; color: var(--muted); }
        .subtitle-word.active { color: var(--accent2); font-weight: 700; }
        .progress-section {
          padding: 1rem 1.25rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .stage-label { font-size: 0.8rem; color: var(--muted); flex: 1; white-space: nowrap; font-weight: 500; }
        .progress-bar { flex: 2; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 2px; transition: width 0.1s linear; }
        .progress-pct { font-size: 0.75rem; color: var(--muted); font-weight: 600; min-width: 32px; text-align: right; }

        /* STATS */
        .stats-section { padding: 4rem 2rem; }
        .stats-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr));
          gap: 1.5rem; max-width: 900px; margin: 0 auto;
        }
        .stat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.5rem; text-align: center;
          transition: border-color 0.3s;
        }
        .stat-card:hover { border-color: var(--border-glow); }
        .stat-value {
          font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800;
          background: linear-gradient(135deg, #fff, #C4B5FD);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.5rem; font-weight: 500; }

        /* SECTION COMMONS */
        section { padding: 6rem 2rem; }
        .section-label {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--accent2);
          display: flex; align-items: center; gap: 0.5rem;
          justify-content: center; margin-bottom: 1rem;
        }
        .section-label::before, .section-label::after {
          content: ''; flex: 0 0 24px; height: 1px; background: var(--accent2); opacity: 0.4;
        }
        .section-title {
          font-size: clamp(1.8rem, 4vw, 3rem); text-align: center; margin-bottom: 1rem;
        }
        .section-sub { color: var(--muted); text-align: center; max-width: 560px; margin: 0 auto 4rem; font-size: 1rem; line-height: 1.7; }

        /* FEATURES */
        .features-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
          gap: 1.5rem; max-width: 1100px; margin: 0 auto;
        }
        .feature-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 2rem; position: relative; overflow: hidden;
          transition: all 0.3s; cursor: default;
        }
        .feature-card::before {
          content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s;
          background: radial-gradient(ellipse at 50% 0%, var(--card-accent-rgb) 0%, transparent 70%);
        }
        .feature-card:hover { border-color: var(--border-glow); transform: translateY(-4px); }
        .feature-card:hover::before { opacity: 0.06; }
        .feature-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
        .feature-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .feature-desc { color: var(--muted); font-size: 0.9rem; line-height: 1.6; }
        .feature-accent-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; opacity: 0; transition: opacity 0.3s; }
        .feature-card:hover .feature-accent-bar { opacity: 1; }

        /* TEMPLATES */
        .templates-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr));
          gap: 1rem; max-width: 1100px; margin: 0 auto;
        }
        .template-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.5rem; cursor: pointer;
          transition: all 0.25s; position: relative; overflow: hidden;
        }
        .template-card:hover { transform: translateY(-3px); border-color: var(--border-glow); }
        .template-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; display: block; }
        .template-tag {
          display: inline-block; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; padding: 0.2rem 0.6rem;
          border-radius: 100px; margin-bottom: 0.5rem;
        }
        .template-name { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; }

        /* PRICING */
        .pricing-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
          gap: 1.5rem; max-width: 980px; margin: 0 auto;
        }
        .pricing-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 24px; padding: 2rem; position: relative; overflow: hidden;
          transition: all 0.3s;
        }
        .pricing-card.highlight {
          border-color: rgba(124,58,237,0.5);
          box-shadow: 0 0 40px rgba(124,58,237,0.15);
          background: linear-gradient(145deg, rgba(124,58,237,0.08), var(--surface));
        }
        .pricing-badge {
          position: absolute; top: 1.25rem; right: 1.25rem;
          background: linear-gradient(135deg, var(--accent), #9333EA);
          color: #fff; font-size: 0.7rem; font-weight: 700;
          padding: 0.25rem 0.65rem; border-radius: 100px; letter-spacing: 0.05em;
        }
        .plan-name { font-size: 0.85rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
        .plan-price { font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800; line-height: 1; }
        .plan-period { font-size: 1rem; color: var(--muted); font-weight: 400; }
        .plan-credits { font-size: 0.85rem; color: var(--accent2); font-weight: 600; margin: 0.5rem 0 1.5rem; }
        .plan-features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
        .plan-features li { font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; color: var(--muted); }
        .plan-features li::before { content: '✓'; color: var(--accent2); font-weight: 700; font-size: 0.8rem; }
        .plan-features li.highlight-feat { color: var(--text); }
        .btn-plan {
          width: 100%; padding: 0.85rem; border-radius: 12px; font-size: 0.95rem;
          font-weight: 700; cursor: pointer; border: none; font-family: 'Syne', sans-serif;
          transition: all 0.25s;
        }
        .btn-plan.primary {
          background: linear-gradient(135deg, var(--accent), #9333EA); color: #fff;
          box-shadow: 0 0 25px rgba(124,58,237,0.35);
        }
        .btn-plan.primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(124,58,237,0.5); }
        .btn-plan.ghost { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border-glow); }
        .btn-plan.ghost:hover { background: rgba(255,255,255,0.1); }

        /* TESTIMONIALS */
        .testimonials-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr));
          gap: 1.5rem; max-width: 980px; margin: 0 auto;
        }
        .testimonial-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 1.75rem; transition: border-color 0.3s;
        }
        .testimonial-card:hover { border-color: var(--border-glow); }
        .testimonial-text { font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.25rem; color: var(--text); }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .author-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800; color: #fff; flex-shrink: 0;
          font-family: 'Syne', sans-serif;
        }
        .author-name { font-weight: 700; font-size: 0.9rem; font-family: 'Syne', sans-serif; }
        .author-role { font-size: 0.78rem; color: var(--muted); }

        /* FAQ */
        .faq-list { max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.75rem; }
        .faq-item {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden; transition: border-color 0.2s;
        }
        .faq-item.open { border-color: rgba(124,58,237,0.4); }
        .faq-q {
          padding: 1.1rem 1.25rem; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          font-weight: 600; font-size: 0.95rem; gap: 1rem;
          background: none; border: none; color: var(--text);
          width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .faq-q:hover { color: #fff; }
        .faq-chevron { color: var(--muted); transition: transform 0.3s; flex-shrink: 0; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--accent2); }
        .faq-a { padding: 0 1.25rem 1.1rem; color: var(--muted); font-size: 0.9rem; line-height: 1.7; }

        /* CTA */
        .cta-section {
          padding: 6rem 2rem;
          background: radial-gradient(ellipse 80% 100% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%);
          text-align: center;
        }
        .cta-section h2 { font-size: clamp(2rem,5vw,3.5rem); margin-bottom: 1rem; }
        .cta-section p { color: var(--muted); font-size: 1.1rem; margin-bottom: 2.5rem; }
        .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border); padding: 3rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-logo {
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem;
          background: linear-gradient(135deg, #fff, var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-links a { color: var(--muted); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }
        .footer-copy { color: var(--muted); font-size: 0.8rem; }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 3px; }

        /* MOBILE */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero { padding: 100px 1.25rem 60px; }
          .hero-ctas { flex-direction: column; align-items: center; }
          .btn-hero-primary, .btn-hero-ghost { width: 100%; max-width: 280px; justify-content: center; }
          section { padding: 4rem 1.25rem; }
          footer { flex-direction: column; text-align: center; }
          .footer-links { justify-content: center; }
        }

        @media (max-width: 480px) {
          .pricing-grid, .features-grid, .templates-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">▲ Framely</div>
        <div className="nav-links">
          {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
        </div>
        <div className="nav-actions">
          <button className="btn-ghost">Log in</button>
          <button className="btn-primary">Start Free →</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-badge">
          <div className="badge-dot" /> AI Video Generation · Powered by GPT-4 + ElevenLabs
        </div>
        <h1 className="hero-headline">
          Create <span className="grad-text">Viral AI Videos</span><br />in Minutes
        </h1>
        <p className="hero-sub">
          Generate YouTube, TikTok, Instagram, and Shorts videos automatically using AI. Script → Voiceover → Edit → Export.
        </p>
        <div className="platform-tabs">
          {platforms.map(p => (
            <button key={p} className={`tab-btn ${activeTab === p ? 'active' : ''}`} onClick={() => setActiveTab(p)}>{p}</button>
          ))}
        </div>
        <div className="hero-ctas">
          <button className="btn-hero-primary">Start Free — No Credit Card</button>
          <button className="btn-hero-ghost">▶ Watch 90s Demo</button>
        </div>
        <div className="video-preview-wrap">
          <VideoPreview />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map(s => <StatCard key={s.label} stat={s} animate={statsVisible} />)}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything you need to go viral</h2>
        <p className="section-sub">One platform replaces your entire video production stack — script, voice, edit, export.</p>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card" style={{ '--card-accent-rgb': f.accent } as React.CSSProperties}>
              <span className="feature-icon">{f.icon}</span>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
              <div className="feature-accent-bar" style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" style={{ background: 'var(--surface)' }}>
        <div className="section-label">Templates</div>
        <h2 className="section-title">Launch in one click</h2>
        <p className="section-sub">Battle-tested templates for every niche. Just pick one and go.</p>
        <div className="templates-grid">
          {TEMPLATES.map(t => (
            <div key={t.name} className="template-card" style={{ borderColor: 'var(--border)' }}>
              <span className="template-emoji">{t.emoji}</span>
              <div className="template-tag" style={{ background: `${t.color}22`, color: t.color }}>{t.tag}</div>
              <div className="template-name">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="section-label">Testimonials</div>
        <h2 className="section-title">Creators love Framely</h2>
        <p className="section-sub">From solo creators to agencies — see what people are building.</p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: 'var(--surface)' }}>
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Simple, creator-first pricing</h2>
        <p className="section-sub">Start free. Scale when you're ready. No hidden fees.</p>
        <div className="pricing-grid">
          {PLANS.map(plan => (
            <div key={plan.name} className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}>
              {plan.highlight && <div className="pricing-badge">MOST POPULAR</div>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                {plan.price}<span className="plan-period">{plan.period}</span>
              </div>
              <div className="plan-credits">{plan.credits}</div>
              <ul className="plan-features">
                {plan.features.map(f => (
                  <li key={f} className={plan.highlight ? 'highlight-feat' : ''}>{f}</li>
                ))}
              </ul>
              <button className={`btn-plan ${plan.highlight ? 'primary' : 'ghost'}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Questions? Answered.</h2>
        <p className="section-sub" style={{ marginBottom: '2.5rem' }}>Everything you need to know before you create.</p>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item ${activeFaq === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                {f.q}
                <span className="faq-chevron">▾</span>
              </button>
              {activeFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section">
        <h2 className="display">Ready to create your<br /><span className="grad-text">first viral video?</span></h2>
        <p>Join 180,000+ creators already automating their content with Framely.</p>
        <div className="cta-buttons">
          <button className="btn-hero-primary">Start Free — It's 2 minutes</button>
          <button className="btn-hero-ghost">See all features</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">▲ Framely</div>
        <div className="footer-links">
          {["Features", "Pricing", "Templates", "API Docs", "Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
        <div className="footer-copy">© 2026 Framely Inc. All rights reserved.</div>
      </footer>
    </>
  );
}
