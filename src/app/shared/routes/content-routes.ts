import { ForgotpasswordComponent } from './../../components/auth/forgotpassword/forgotpassword.component';
import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: "Dashboard"
    }
  },
  // {
  //   path: 'forgotpassword/user',
  //   loadChildren: () => import('../../components/auth/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule),
  //   data: {
  //     breadcrumb: "Forgotpassword"
  //   }
  // },

];