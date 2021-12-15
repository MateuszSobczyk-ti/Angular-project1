import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RemoveUserComponent } from './remove-user/remove-user.component';
import { AddDetacheRoleComponent } from './add-detache-role/add-detache-role.component';

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
    RemoveUserComponent,
    AddDetacheRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatProgressBarModule
  ],
  schemas: [ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [authInterceptorProviders, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }