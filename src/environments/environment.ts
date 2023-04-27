import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  domainUrl: 'https://opsonion.com',
  firebaseConfig: {
    apiKey: 'AIzaSyAq-YVZaMqmR8Scwkuhvoccr0mQC0JgV-4',
    authDomain: 'opsonion-dev.firebaseapp.com',
    databaseURL: 'https://opsonion-dev.firebaseio.com',
    projectId: 'opsonion-dev',
    storageBucket: 'opsonion-dev.appspot.com',
    messagingSenderId: '994826852330',
  },
  logging: {
    level: NgxLoggerLevel.DEBUG,
  },
  stripeKey: 'pk_test_ofSdYFbZUTS9ZMMrk8fZHwe800bq0UGijl',
  firebaseApiUrl: 'https://us-central1-opsonion-dev.cloudfunctions.net',
  unsplashAccessKey: 'b8f2ee0c596389fb783b1a677b01ab058f5e62bcd0ed676633290c0c1ac73bf4',
};
