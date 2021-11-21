import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-events/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardEmplDepComponent } from './board-new-event/board-empl-dep.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'events', component: BoardUserComponent },
  { path: 'admin', component: BoardModeratorComponent },
  { path: 'newEvent', component: BoardEmplDepComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'events/:id', component: BoardEmplDepComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }