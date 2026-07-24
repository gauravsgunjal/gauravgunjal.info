// Development environment. Values here are safe placeholders — replace with your own
// EmailJS / Turnstile keys, or better, inject them at build time via CI secrets.
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  githubUsername: 'gauravsgunjal',
  emailjs: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID',
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY'
  },
  turnstile: {
    siteKey: 'YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY'
  }
};
