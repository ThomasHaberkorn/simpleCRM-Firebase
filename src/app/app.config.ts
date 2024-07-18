import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { provideStorage, getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simplefiredb","appId":"1:524080001728:web:c3b8ced43ae15da981f325","storageBucket":"simplefiredb.appspot.com","apiKey":"AIzaSyAavPnsqSvnEs7akfpyOQIeljrF-wRimlc","authDomain":"simplefiredb.firebaseapp.com","messagingSenderId":"524080001728"}))), 
  importProvidersFrom(provideFirestore(() => getFirestore()))]
};
// const app = initializeApp(firebaseConfig);