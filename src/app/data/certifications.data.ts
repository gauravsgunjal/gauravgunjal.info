import { Certification } from '../models/certification.model';

/**
 * TODO: No certifications were provided yet. Add your real certificates here —
 * each entry renders as a card with an image, credential ID, issue date, and
 * verification link. Delete this placeholder once real data is added.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'udemy-jsp',
    name: 'JSP, Servlets and JDBC for Beginners: Build a Database App',
    issuer: 'Udemy',
    issueDate: '2024-06-04',
    credentialId: 'UC-6642c77e-4f77-4f50-9fd0-49e607e7d2cb',
    verifyUrl: 'https://udemy.com/certificate/UC-6642c77e-4f77-4f50-9fd0-49e607e7d2cb/',
    image: 'assets/images/certifications/udemy-jsp.jpg'
  },
  {
    id: 'udemy-ChatGPT-Midjourney-DallE',
    name: 'ChatGPT, Midjourney, ChatGPT 4 & 5, & DallE The Al Bible',
    issuer: 'Udemy',
    issueDate: '2025-10-01',
    credentialId: 'UC-f48777db-fd37-4e78-bfbd-378c18e90bbe',
    verifyUrl: 'https://udemy.com/certificate/UC-f48777db-fd37-4e78-bfbd-378c18e90bbe/',
    image: 'assets/images/certifications/udemy-ChatGPT-Midjourney-DallE.jpg'
  }
];
