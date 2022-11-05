import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from '@public/pages/login/app-login.component';
import { UserConfigurationsComponent } from '@private/pages/user-configurations/user-configurations.component';

const routes: Routes = [
  { path: 'funny-dairy', component: AppLoginComponent },
  { path: '', component: UserConfigurationsComponent },
  // { path: '**', redirectTo: 'funny-dairy' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
