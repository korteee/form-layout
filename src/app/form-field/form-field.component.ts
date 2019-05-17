import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Dictionary } from '../dictionary.interface';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnInit {
  @Input() label: string;

  @Input() errors: Dictionary<object>;

  @Input() set horizontal(_) {
    this.isHorizontal = true;
  }

  @Input() set vertical(_) {
    this.isHorizontal = false;
  }

  isHorizontal: boolean;

  constructor() {}

  ngOnInit() {}
}
