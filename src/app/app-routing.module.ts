import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from '@public/pages/login/app-login.component';

const routes: Routes = [
  { path: 'funny-dairy', component: AppLoginComponent },
  { path: '**', redirectTo: 'funny-dairy' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
