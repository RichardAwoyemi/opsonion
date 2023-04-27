import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormUsernameInputService {
  usernameExists = new BehaviorSubject(<{ [key: string]: boolean }>{
    status: true,
  });
}
