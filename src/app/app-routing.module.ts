import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponent } from '@private/pages/app-main/app-main.component';
import { Environment } from '@environments/environment';
import { AppLoginComponent } from '@public/pages/login/app-login.component';

const routes: Routes = [
  {
    path: Environment.baseHref,
    component: AppMainComponent,
    children: [{ path: '', component: AppLoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
