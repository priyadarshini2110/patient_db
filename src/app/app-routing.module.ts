import { ForgotpasswordModule } from './components/auth/forgotpassword/forgotpassword.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from "./shared/routes/content-routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', 
    loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'forgotpassword/user', 
    loadChildren: () => import('./components/auth/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule)
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'forgotpassword',
    redirectTo: '/forgotpassword/user',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  },
  // {
  //   path: '**',
  //   redirectTo: '/forgotpassword'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
