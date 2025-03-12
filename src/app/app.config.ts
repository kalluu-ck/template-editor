import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { QuillModule } from 'ngx-quill';
import Counter from '../template-editors/counter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      QuillModule.forRoot({
        customModules: [
          {
            implementation: Counter,
            path: 'modules/counter',
          },
        ],
        customOptions: [
          {
            import: 'formats/font',
            whitelist: [
              'mirza',
              'roboto',
              'aref',
              'serif',
              'sansserif',
              'monospace',
            ],
          },
        ],
      })
    ),
  ],
};
