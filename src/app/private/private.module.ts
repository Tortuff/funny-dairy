import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigurationsComponent } from './pages/user-configurations/user-configurations.component';
import { AppMainComponent } from '@private/pages/main.app/app-main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserConfigurationsComponent, AppMainComponent],
  imports: [CommonModule, RouterModule],
})
export class PrivateModule {}
