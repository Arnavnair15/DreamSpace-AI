import { useState, FormEvent } from "react";
import { Sparkles, Send, Check } from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-slate-900 text-slate-400 py-16 px-4 overflow-hidden border-t border-slate-800 dark:bg-slate-950">
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 pb-12 border-b border-slate-800">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/15">
              <Sparkles className="h-5.5 w-5.5 text-white" />
            </div>
            <span className="font-sans font-bold tracking-tight text-white text-lg">
              DreamSpace<span className="text-purple-400"> AI</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Reimagine your living environment. Upload a photo, select a premium style, and instantly visualize your dream home before spending a dime on construction.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#hero" className="hover:text-purple-400 transition-colors">Design Studio</a></li>
            <li><a href="#features" className="hover:text-purple-400 transition-colors">AI Features</a></li>
            <li><a href="#gallery" className="hover:text-purple-400 transition-colors">Community Gallery</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing Plans</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ Support</a></li>
            <li><span className="cursor-not-allowed hover:text-purple-400 transition-colors">Design Guidelines</span></li>
            <li><span className="cursor-not-allowed hover:text-purple-400 transition-colors">API Integration</span></li>
            <li><span className="cursor-not-allowed hover:text-purple-400 transition-colors">Affiliate Program</span></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">Subscribe to Digest</h4>
          <p className="text-sm mb-4 leading-relaxed text-slate-400">
            Get the latest architectural style guides, AI feature drops, and spatial interior trends.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700/60 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="absolute right-1.5 p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 active:scale-95 transition-all text-white"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          {subscribed && (
            <span className="inline-block mt-2 text-xs font-medium text-emerald-400">
              ✓ Subscribed! Enjoy premium inspirations weekly.
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <span>© 2026 DreamSpace AI. Built with precision for Frontend Battle 2026.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-400 cursor-pointer">Cookie Settings</span>
        </div>
      </div>
    </footer>
  );
}
