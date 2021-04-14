/**
 * Created by MEC
 * Directive for which only accept number in input text box
 */
import {Directive, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[allowOnlyNumber]',
})
export class AllowNumberOnlyDirective implements OnInit, OnDestroy {

  changeDetectorSubject = new BehaviorSubject(null);
  changeDetectorSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.changeDetectorSubscription = this.changeDetectorSubject
      .subscribe(event => {
        if (event) {
          this.checkOnlyNumberPress(event['$event']);
        }
      });
  }

  checkOnlyNumberPress(event) {
    if (event.code === 'Backspace' || event.code === 'ArrowRight' || event.code === 'ArrowLeft' ||
      event.code === 'Tab' ||
      event.code === 'Numpad0' ||
      event.code === 'Numpad1' ||
      event.code === 'Numpad2' ||
      event.code === 'Numpad3' ||
      event.code === 'Numpad4' ||
      event.code === 'Numpad5' ||
      event.code === 'Numpad6' ||
      event.code === 'Numpad7' ||
      event.code === 'Numpad8' ||
      event.code === 'Numpad9') {
      return true;
    }
    const regex = new RegExp('^[0-9]+$');
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown($event) {
    this.changeDetectorSubject.next({event: 'keydown', $event});
  }

  ngOnDestroy(): void {
    if (this.changeDetectorSubscription) {
      this.changeDetectorSubscription.unsubscribe();
    }
  }
}
