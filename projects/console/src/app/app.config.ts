import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { definePreset } from '@primeng/themes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    },
    surface: {
      0: '#ffffff',
      50: '{soho.50}',
      100: '{soho.100}',
      200: '{soho.200}',
      300: '{soho.300}',
      400: '{soho.400}',
      500: '{soho.500}',
      600: '{soho.600}',
      700: '{soho.700}',
      800: '{soho.800}',
      900: '{soho.900}',
      950: '{soho.950}'
    },
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({
      projectId: "botnimconsole",
      appId: "1:328457980432:web:4c27e2f52305381c39d895",
      storageBucket: "botnimconsole.firebasestorage.app",
      apiKey: "AIzaSyBu_7qyKPiOU4dZCEJvAxewv3dooUke7jM",
      authDomain: "botnimconsole.firebaseapp.com", 
      messagingSenderId: "328457980432",
      measurementId: "G-L41JZM058W"
    })),
    provideAuth(() => getAuth(getApp())),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: MyPreset,
        }
    }), provideClientHydration(withEventReplay()),
  ]
};

