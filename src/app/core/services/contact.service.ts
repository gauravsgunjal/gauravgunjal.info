import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

/**
 * Sends contact-form submissions directly from the browser via EmailJS —
 * no backend required. Configure your service/template/public key in
 * src/environments/environment.ts (and environment.prod.ts for the deployed
 * build). See README "Contact Form Setup" for the EmailJS dashboard steps.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(payload: ContactFormPayload): Promise<void> {
    const { serviceId, templateId, publicKey } = environment.emailjs;

    if (serviceId.startsWith('YOUR_') || templateId.startsWith('YOUR_') || publicKey.startsWith('YOUR_')) {
      throw new Error(
        'EmailJS is not configured yet. Add your serviceId/templateId/publicKey to environment.ts.'
      );
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: payload.name,
        from_email: payload.email,
        phone: payload.phone ?? 'Not provided',
        subject: payload.subject,
        message: payload.message,
        'g-recaptcha-response': payload.turnstileToken
      },
      { publicKey }
    );
  }
}
