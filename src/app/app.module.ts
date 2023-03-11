import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BooksComponent} from './books/books.component';
import {BooksService} from "./books/books.service";
import {SortBooksPipe} from './books/sort-books.pipe';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    SortBooksPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [BooksService, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
