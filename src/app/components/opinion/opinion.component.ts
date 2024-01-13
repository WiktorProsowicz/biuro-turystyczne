import { Component, Input } from '@angular/core';
import { Opinion } from '../../shared/interfaces/opinion';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/interfaces/user';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-opinion',
  standalone: true,
  imports: [NgIf],
  templateUrl: './opinion.component.html',
  styleUrl: './opinion.component.css'
})
export class OpinionComponent {

  @Input() opinion: Opinion;

  user: User;

  constructor(private usersService: UsersService) {
  }

  getUser(): User {
    return this.usersService.getUser(this.opinion.userId);
  }

}
