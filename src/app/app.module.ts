import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SquareElementItemComponent} from "./components/square-element-item/square-element-item.component";
import {SquareElementsComponent} from "./components/square-elements/square-elements.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule} from "@angular/forms";
import {CubeComponent} from "./components/cube/cube.component";

@NgModule({
  declarations: [
    AppComponent,
    SquareElementItemComponent,
    SquareElementsComponent,
    CubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
