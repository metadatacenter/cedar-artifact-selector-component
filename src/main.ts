// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import {createApplication} from "@angular/platform-browser";
// import {createCustomElement} from "@angular/elements";
// import {AppComponent} from "./app/app.component";
//
// const ELEMENT_TAG = 'standalone-element';
//
// createApplication().then((appRef) => {
//   const elementCtor = createCustomElement(AppComponent, {
//     injector: appRef.injector,
//   });
//   if (!customElements.get(ELEMENT_TAG)) {
//     customElements.define(ELEMENT_TAG, elementCtor);
//     console.log(`custom tag ${ELEMENT_TAG} created`);
//   }
// })

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
