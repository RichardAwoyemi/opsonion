import { async, TestBed } from '@angular/core/testing';
import { FormRegisterComponent } from './form-register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from '../../services/util.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { LoggerConfig, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { UserService } from '../../services/user.service';
import { CreditsService } from '../../services/credits.service';
import { WebsiteService } from '../../services/website.service';
import { BuilderComponentsService } from '../../../modules/builder/builder-components/builder-components.service';
import { BuilderService } from '../../../modules/builder/builder.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TemplateService } from '../../services/template.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FontsService } from '../../services/fonts.service';

describe('FormRegister', () => {
  beforeEach(async(() => {
    const authState: IUser = {
      city: '',
      credits: 0,
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      email: '',
      emailVerified: false,
      firstName: '',
      lastName: '',
      photoURL: '',
      postcode: '',
      referralId: '',
      referredBy: '',
      selectedCurrency: '',
      streetAddress1: '',
      streetAddress2: '',
      username: '',
      displayName: null,
      uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2',
    };

    const mockAngularFireAuth: unknown = {
      authState: Observable.of(authState),
    };

    const mockAngularFireStore = {
      collection: () => {},
    };

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        RouterTestingModule,
        LoggerTestingModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        UtilService,
        UserService,
        WebsiteService,
        BuilderService,
        BuilderComponentsService,
        CreditsService,
        FontsService,
        TemplateService,
        NGXLogger,
        ToastrService,
        TemplateService,
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: LoggerConfig, useValue: { level: NgxLoggerLevel.ERROR } },
        { provide: AngularFirestore, useValue: mockAngularFireStore },
      ],
      declarations: [FormRegisterComponent],
    })
      .compileComponents()
      .then(() => {});
  }));

  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(FormRegisterComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have necessary form elements', async(() => {
      const elements = fixture.debugElement.queryAll(By.css('.form-group'));
      expect(elements.length).toEqual(7);
    }));
  });
});
