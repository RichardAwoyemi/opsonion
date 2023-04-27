export interface IUser {
  uid?: string;
  credits?: number;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  dobDay?: string;
  dobMonth?: string;
  dobYear?: string;
  postcode?: string;
  selectedCurrency?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  referralId?: string;
  referredBy?: string;
  password?: string;
}

export interface IUserLogin {
  email?: string;
  password?: string;
}
