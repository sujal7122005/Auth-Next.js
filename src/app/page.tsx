'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{ animation: "bgShift 10s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-500/10 blur-3xl"
        style={{ animation: "float 8s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-125 w-125 rounded-full bg-purple-500/10 blur-3xl"
        style={{ animation: "float 8s ease-in-out infinite 4s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl"
        style={{ animation: "float 10s ease-in-out infinite 2s" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          animation: "gridReveal 3s ease-out 0.5s forwards",
        }}
      />

      <main className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl backdrop-blur-sm border border-blue-500/20"
          style={{ animation: "scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}
        >
          🔐
        </div>

        {/* Divider line */}
        <div
          className="h-px w-0 bg-linear-to-r from-transparent via-blue-500/50 to-transparent"
          style={{ animation: "lineExpand 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards" }}
        />

        {/* Heading */}
        <h1
          className="text-5xl font-bold tracking-tight text-white sm:text-6xl opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards" }}
        >
          Hello, Welcome!
        </h1>

        {/* Brief */}
        <p
          className="max-w-md text-lg leading-relaxed text-gray-400 opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards" }}
        >
          A secure authentication system built with Next.js. Sign up to create
          your account, verify your email, and manage your profile — all in one
          place.
        </p>

        {/* Feature pills */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1.6s forwards" }}
        >
          {["Secure Auth", "Email Verification", "Profile Management"].map((feature, i) => (
            <span
              key={feature}
              className="rounded-full border border-gray-700/50 bg-gray-800/50 px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm"
              style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.8 + i * 0.15}s both` }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Signup Button */}
        <Link
          href="/signup"
          className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 2.2s forwards" }}
        >
          <span
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            style={{ animation: "shimmer 3s ease-in-out 3s infinite" }}
          />
          Get Started
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p
          className="text-sm text-gray-500 opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 2.5s forwards" }}
        >
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Log in
          </Link>
        </p>

        {/* Author */}
        <p
          className="mt-4 text-xs tracking-widest uppercase text-gray-600 opacity-0"
          style={{ animation: "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 2.8s forwards" }}
        >
          Built by{"       "}
          <span className="text-gray-400 text-4xl">Sujal Patel</span>
        </p>
      </main>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes lineExpand {
          from {
            width: 0;
          }
          to {
            width: 120px;
          }
        }
        @keyframes gridReveal {
          to {
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.08) translateY(-20px);
          }
        }
        @keyframes bgShift {
          from {
            background: radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.04) 0%, transparent 60%),
                         radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.04) 0%, transparent 60%),
                         #030712;
          }
          to {
            background: radial-gradient(ellipse at 60% 40%, rgba(59,130,246,0.06) 0%, transparent 60%),
                         radial-gradient(ellipse at 40% 60%, rgba(139,92,246,0.06) 0%, transparent 60%),
                         #030712;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
