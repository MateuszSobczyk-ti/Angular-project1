import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent implements OnInit {

  form: any = {
    zip_code: '',
    city: '',
    street: '',
    house_number: '',
    name: ''
  };
  isSignupFailed = false;
  isSuccessful = false;
  errorMessage = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const data = {
      zip_code: this.form.zip_code,
      city: this.form.city,
      street: this.form.street,
      house_number: this.form.house_number,
      name: this.form.name
    };

    this.departmentService.create(data).subscribe(
      response => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
      });
  }
}
