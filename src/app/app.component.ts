import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      firstName: fb.control('', [Validators.required, Validators.minLength(6)]),
      lastName: fb.control('', [Validators.required, Validators.minLength(6)]),
      mobilePhone: fb.control('', [Validators.minLength(10)])
    });
  }

  showForm() {
    console.log({ form: this.myForm });
  }

  clearForm() {
    this.myForm.reset();
  }
}
