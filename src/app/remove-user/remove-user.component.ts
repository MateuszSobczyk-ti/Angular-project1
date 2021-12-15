import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit {
  userToRemove?: User;
  isSuccessful = false;
  message?: string;

  constructor(public activeModal: NgbActiveModal, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log(this.userToRemove);
  }

  closeModal() {
    this.activeModal.close();
  }

  removeUser() {
    this.adminService.removeUser(this.userToRemove?.id).subscribe(
      response => {
        console.log(response);
        this.isSuccessful = true;
        this.message = response.message;
      },
      error => {
        console.log(error);
        this.isSuccessful = false;
      }
    )
  }

}
