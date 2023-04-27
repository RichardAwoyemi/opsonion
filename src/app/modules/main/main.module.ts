import { NgModule } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LegalComponent } from './legal/legal.page';
import { MainRoutingModule } from './main.routing.component';
import { PressComponent } from './press/press.page';
import { HomeModule } from './home/home.module';
import { SectionHeaderGroupModule } from 'src/app/shared/components/section-header-group/section-header-group.module';
import { FormRegisterModule } from 'src/app/shared/components/form-register/form-register.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [PressComponent, LegalComponent],
  providers: [AuthService],
  imports: [
    HomeModule,
    MainRoutingModule,
    FontAwesomeModule,
    SectionHeaderGroupModule,
    FormRegisterModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
