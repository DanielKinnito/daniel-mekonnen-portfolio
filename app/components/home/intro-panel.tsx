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
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-mono text-muted shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-primary font-medium">Remote Software Engineer</span>
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
          Backend Architect & Algorithmic Problem Solver
        </p>
      </motion.div>

      {/* Lead Copy with PostHog-style subtle keyword highlights */}
      <motion.p
        variants={floatUp}
        className="max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
      >
        Software Engineering graduate from Addis Ababa Science and Technology
        University. Former Remote Head of Education and Lecture Squad Lead at{" "}
        <a
          href="https://a2sv.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium underline decoration-accent/60 underline-offset-4 hover:text-accent"
        >
          A2SV
        </a>
        . Specialized in building <span className="highlighter-wash font-medium text-primary">backend microservices</span>,{" "}
        <span className="highlighter-wash font-medium text-primary">AI model reasoning evaluation</span>, and high-performance algorithmic tools.
      </motion.p>

      {/* Metric Proof Strip */}
      <motion.div
        variants={floatUp}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg pt-1"
      >
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs">
          <p className="text-2xl font-bold font-mono text-primary">800+</p>
          <p className="text-xs text-muted">Solved DSA Problems</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs">
          <p className="text-2xl font-bold font-mono text-primary">A2SV</p>
          <p className="text-xs text-muted">Head of Education</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 shadow-xs col-span-2 sm:col-span-1">
          <p className="text-2xl font-bold font-mono text-primary">3.58</p>
          <p className="text-xs text-muted">CGPA / Software Eng.</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={floatUp} transition={spring}>
        <ContactAndResumeBtns />
      </motion.div>
    </motion.div>
  );
}
