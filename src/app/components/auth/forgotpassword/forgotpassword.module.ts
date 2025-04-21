import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AuthService } from '../auth.service';

export const routes: Routes = [
  { path: '', component: ForgotpasswordComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
  exports: [],
  declarations: [ForgotpasswordComponent],
  providers: [AuthService],
})
export class ForgotpasswordModule { }


