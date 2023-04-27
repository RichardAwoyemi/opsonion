import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public afs: AngularFirestore, public logger: NGXLogger) {}

  async docExists(path: string): Promise<unknown> {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }
}
