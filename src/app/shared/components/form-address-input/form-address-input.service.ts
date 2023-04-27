import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormAddressInputService {
  showStreetAddressInputError = new BehaviorSubject(<{ [key: string]: boolean }>{ status: true });
  showCityInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
  showPostcodeInputError = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
}
