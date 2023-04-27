import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { CoreModule } from 'src/app/modules/core/core.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './modules/main/home/home.module';
import { BuilderModule } from './modules/builder/builder.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreditsService } from './shared/services/credits.service';

const routes: Routes = [{ path: '', loadChildren: './modules/main/main.module#MainModule' }];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    NavbarModule,
    FooterModule,
    HomeModule,
    BrowserAnimationsModule,
    BuilderModule,
    CoreModule,
  ],
  providers: [AuthService, UtilService, CreditsService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
