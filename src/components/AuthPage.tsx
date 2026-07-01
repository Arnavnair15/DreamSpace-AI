import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Sparkles, Mail, Lock, User, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { UserProfile } from "../types";

interface AuthPageProps {
  onLogin: (user: UserProfile) => void;
  setCurrentView: (view: string) => void;
}

type AuthMode = "signin" | "signup" | "forgot";

export default function AuthPage({ onLogin, setCurrentView }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signin") {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }
      
      // Simulate successful login
      const mockUser: UserProfile = {
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
        credits: 85,
        maxCredits: 100,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
        isPro: true
      };

      setSuccess("Successfully authenticated! Launching Workspace...");
      setTimeout(() => {
        onLogin(mockUser);
        setCurrentView("dashboard");
      }, 1000);

    } else if (mode === "signup") {
      if (!name || !email || !password) {
        setError("All fields are required to register.");
        return;
      }

      const mockUser: UserProfile = {
        name: name,
        email: email,
        credits: 10, // free plan starting credits
        maxCredits: 10,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
        isPro: false
      };

      setSuccess("Account successfully created! Loading free trial...");
      setTimeout(() => {
        onLogin(mockUser);
        setCurrentView("dashboard");
      }, 1200);

    } else {
      // Forgot password mode
      if (!email) {
        setError("Please enter your email address first.");
        return;
      }
      setSuccess("A recovery link has been dispatched to your email address!");
      setEmail("");
    }
  };

  const handleGoogleLogin = () => {
    const googleUser: UserProfile = {
      name: "Arnav Nair",
      email: "nairarnav15@gmail.com",
      credits: 85,
      maxCredits: 100,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      isPro: true
    };

    setSuccess("Connecting to Google Account...");
    setTimeout(() => {
      onLogin(googleUser);
      setCurrentView("dashboard");
    }, 800);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-200">
      
      {/* Dynamic Background Grid and Ambient Bubbles */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Main Authenticator Glass Card */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 p-8 rounded-3xl shadow-xl">
          
          {/* Logo Heading */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/20 mb-3">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
              {mode === "signin" && "Welcome Back"}
              {mode === "signup" && "Create Account"}
              {mode === "forgot" && "Recover Access"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs">
              {mode === "signin" && "Visualize your space instantly with real-time AI modeling."}
              {mode === "signup" && "Start rendering high-fidelity concept redesigns in seconds."}
              {mode === "forgot" && "Enter your registered email and we'll send a secure login link."}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-xs font-semibold text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          {/* Social Sign-in */}
          {mode !== "forgot" && (
            <div className="space-y-4 mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-medium text-sm text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-200"
              >
                {/* Clean inline SVG for Google G logo */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.14-5.136 4.14A5.55 5.55 0 0 1 8.4 13c0-3.05 2.475-5.55 5.59-5.55 1.485 0 2.82.535 3.87 1.425l3.14-3.14C19.015 3.96 16.69 3 13.99 3A9.99 9.99 0 0 0 4 13a9.99 9.99 0 0 0 9.99 10c5.52 0 10.01-4.48 10.01-10 0-.685-.06-1.35-.175-1.995l-11.585-.72Z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase tracking-widest font-mono font-bold">
                  or email
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {/* Name Input (Signup only) */}
            {mode === "signup" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800/80 rounded-xl py-2.5 pl-10.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800/80 rounded-xl py-2.5 pl-10.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Password Input (Login/Signup only) */}
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Password
                  </label>
                  {mode === "signin" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 font-semibold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800/80 rounded-xl py-2.5 pl-10.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/10 active:scale-98 transition-all duration-150 cursor-pointer"
            >
              <span>
                {mode === "signin" && "Continue to Dashboard"}
                {mode === "signup" && "Register Account"}
                {mode === "forgot" && "Send recovery email"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Modes Footer */}
          <div className="mt-6 pt-5 border-t border-slate-200/50 dark:border-slate-800/50 text-center text-xs">
            {mode === "signin" && (
              <p className="text-slate-500 dark:text-slate-400">
                New to DreamSpace?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-extrabold"
                >
                  Create an account
                </button>
              </p>
            )}
            {mode === "signup" && (
              <p className="text-slate-500 dark:text-slate-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-extrabold"
                >
                  Sign in instead
                </button>
              </p>
            )}
            {mode === "forgot" && (
              <p className="text-slate-500 dark:text-slate-400">
                Remembered details?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-extrabold"
                >
                  Back to Sign In
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Security / Quality Badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500 select-none">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span>AES-256 Mock Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span>Fast Setup, No Cards Required</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
