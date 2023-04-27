import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase';

@Injectable()
export class ExceptionService {
  isInsufficientPermissionError(error: FirebaseError): boolean {
    if (error.code === 'permission-denied') {
      return true;
    }
  }
}
