import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DataGuard } from './data.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    component: AddComponent,
    path: 'add',
    canActivate: [DataGuard]
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: AddComponent,
    path: 'update/:id',
    canActivate: [DataGuard]
  },
  {
    component: ListComponent,
    path: 'list',
    canActivate: [DataGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
