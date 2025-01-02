import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = { 
    username: '', 
    password: '' 
  };
  errorMessage: string = '';

  constructor(private authservice: AuthService, private router: Router) {}

  login(): void {
    this.authservice.login(this.user).subscribe({
      next: (response: any) => {
        if(typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
        }
        console.log('Login successful', response);
        this.router.navigate(['/book-list']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = "Invaild username or password";
      }
  });
  }
}
