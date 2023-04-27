# Opsonion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Firebase
1. Ensure that your config matches that in your firebase settings. Go to: 
```
<FIREBASE_PORJECT> --> Settings Cog --> Project Settings
```

Scroll down to the "Your apps" section and copy these settinges to your local environment.ts file at:
```
src/environments/environment.ts
```

2. Build the project:
```
npm install
```

3. First off, make sure you have the latest Firebase CLI tools:
```
npm install -g firebase-tools
```

4. Next, authenticate the Firebase CLI with an existing user (You will be auto-redirected):
```
firebase login
```

5. Ensure you are in the correct folder for firebase `src/app` and then use the desired firebase project:
```
firebase use <PROJECT_NAME>
```

### Publish Stipe API KEY

To be able to use Firebase as the server side engine for payment, we must configure it with the API KEY via the Firebase CLI:
```
firebase functions:config:set stripe.token=<YOUR STRIPE API KEY>
```

### Deploying functions

To deploy or update a function, run:
```
firebase deploy --only functions 
```

### Deleting all users from Firebase authentication console

Browse to the Firebase authentication console page, and then run the following in Developer Tools, on the Console tab. 

```js
var intervalId;

var clearFunction = function() {
  if ($('[aria-label="Delete account"]').size() == 0) {
    console.log("interval cleared")
    clearInterval(intervalId)
    return
  }
  $('[aria-label="Delete account"]')[0].click();
  setTimeout(function () {
     $(".md-raised:contains(Delete)").click()
  }, 1000);
};

intervalId = setInterval(clearFunction, 3000)
```
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
