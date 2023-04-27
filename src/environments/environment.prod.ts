import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  domainUrl: 'https://opsonion.com',
  firebaseConfig: {
    apiKey: 'AIzaSyC1_kUGqJtNyOnvRcXxTrBcHb_3YdRr1bk',
    authDomain: 'opsonion-live.firebaseapp.com',
    databaseURL: 'https://opsonion-live.firebaseio.com',
    projectId: 'opsonion-live',
    storageBucket: 'opsonion-live.appspot.com',
    messagingSenderId: '202919224596',
  },
  logging: {
    level: NgxLoggerLevel.INFO,
  },
  unsplashAccessKey: 'b8f2ee0c596389fb783b1a677b01ab058f5e62bcd0ed676633290c0c1ac73bf4',
};
