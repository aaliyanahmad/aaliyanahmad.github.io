"use client";

import emailjs from "@emailjs/browser";
import { useSearchParams } from "next/navigation";
import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { budgetOptions } from "@/data/contact";
import { getOrderedServices } from "@/data/services";
import {
  contactLimits,
  emptyContactForm,
  validateContactForm,
  type ContactFieldName,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contact-form";
import { emailJsConfig, isEmailJsConfigured } from "@/lib/emailjs";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  email: string;
  emailHref: `mailto:${string}`;
};

type ContactFormFieldsProps = ContactFormProps & {
  initialService: string;
};

const services = getOrderedServices();
const serviceNames = ["Not sure yet", ...services.map((service) => service.title)];

function formatSubmissionTime() {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function FieldError({ error, id }: { error?: string; id: string }) {
  return error ? (
    <p className="field-error mt-2 text-sm leading-5 text-[#d9947d]" id={id}>
      {error}
    </p>
  ) : null;
}

function ContactFormFields({
  email,
  emailHref,
  initialService,
}: ContactFormFieldsProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const submissionLockRef = useRef(false);
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...emptyContactForm,
    service: initialService,
  }));
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const configured = isEmailJsConfigured();

  const setField = (field: ContactFieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");

    if (touched[field]) {
      const nextValues = { ...values, [field]: value };
      const validation = validateContactForm(
        nextValues,
        serviceNames,
        budgetOptions,
      );
      setErrors((current) => ({
        ...current,
        [field]: validation.errors[field],
      }));
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setField(event.target.name as ContactFieldName, event.target.value);
  };

  const handleBlur = (field: ContactFieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    const validation = validateContactForm(values, serviceNames, budgetOptions);
    setErrors((current) => ({
      ...current,
      [field]: validation.errors[field],
    }));
  };

  const focusFirstError = (formErrors: ContactFormErrors) => {
    const firstField = Object.keys(formErrors)[0] as ContactFieldName | undefined;
    if (!firstField) return;

    requestAnimationFrame(() => {
      const control = formRef.current?.elements.namedItem(firstField);
      if (control instanceof HTMLElement) control.focus();
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionLockRef.current || status === "submitting") return;

    if (values.contact_url.trim()) {
      setValues(emptyContactForm);
      setStatus("success");
      submissionLockRef.current = true;
      return;
    }

    const validation = validateContactForm(values, serviceNames, budgetOptions);
    const allTouched = Object.fromEntries(
      Object.keys(values).map((field) => [field, true]),
    ) as Partial<Record<ContactFieldName, boolean>>;

    setTouched(allTouched);
    setErrors(validation.errors);

    if (Object.keys(validation.errors).length > 0) {
      focusFirstError(validation.errors);
      return;
    }

    if (!configured || !formRef.current) return;

    submissionLockRef.current = true;
    setStatus("submitting");
    setValues(validation.clean);
    if (timeInputRef.current) {
      timeInputRef.current.value = formatSubmissionTime();
    }

    for (const [field, value] of Object.entries(validation.clean)) {
      const control = formRef.current.elements.namedItem(field);
      if (control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement) {
        control.value = value;
      }
    }

    try {
      await emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        formRef.current,
        {
          publicKey: emailJsConfig.publicKey,
          blockHeadless: true,
          limitRate: {
            id: "portfolio-contact",
            throttle: 15_000,
          },
        },
      );

      setValues(emptyContactForm);
      setErrors({});
      setTouched({});
      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Contact inquiry submission failed.", error);
      submissionLockRef.current = false;
      setStatus("error");
    }
  };

  const resetForm = () => {
    submissionLockRef.current = false;
    setValues(emptyContactForm);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        className="form-status flex min-h-[34rem] flex-col justify-center border-y border-[var(--line)] py-12"
        role="status"
      >
        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-copper">
          Inquiry sent
        </p>
        <h3 className="mt-6 max-w-xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.92] tracking-[-0.055em] text-bone">
          Thank you for the context.
        </h3>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          I’ll get back to you as soon as I can.
        </p>
        <Button className="mt-9 self-stretch sm:self-start" onClick={resetForm} variant="secondary">
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit} ref={formRef}>
      <div className="flex items-center justify-between gap-5 border-y border-[var(--line)] py-5 text-[0.58rem] uppercase tracking-[0.18em] text-muted-dark">
        <span>Project inquiry</span>
        <span>Required fields marked *</span>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="contact-field border-b border-[var(--line)] py-7 md:pr-6">
          <label className="contact-label" htmlFor="name">
            <span>01</span> Your name *
          </label>
          <input
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            className="contact-control"
            id="name"
            maxLength={contactLimits.name.max}
            minLength={contactLimits.name.min}
            name="name"
            onBlur={() => handleBlur("name")}
            onChange={handleChange}
            placeholder="Your name"
            required
            type="text"
            value={values.name}
          />
          <FieldError error={errors.name} id="name-error" />
        </div>

        <div className="contact-field border-b border-[var(--line)] py-7 md:border-l md:pl-6">
          <label className="contact-label" htmlFor="email">
            <span>02</span> Email address *
          </label>
          <input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className="contact-control"
            id="email"
            inputMode="email"
            maxLength={contactLimits.email.max}
            name="email"
            onBlur={() => handleBlur("email")}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            type="email"
            value={values.email}
          />
          <FieldError error={errors.email} id="email-error" />
        </div>

        <div className="contact-field border-b border-[var(--line)] py-7 md:pr-6">
          <label className="contact-label" htmlFor="company">
            <span>03</span> Company / organization
          </label>
          <input
            aria-describedby={errors.company ? "company-error" : undefined}
            aria-invalid={Boolean(errors.company)}
            autoComplete="organization"
            className="contact-control"
            id="company"
            maxLength={contactLimits.company.max}
            name="company"
            onBlur={() => handleBlur("company")}
            onChange={handleChange}
            placeholder="Company, startup or personal project"
            type="text"
            value={values.company}
          />
          <FieldError error={errors.company} id="company-error" />
        </div>

        <div className="contact-field border-b border-[var(--line)] py-7 md:border-l md:pl-6">
          <label className="contact-label" htmlFor="service">
            <span>04</span> What can I help with? *
          </label>
          <div className="relative">
            <select
              aria-describedby={errors.service ? "service-error" : undefined}
              aria-invalid={Boolean(errors.service)}
              className="contact-control contact-select pr-10"
              id="service"
              name="service"
              onBlur={() => handleBlur("service")}
              onChange={handleChange}
              required
              value={values.service}
            >
              <option disabled value="">Choose a service</option>
              {serviceNames.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-1 bottom-4 text-copper">
              ↓
            </span>
          </div>
          <FieldError error={errors.service} id="service-error" />
        </div>
      </div>

      <div className="contact-field border-b border-[var(--line)] py-7">
        <label className="contact-label" htmlFor="budget">
          <span>05</span> Approximate budget
        </label>
        <div className="relative">
          <select
            aria-describedby={errors.budget ? "budget-error" : undefined}
            aria-invalid={Boolean(errors.budget)}
            className="contact-control contact-select pr-10"
            id="budget"
            name="budget"
            onBlur={() => handleBlur("budget")}
            onChange={handleChange}
            value={values.budget}
          >
            <option value="">Choose a range (optional)</option>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-1 bottom-4 text-copper">
            ↓
          </span>
        </div>
        <FieldError error={errors.budget} id="budget-error" />
      </div>

      <div className="contact-field border-b border-[var(--line)] py-7">
        <div className="flex items-baseline justify-between gap-5">
          <label className="contact-label" htmlFor="message">
            <span>06</span> Tell me about the project *
          </label>
          <span className="text-[0.58rem] tabular-nums tracking-[0.12em] text-muted-dark">
            {values.message.length} / {contactLimits.message.max}
          </span>
        </div>
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className="contact-control min-h-48 resize-y leading-7"
          id="message"
          maxLength={contactLimits.message.max}
          minLength={contactLimits.message.min}
          name="message"
          onBlur={() => handleBlur("message")}
          onChange={handleChange}
          placeholder="What are you building, what do you need help with, and what would success look like?"
          required
          value={values.message}
        />
        <FieldError error={errors.message} id="message-error" />
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact_url">Leave this field empty</label>
        <input
          autoComplete="off"
          id="contact_url"
          name="contact_url"
          onChange={handleChange}
          tabIndex={-1}
          type="text"
          value={values.contact_url}
        />
      </div>

      <input defaultValue="" name="time" ref={timeInputRef} type="hidden" />

      <div aria-atomic="true" aria-live="polite" className="pt-7">
        {!configured ? (
          <p className="form-status mb-6 border-l border-copper pl-5 text-sm leading-6 text-muted">
            The inquiry form is currently unavailable. Please email me directly at{" "}
            <a className="break-all text-bone underline decoration-[var(--line-strong)] underline-offset-4" href={emailHref}>
              {email}
            </a>
            .
          </p>
        ) : null}

        {status === "error" ? (
          <p className="form-status mb-6 border-l border-[#d9947d] pl-5 text-sm leading-6 text-bone-soft" role="alert">
            Something went wrong while sending your inquiry. Please try again, or{" "}
            <a className="break-all underline decoration-[var(--line-strong)] underline-offset-4" href={emailHref}>
              email me directly
            </a>
            .
          </p>
        ) : null}

        <div className="flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:items-center">
          <Button
            className="w-full disabled:cursor-not-allowed disabled:opacity-45 disabled:transform-none sm:w-auto"
            disabled={!configured || status === "submitting"}
            type="submit"
          >
            {status === "submitting" ? "Sending…" : "Send Inquiry"}
          </Button>
          <p className="max-w-xs text-xs leading-5 text-muted-dark sm:text-right">
            Your details are used only to respond to this inquiry.
          </p>
        </div>
      </div>
    </form>
  );
}

export function ContactForm(props: ContactFormProps) {
  const searchParams = useSearchParams();
  const serviceFromQuery = searchParams.get("service");
  const preselectedService = services.find(
    (service) => service.slug === serviceFromQuery,
  );

  return (
    <ContactFormFields
      {...props}
      initialService={preselectedService?.title ?? ""}
      key={preselectedService?.slug ?? "no-service"}
    />
  );
}
