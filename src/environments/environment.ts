// Development environment. Values here are safe placeholders — replace with your own
// EmailJS / Turnstile keys, or better, inject them at build time via CI secrets.
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  githubUsername: 'gauravsgunjal',
  emailjs: {
    serviceId: 'service_uoz8vdc',
    templateId: 'template_n32a89j',
    publicKey: '85-9TeECcHUKhWzVZ'
  },
  turnstile: {
    siteKey: 'YOUR_CLOUDFLARE_TURNSTILE_SITE_KEY'
  }
};
