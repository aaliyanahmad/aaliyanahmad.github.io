export type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

export const emailJsConfig: EmailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? "",
};

export function isEmailJsConfigured(config: EmailJsConfig = emailJsConfig) {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}
