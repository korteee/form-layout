import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appSubmittedClass]'
})
export class SubmittedClassDirective implements OnChanges, OnDestroy {
  @Input() appSubmittedClass: string;

  @Input() formGroup: FormGroup;

  private destroy$ = new Subject();

  private defaultClassName = 'submitted';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formGroup && changes.formGroup.currentValue) {
      this.addClassOnSubmission();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private addClassOnSubmission() {
    /**Remove any previous subscriptions */
    this.destroy$.next();

    fromEvent(this.formElement, 'submit')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.formElement.classList.add(this.appSubmittedClass || this.defaultClassName);

        /**Remove subscription once class is added */
        this.destroy$.next();
      });
  }

  private get formElement(): HTMLFormElement {
    return this.el.nativeElement;
  }
}
