import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { AuthManagementComponent } from './components/auth-management/auth-management.component';
import { AddNameModalComponent } from './modals/add-name-modal/add-name-modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    ForgotPasswordComponent,
    EmailVerificationComponent,
    AuthManagementComponent,
    AddNameModalComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
