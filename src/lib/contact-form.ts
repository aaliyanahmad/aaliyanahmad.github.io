export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 120 },
  message: { min: 20, max: 4_000 },
} as const;

export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  contact_url: string;
};

export type ContactFieldName = keyof ContactFormValues;
export type ContactFormErrors = Partial<Record<ContactFieldName, string>>;

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  contact_url: "",
};

export function sanitizeContactForm(values: ContactFormValues) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as ContactFormValues;
}

export function validateContactForm(
  values: ContactFormValues,
  allowedServices: readonly string[],
  allowedBudgets: readonly string[],
) {
  const errors: ContactFormErrors = {};
  const clean = sanitizeContactForm(values);

  if (
    clean.name.length < contactLimits.name.min ||
    clean.name.length > contactLimits.name.max
  ) {
    errors.name = "Please enter your name.";
  }

  if (
    clean.email.length > contactLimits.email.max ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (clean.company.length > contactLimits.company.max) {
    errors.company = `Keep the company name under ${contactLimits.company.max} characters.`;
  }

  if (!allowedServices.includes(clean.service)) {
    errors.service = "Choose the service you’re interested in.";
  }

  if (clean.budget && !allowedBudgets.includes(clean.budget)) {
    errors.budget = "Choose one of the available budget ranges.";
  }

  if (
    clean.message.length < contactLimits.message.min ||
    clean.message.length > contactLimits.message.max
  ) {
    errors.message = "Tell me a little more about the project.";
  }

  return { clean, errors };
}
