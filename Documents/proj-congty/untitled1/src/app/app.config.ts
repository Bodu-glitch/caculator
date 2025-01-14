import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:80', options: {} };

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(SocketIoModule.forRoot(config))],
};
