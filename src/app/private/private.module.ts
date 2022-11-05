import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigurationsComponent } from './pages/user-configurations/user-configurations.component';
import { MainAppComponent } from '@private/pages/main.app/main.app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserConfigurationsComponent, MainAppComponent],
  imports: [CommonModule, RouterModule],
})
export class PrivateModule {}
