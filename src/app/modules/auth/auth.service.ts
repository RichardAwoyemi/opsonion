import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from '../../shared/services/firebase.service';
import { UserService } from '../../shared/services/user.service';
import { UtilService } from '../../shared/services/util.service';
import firebase, { auth, User, UserInfo } from 'firebase/app';
import { IAuth } from '../../shared/models/auth';
import { WebsiteService } from '../../shared/services/website.service';
import { ToastrService } from 'ngx-toastr';
import { SimpleModalService } from '../../shared/components/simple-modal/simple-modal.service';
import { IUser } from '../../shared/models/user';
import { IWebsite } from '../../shared/models/website';
import UserCredential = firebase.auth.UserCredential;
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private websiteService: WebsiteService,
    private simpleModalService: SimpleModalService,
    private toastrService: ToastrService,
    private logger: NGXLogger
  ) {
    this.afAuth.authState.subscribe((result) => {
      if (result) {
        this.user = result;
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
      }
    });
  }

  static parseData(authData: IAuth): Partial<IAuth> {
    return {
      uid: authData.uid,
      email: authData.email,
      providerId: (authData as User).providerData[0].providerId,
      photoURL: authData.photoURL,
      emailVerified: authData.emailVerified,
    };
  }

  public isOwnedByUser(user: IUser, data: IWebsite): boolean {
    return user.uid === data.createdBy;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  facebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result) {
          const doc = await this.firebaseService.docExists(`/users/${result.user.uid}/`);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(
              user,
              result.additionalUserInfo.profile['first_name'],
              result.additionalUserInfo.profile['last_name']
            );
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  facebookSignInWithBuilder(website: IWebsite): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result) {
          const doc = await this.firebaseService.docExists(`/users/${result.user.uid}/`);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(
              user,
              result.additionalUserInfo.profile['first_name'],
              result.additionalUserInfo.profile['last_name']
            );
          }
          localStorage.setItem('builderTourComplete', 'true');
          this.websiteService.createWebsiteFromSource(result.user.uid, website);
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  facebookSignInWithReferral(referredByUser: IUser): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    let firstName = null,
      lastName = null;
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result) {
          firstName = result.additionalUserInfo.profile['first_name'];
          lastName = result.additionalUserInfo.profile['last_name'];
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewReferredUser(user, firstName, lastName, referredByUser);
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  mobileFacebookSignIn(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  mobileFacebookSignInWithReferral(referredByUser: IUser): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    localStorage.setItem('referredBy', JSON.stringify(referredByUser));
    return this.afAuth.signInWithRedirect(provider);
  }

  googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result) {
          if (!result.user.uid) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(
              user,
              result.additionalUserInfo.profile['given_name'],
              result.additionalUserInfo.profile['family_name']
            );
          } else {
            const doc = await this.firebaseService.docExists(`/users/${result.user.uid}/`);
            if (!doc) {
              const user: IUser = {
                uid: result.user.uid,
              };
              this.userService.processNewUser(
                user,
                result.additionalUserInfo.profile['given_name'],
                result.additionalUserInfo.profile['family_name']
              );
            }
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  googleSignInWithBuilder(website: IWebsite): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        if (result) {
          if (!result.user.uid) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(
              user,
              result.additionalUserInfo.profile['given_name'],
              result.additionalUserInfo.profile['family_name']
            );
          } else {
            const path = `/users/${result.user.uid}/`;
            const doc = await this.firebaseService.docExists(path);
            if (!doc) {
              const user: IUser = {
                uid: result.user.uid,
              };
              this.userService.processNewUser(
                user,
                result.additionalUserInfo.profile['given_name'],
                result.additionalUserInfo.profile['family_name']
              );
            }
          }
          localStorage.setItem('builderTourComplete', 'true');
          this.websiteService.createWebsiteFromSource(result.user.uid, website);
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  googleSignInWithReferral(referredByUser: IUser): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth
      .signInWithPopup(provider)
      .then(async (result) => {
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          const user: IUser = {
            uid: result.user.uid,
          };
          this.userService.processNewReferredUser(
            user,
            result.additionalUserInfo.profile['given_name'],
            result.additionalUserInfo.profile['family_name'],
            referredByUser
          );
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  mobileGoogleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  mobileGoogleSignInWithReferral(referredByUser: IUser): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    localStorage.setItem('referredBy', JSON.stringify(referredByUser));
    return this.afAuth.signInWithRedirect(provider);
  }

  register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result) {
          const path = `/users/${result.user.uid}/`;
          firstName = UtilService.toTitleCase(firstName);
          lastName = UtilService.toTitleCase(lastName);
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(user, firstName, lastName);
            this.sendVerificationMail().then(() => {});
            this.toastrService.success('Your registration was successful.', 'Great!');
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  registerWithBuilder(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    website: IWebsite
  ): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result) {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewUser(
              user,
              UtilService.toTitleCase(firstName),
              UtilService.toTitleCase(lastName)
            );
            this.sendVerificationMail().then(() => {});
            localStorage.setItem('builderTourComplete', 'true');
            this.websiteService.createWebsiteFromSource(result.user.uid, website);
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  registerWithReferral(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    referredByUser: IUser
  ): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result) {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            const user: IUser = {
              uid: result.user.uid,
            };
            this.userService.processNewReferredUser(
              user,
              UtilService.toTitleCase(firstName),
              UtilService.toTitleCase(lastName),
              referredByUser
            );
            this.sendVerificationMail().then(() => {});
            this.toastrService.success('Your registration was successful.', 'Great!');
          }
        }
      })
      .catch((error) => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
        this.logger.debug(error.message);
      });
  }

  signIn(email: string, password: string): Promise<void> {
    return new Promise<UserCredential>((resolve, reject) =>
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      )
    ).then(() => {});
  }

  async mobileLogin(result: IUser, uid: string): Promise<void> {
    const path = `/users/${uid}`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const userData: IUser = {
        uid: uid,
        firstName: result['firstName'],
        lastName: result['lastName'],
        email: result['email'],
        displayName: result['displayName'],
        photoURL: result['photoURL'],
        emailVerified: true,
      };
      this.userService.processNewUser(userData, result['firstName'], result['lastName']);
    }
  }

  async mobileReferralLogin(result: IUser, uid: string, referredByUser: IUser): Promise<void> {
    const path = `/users/${uid}`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const user: IUser = {
        uid: uid,
        firstName: result['firstName'],
        lastName: result['lastName'],
        email: result['email'],
        displayName: result['displayName'],
        photoURL: result['photoURL'],
        emailVerified: true,
      };
      this.userService.processNewReferredUser(
        user,
        result['firstName'],
        result['lastName'],
        referredByUser
      );
    }
  }

  sendVerificationMail(): Promise<void> {
    return this.afAuth.currentUser.then((user) =>
      user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      })
    );
  }

  async checkAccountType(): Promise<UserInfo[]> {
    return this.afAuth.currentUser.then((user) => user.providerData);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.simpleModalService.displayMessage(
          'Check your email',
          'We have sent you an email with ' +
            'instructions on how to reset your password. If you do not receive this email within a few minutes, then please ' +
            'also check your junk or spam folder.'
        );
      })
      .catch(() => {
        this.simpleModalService.displayMessage(
          'Oops!',
          'Something has gone wrong. Please try again.'
        );
      });
  }

  signOut(): void {
    localStorage.removeItem('uid');
    this.afAuth.signOut().then(() => {
      window.location.reload();
    });
  }
}
