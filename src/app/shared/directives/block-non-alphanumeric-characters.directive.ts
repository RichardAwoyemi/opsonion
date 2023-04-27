import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[blockNonAlphanumericCharacters]',
})
export class BlockNonAlphanumericCharactersDirective {
  @Input() isAlphaNumeric: boolean;

  regexStr = '^[a-zA-Z0-9_-]*$';

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent): boolean {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent): void {
    this.validateFields(event);
  }

  validateFields(event: KeyboardEvent): void {
    setTimeout(() => {
      if (this.el.nativeElement) {
        this.el.nativeElement.value = this.el.nativeElement.value
          .replace(/[^A-Za-z ]/g, '')
          .replace(/\s/g, '');
      }
      event.preventDefault();
    }, 100);
  }
}
