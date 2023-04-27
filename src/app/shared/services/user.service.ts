import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreditsService } from './credits.service';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
  username = new BehaviorSubject(<string>null);
  uid = new BehaviorSubject(<string>null);
  firstName = new BehaviorSubject(<string>null);
  lastName = new BehaviorSubject(<string>null);
  streetAddress1 = new BehaviorSubject(<string>null);
  streetAddress2 = new BehaviorSubject(<string>null);
  city = new BehaviorSubject(<string>null);
  postcode = new BehaviorSubject(<string>null);
  dobDay = new BehaviorSubject(<string>null);
  dobMonth = new BehaviorSubject(<string>null);
  dobYear = new BehaviorSubject(<string>null);

  constructor(private afs: AngularFirestore, private creditService: CreditsService) {}

  static parseData(user: IUser): IUser {
    return {
      uid: user.uid,
      credits: user.credits,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      dobDay: user.dobDay,
      dobMonth: user.dobMonth,
      dobYear: user.dobYear,
      postcode: user.postcode,
      selectedCurrency: user.selectedCurrency,
      streetAddress1: user.streetAddress1,
      streetAddress2: user.streetAddress2,
      city: user.city,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      referralId: user.referralId,
      referredBy: user.referredBy,
    };
  }

  getUserById(id: string): Observable<IUser> {
    return this.afs
      .collection('users')
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          const data = action.payload.data();
          const uid = action.payload.id;
          return { uid, ...(<IUser>data) };
        })
      );
  }

  setUserData(user: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: true,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  setUserDetailData(
    uid: string,
    firstName: string,
    lastName: string,
    referralId: string
  ): Promise<void> {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${uid}`);
    let userDetailData;
    if (firstName && lastName) {
      userDetailData = {
        displayName: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        referralId: referralId,
      };
    } else {
      userDetailData = {
        referralId: referralId,
      };
    }
    return userRef.set(userDetailData, {
      merge: true,
    });
  }

  getUserByUsername(username: string): Observable<IUser[]> {
    if (username) {
      return this.afs
        .collection('users', (ref) => ref.where('username', '==', username).limit(1))
        .valueChanges();
    }
  }

  getUserByReferralId(referralId: string): Observable<IUser[]> {
    if (referralId) {
      return this.afs
        .collection('users', (ref) => ref.where('referralId', '==', referralId).limit(1))
        .valueChanges();
    }
  }

  setUserPhoto(uid: string, photoURL: string): Promise<void> {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${uid}`);
    const userPhotoData = {
      photoURL: photoURL,
    };
    return userRef.set(userPhotoData, {
      merge: true,
    });
  }

  setUserPersonalDetails(
    uid: string,
    username: string,
    firstName: string,
    lastName: string,
    dobDay: string,
    dobMonth: string,
    dobYear: string,
    streetAddress1: string,
    streetAddress2: string,
    city: string,
    postcode: string
  ): Promise<void> {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`,
      dobDay: dobDay,
      dobMonth: dobMonth,
      dobYear: dobYear,
      streetAddress1: streetAddress1,
      streetAddress2: streetAddress2,
      city: city,
      postcode: postcode,
    };
    return userRef.set(userDetailData, {
      merge: true,
    });
  }

  setUserReferralData(
    uid: string,
    firstName: string,
    lastName: string,
    referralId: string,
    referredBy: string
  ): Promise<void> {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      firstName: firstName,
      lastName: lastName,
      referralId: referralId,
      referredBy: referredBy,
    };
    return userRef.set(userDetailData, {
      merge: true,
    });
  }

  processNewUser(result: IUser, firstName: string, lastName: string): void {
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result).then(() => {});
    this.setUserDetailData(result.uid, firstName, lastName, referralId).then(() => {});
  }

  processNewReferredUser(
    result: IUser,
    firstName: string,
    lastName: string,
    referredByUser: IUser
  ): void {
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result).then(() => {});
    this.setUserReferralData(
      result.uid,
      firstName,
      lastName,
      referralId,
      referredByUser.uid
    ).then(() => {});
    this.creditService.incrementCredit(referredByUser.uid, 1).then(() => {});
    this.creditService.incrementCredit(result.uid, 1).then(() => {});
  }
}
