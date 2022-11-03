import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from '@public/public.module';
import { PrivateModule } from '@private/private.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PublicModule, PrivateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
