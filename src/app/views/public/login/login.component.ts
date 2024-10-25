import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user.interface';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectLoginError } from '@shared/store/auth/user.selectors';
import { loginUser } from '@shared/store/auth/auth.actions';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public static PATH = 'login';
  private fb = inject(FormBuilder)
  private store = inject(Store);
  protected showPassword: boolean = false;

  loginForm:  FormGroup<any> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });;


  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(loginUser({ loginData: { email, password } }));
    } else {
      this.loginForm.markAllAsTouched();
    }
    
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
 
