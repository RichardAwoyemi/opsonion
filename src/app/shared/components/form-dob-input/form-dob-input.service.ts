import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormDobInputService {
  showDobMonthInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
  showDobDayInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
  showDobYearInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
}
