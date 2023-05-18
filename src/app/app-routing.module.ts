import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    component: AddComponent,
    path: 'add'
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
    component: UpdateComponent,
    path: 'update/:id'
  },
  {
    component: ListComponent,
    path: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
