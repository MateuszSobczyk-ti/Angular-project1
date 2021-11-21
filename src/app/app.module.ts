import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-events/board-user.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BoardEmplDepComponent } from './board-new-event/board-empl-dep.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CustomModalComponent,
    BoardEmplDepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authInterceptorProviders, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }