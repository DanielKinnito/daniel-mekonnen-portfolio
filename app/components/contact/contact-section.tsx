import ContactForm from "@/components/contact/contact-form";
import { GMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from "@/lib/constants";
import Image from "next/image";

export default function ContactSection() {
  const contactPoints = [
    {
      label: "Direct Email",
      value: GMAIL_LINK,
      href: `mailto:${GMAIL_LINK}`,
      icon: "/svg/mail.svg",
    },
    {
      label: "GitHub",
      value: "DanielKinnito",
      href: GITHUB_LINK,
      icon: "/skills/github.svg",
    },
    {
      label: "LinkedIn",
      value: "Daniel Mekonnen",
      href: LINKEDIN_LINK,
      icon: "/svg/linkedin.svg",
    },
    {
      label: "Location",
      value: "Addis Ababa, Ethiopia",
      note: "Available for Worldwide Remote",
      icon: "/svg/send-message.svg",
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            [05] Communication Channels
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Get in Touch
        </h2>
        <p className="max-w-2xl text-base text-secondary">
          Open to backend engineering roles, AI reasoning evaluation consulting, and technical collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Contact Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <h3 className="font-mono text-base font-bold text-primary mb-1">
              Direct Contact
            </h3>
            <p className="text-xs text-muted mb-5">
              Feel free to reach out directly through any of these platforms:
            </p>

            <div className="space-y-4">
              {contactPoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
                    <Image
                      src={cp.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="opacity-75"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-muted uppercase tracking-wider">
                      {cp.label}
                    </span>
                    {cp.href ? (
                      <a
                        href={cp.href}
                        target={cp.href.startsWith("http") ? "_blank" : undefined}
                        rel={cp.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium text-primary hover:text-accent transition-colors"
                      >
                        {cp.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-primary">
                        {cp.value}
                      </span>
                    )}
                    {cp.note && (
                      <span className="block text-[11px] text-muted">
                        {cp.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
