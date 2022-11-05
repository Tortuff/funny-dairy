import { Component } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: APP_BASE_HREF, useValue: location.pathname }],
})
export class AppComponent {
  constructor() {
    console.log('[LOCATION] ==> ', location.pathname);
  }
}
