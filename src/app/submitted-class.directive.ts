import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, filter, subscribeOn } from 'rxjs/operators';

@Directive({
  selector: '[appSubmittedClass]'
})
export class SubmittedClassDirective implements OnChanges, OnDestroy {
  @Input() appSubmittedClass: string;

  @Input() formGroup: FormGroup;

  private removeClassDestroy$ = new Subject();

  private addClassDestroy$ = new Subject();

  private defaultClassName = 'submitted';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formGroup && changes.formGroup.currentValue) {
      this.addClassOnSubmission();
      this.removeClassOnClear();
    }
  }

  ngOnDestroy() {
    [this.addClassDestroy$, this.removeClassDestroy$].forEach(subscription => {
      subscription.next();
      subscription.complete();
    });
  }

  private addClassOnSubmission() {
    /**Remove any previous subscriptions */
    this.addClassDestroy$.next();

    fromEvent(this.formElement, 'submit')
      .pipe(takeUntil(this.addClassDestroy$))
      .subscribe(() => {
        this.formElement.classList.add(this.submittedClass);
        this.removeClassOnClear();
        this.addClassDestroy$.next();
      });
  }

  private removeClassOnClear() {
    this.formGroup.valueChanges
      .pipe(
        filter(newVal => !Object.values(newVal).find(value => value !== null)),
        takeUntil(this.removeClassDestroy$)
      )
      .subscribe(() => {
        this.formElement.classList.remove(this.submittedClass);
        this.removeClassDestroy$.next();
        this.addClassOnSubmission();
      });
  }

  private get formElement(): HTMLFormElement {
    return this.el.nativeElement;
  }

  private get submittedClass(): string {
    return this.appSubmittedClass || this.defaultClassName;
  }
}
