"use client";

import { useState } from "react";
import FormTextArea from "../ui/form-textarea";
import FormInput from "../ui/form-input";
import Button from "../ui/button";
import { ContactFormErrors, ContactFormValues } from "@/lib/types/contact";
import contactFormValidation from "@/lib/validation/contact-form-validations";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({
    email: null,
    subject: null,
    message: null,
  });

  const [isCooldown, setIsCooldown] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isCooldown || isSending) return;

    const { isValid, error } = contactFormValidation(formValues);
    setFormErrors(error);
    if (!isValid) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    setIsSending(true);
    setStatusMsg(null);

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_email: formValues.email,
            subject: formValues.subject,
            message: formValues.message,
          },
          publicKey
        );
      }
      setStatusMsg("Message sent successfully!");
      setFormValues({ email: "", message: "", subject: "" });
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 30000);
    } catch (err) {
      console.error("Email send error:", err);
      setStatusMsg("Failed to send message. Please email directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSendEmail}
      className="rounded-xl border border-border bg-card p-6 shadow-xs"
    >
      <div className="mb-4 border-b border-border/70 pb-3">
        <h3 className="font-mono text-base font-bold text-primary">
          Send a Direct Message
        </h3>
        <p className="text-xs text-muted">
          Fill out the fields below and I&apos;ll get back to you promptly.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <FormInput
            type="email"
            label="Your Email"
            htmlFor="email"
            placeholder="name@example.com"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          {formErrors.email && (
            <p className="mt-1 text-xs text-rose-500 font-mono">
              {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <FormInput
            type="text"
            label="Subject"
            htmlFor="subject"
            placeholder="Project proposal, inquiry, or opportunity"
            value={formValues.subject}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, subject: e.target.value }))
            }
          />
          {formErrors.subject && (
            <p className="mt-1 text-xs text-rose-500 font-mono">
              {formErrors.subject}
            </p>
          )}
        </div>

        <div>
          <FormTextArea
            label="Message"
            htmlFor="message"
            placeholder="Tell me about what you are building..."
            value={formValues.message}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, message: e.target.value }))
            }
          />
          {formErrors.message && (
            <p className="mt-1 text-xs text-rose-500 font-mono">
              {formErrors.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          {statusMsg && (
            <span className="font-mono text-xs text-accent">
              {statusMsg}
            </span>
          )}
          <div className="ml-auto">
            <Button
              variant="primary"
              text={isSending ? "Sending..." : "Send Message"}
              icon="/svg/send-message.svg"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
