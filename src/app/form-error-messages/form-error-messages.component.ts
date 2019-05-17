import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Dictionary } from '../dictionary.interface';

@Component({
  selector: 'app-form-error-messages',
  templateUrl: './form-error-messages.component.html',
  styleUrls: ['./form-error-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorMessagesComponent {
  @Input() errors: Dictionary<object>;
}
