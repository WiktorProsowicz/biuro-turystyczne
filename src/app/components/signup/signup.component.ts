import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, MenuComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formGroup: FormGroup;

  constructor(private usersService: UsersService) {

    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nick: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

  }

  register() {
    this.usersService.signUp(this.formGroup.value.email, this.formGroup.value.password);
  }
}
