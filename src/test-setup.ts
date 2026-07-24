// Runs once before the Vitest suite. Patches zone.js for the jsdom
// environment and boots the Angular TestBed, mirroring what the Angular
// CLI's Karma builder used to do via polyfills + test.ts.
import '@analogjs/vitest-angular/setup-zone';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true
});
