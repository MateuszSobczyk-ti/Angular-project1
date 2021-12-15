import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-add-detache-role',
  templateUrl: './add-detache-role.component.html',
  styleUrls: ['./add-detache-role.component.css']
})
export class AddDetacheRoleComponent implements OnInit {
  user?: User;
  isSuccessful = false;
  message?: string;
  roles?: Role[];
  role?: number;

  sh: any = 1;
  isChecked: boolean = true;

 constructor(public activeModal: NgbActiveModal, private adminService: AdminService) { }
  
 ngOnInit(): void {
  this.retrieveRoles();
  }

  closeModal() {
    this.activeModal.close();
  }

  retrieveRoles(): void {
    this.adminService.getRoles().subscribe(
      data => {
        this.roles = data;
        this.role = this.roles[0].id;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  action(): void {
    if (this.sh == 0) {
      this.detacheRole();
    } else {
      this.addRole();
    }
  }

  addRole(): void {
    const data = {
      role: this.role
    }
    this.adminService.addRole(this.user?.id, data).subscribe(
      response => {
        this.message = response.message;
        this.isSuccessful = true;
      },
      error => {
        console.log(error);
      }
    )
  }

  detacheRole(): void {
    const data = {
      role: this.role
    }
    this.adminService.detacheRole(this.user?.id, data).subscribe(
      response => {
        this.message = response.message;
        this.isSuccessful = true;
      },
      error => {
        console.log(error);
      }
    )
  }
  

}
