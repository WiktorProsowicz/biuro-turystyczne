import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { UsersService } from '../../shared/services/users.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  formGroup: FormGroup;

  errorMessage: string = '';

  constructor(private usersService: UsersService) {

    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  login() {

    this.errorMessage = '';

    this.usersService.signIn(this.formGroup.value.email, this.formGroup.value.password).catch((error) => {
      this.errorMessage = 'Invalid email or password.';
    }).then((data) => {
      this.formGroup.reset();
    });
  }

}
