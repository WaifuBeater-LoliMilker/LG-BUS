import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormArray } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(fb: FormBuilder, private router: Router) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginForm: FormGroup;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  message = '';
  username = new FormControl('');
  password = new FormControl('');
  showPassword = false;
  @ViewChild('messageEl') messageElement!: ElementRef;
  onSubmit() {
    if (this.loginForm.invalid) {
      this.message = 'Vui lòng nhập đầy đủ thông tin';
      this.messageElement.nativeElement.classList.add('text-error');
      return;
    }
    this.message = 'Đang đăng nhập...';
    this.messageElement.nativeElement.classList.remove('text-error');
    if (
      !['ADMIN', 'USER', 'SUPPLIER'].includes(
        this.loginForm.value.username.toUpperCase()
      )
    ) {
      this.message = 'Sai tên đăng nhập';
      this.messageElement.nativeElement.classList.add('text-error');
      return;
    } else {
      this.message = '';
      this.messageElement.nativeElement.classList.add('text-error');
      localStorage.setItem(
        'account',
        this.loginForm.value.username.toUpperCase()
      );
      this.router.navigateByUrl('main-page');
      return;
    }
  }
}
