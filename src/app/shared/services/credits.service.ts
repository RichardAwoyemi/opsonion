import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

@Injectable()
export class CreditsService {
  constructor(private afs: AngularFirestore, public logger: NGXLogger, public router: Router) {}

  incrementCredit(id: string, value: number): Promise<void> {
    const documentPath = `users/${id}`;
    const documentRef: AngularFirestoreDocument<{
      [key: string]: FieldValue;
    }> = this.afs.doc(documentPath);
    const increment = firestore.FieldValue.increment(value);
    return documentRef.set(
      { credits: increment },
      {
        merge: true,
      }
    );
  }

  // noinspection JSUnusedGlobalSymbols
  decrementCredit(id: number, value: number): void {
    const documentPath = `credits/${id}`;
    const documentRef: AngularFirestoreDocument<{
      [key: string]: FieldValue;
    }> = this.afs.doc(documentPath);
    const decrement = firestore.FieldValue.increment(value * -1);
    documentRef.update({ credit: decrement });
  }
}
