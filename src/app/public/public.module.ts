import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const components: any[] = [];
const pages = [LoginComponent];

@NgModule({
  declarations: [...components, ...pages],
  exports: [...components, ...pages],
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
})
export class PublicModule {}
