import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ArtifactSelectorComponent } from "./components/artifact-selector/artifact-selector.component";
import { ArtifactDetailsComponent } from './components/artifact-details/artifact-details.component';
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import {createCustomElement} from "@angular/elements";
import {MatButton, MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    ArtifactSelectorComponent,
    ArtifactDetailsComponent
  ],
  imports: [
    BrowserModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  // bootstrap: [ArtifactSelectorComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const element = createCustomElement(ArtifactSelectorComponent, {injector});
    customElements.define('artifact-selector', element);
  }
  ngDoBootstrap() {}
}
