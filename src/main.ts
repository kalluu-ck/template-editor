import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Quill from 'quill';
import { FullNameBlot } from './template-editors/custom-blots/tag-fullname';
import { DateBlot } from './template-editors/custom-blots/tag-date';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

Quill.register({ 'formats/fullname': FullNameBlot }, true);
Quill.register({ 'formats/date': DateBlot }, true);
