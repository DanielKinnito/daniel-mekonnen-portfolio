"use client";

import ContactAndResumeBtns from "@/components/home/contact-and-resume-btns";
import { motion, Variants } from "framer-motion";
import { floatUp, spring } from "@/lib/animation";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function IntroPanel() {
  return (
    <motion.div
      className="relative w-full space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Proof pill badge in PostHog tactile style */}
      <motion.div variants={floatUp} className="inline-flex">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-mono text-muted shadow-xs">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-primary font-medium">Backend Software Engineer</span>
          <span className="text-border">•</span>
          <span>Addis Ababa, ET</span>
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div variants={floatUp} className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Daniel Mekonnen
        </h1>
        <p className="text-lg font-medium text-accent sm:text-xl font-mono">
          Backend Engineer &amp; Systems Builder
        </p>
      </motion.div>

      {/* Lead Copy focusing on Backend Architecture, Skills & Projects */}
      <motion.p
        variants={floatUp}
        className="max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
      >
        Software Engineer focused on building{" "}
        <span className="highlighter-wash font-medium text-primary">scalable backend microservices</span>,
        distributed APIs, and performance-critical developer tools. Creator of{" "}
        <a
          href="https://github.com/DanielKinnito/hexpic"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold underline decoration-accent/60 underline-offset-4 hover:text-accent"
        >
          HexPic
        </a>{" "}
        (high-performance raster-to-vector ASCII engine), production Telegram mini-apps, and automated data pipelines. Experienced with Python, TypeScript, Go, PostgreSQL, Docker, and Linux.
      </motion.p>

      {/* Metric Proof Strip: Backend, HexPic, and Databases */}
      <motion.div
        variants={floatUp}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg pt-1"
      >
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs">
          <p className="text-lg sm:text-xl font-bold font-mono text-primary truncate">Backend</p>
          <p className="text-xs text-muted">Microservices &amp; APIs</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs">
          <p className="text-lg sm:text-xl font-bold font-mono text-primary truncate">HexPic</p>
          <p className="text-xs text-muted">Raster &amp; Vector Engine</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs col-span-2 sm:col-span-1">
          <p className="text-lg sm:text-xl font-bold font-mono text-primary truncate">Databases</p>
          <p className="text-xs text-muted">PostgreSQL &amp; Supabase</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={floatUp} transition={spring}>
        <ContactAndResumeBtns />
      </motion.div>
    </motion.div>
  );
}
