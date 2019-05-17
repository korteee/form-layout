import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';
import { FormErrorMessagesComponent } from './form-error-messages/form-error-messages.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { SubmittedClassDirective } from './submitted-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormLayoutComponent,
    FormFieldComponent,
    FormErrorMessagesComponent,
    FormButtonsComponent,
    SubmittedClassDirective
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
