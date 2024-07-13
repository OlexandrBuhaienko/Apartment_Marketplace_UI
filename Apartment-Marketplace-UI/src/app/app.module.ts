import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApartmentMarketplaceModule } from './features/apartment/modules/apartment-marketplace.module';
import { ApartmentService } from './features/apartment/services/apartment.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApartmentMarketplaceModule,
    FormsModule,
    HttpClientModule
],
  providers: [
    provideAnimationsAsync(),
    ApartmentService
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
