import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormNameInputService {
  showFirstNameInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
  showLastNameInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });

  checkFirstNameInput(firstName: string): void {
    this.showFirstNameInputError.next({ status: !firstName });
  }

  checkLastNameInput(lastName: string): void {
    this.showLastNameInputError.next({ status: !lastName });
  }
}
