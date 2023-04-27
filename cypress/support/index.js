// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@rckeller/cypress-unfetch';
import '@rckeller/cypress-unfetch/await';
import 'cypress-pipe';
import './commands';
import './builder/builder-showcase/builder-showcase-toolbar.commands';
import './builder/builder-sidebar/builder-sidebar.commands';
import './builder/builder-toolbar/builder-orientation-toolbar.commands';
import './builder/builder-toolbar/builder-toolbar.commands';
import './dashboard/dashboard.commands';

import chaiColors from 'chai-colors';
chai.use(chaiColors);
