import { LoginButtonGroupComponent } from './login-button-group.component';
import { FormsModule } from '@angular/forms';
import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStore } from '../../../core/core.spec';
import { State } from '../../../core/store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import 'rxjs-compat/add/observable/of';

describe('LoginButtonGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      providers: [{ provide: Store, useClass: TestStore }],
      declarations: [LoginButtonGroupComponent],
    })
      .compileComponents()
      .then(() => {});
  }));
  describe(':', () => {
    let fixture, component;
    let store: TestStore<State>;

    beforeEach(inject([Store], async (testStore: TestStore<State>) => {
      store = testStore;
      store.setState({ user: null, error: null });
      fixture = TestBed.createComponent(LoginButtonGroupComponent);
      component = fixture.componentInstance;
    }));

    afterEach(() => {
      fixture.destroy();
      component = null;
    });

    it('should create the component', async(() => {
      expect(component).toBeDefined();
    }));

    it('should have option to sign in with email address', async(() => {
      expect(document.getElementById('emailSignIn').innerText.trim()).toBe(
        'or use your email address'
      );
    }));

    it('should have option to sign in with Facebook', fakeAsync(() => {
      expect(document.getElementById('facebookSignIn').innerText).toBe('Sign in with Facebook');
    }));

    it('should have option to sign in with Google', fakeAsync(() => {
      expect(document.getElementById('googleSignIn').innerText).toBe('Sign in with Google');
    }));
  });
});
