import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/_services/department.service';
import { AddDetacheRoleComponent } from '../add-detache-role/add-detache-role.component';
import { EventStatement } from '../models/event-statement.model';
import { EventType } from '../models/event-type.model';
import { User } from '../models/user.model';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { AdminService } from '../_services/admin.service';
import { EventService } from '../_services/event.service';

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

  buttonDepartment = false;
  buttonRanking = false;
  buttonUsers = false;
  buttonEventType = false;

  events?: EventStatement[];
  users?: User[];
  userToRemove?: User;
  eventTypes?: EventType[];
  departments?: Department[];
  
  eventTypeName = '';
  isAddingSuccessfull = false;
  isAddingFailed = false;
  addingMessage = '';
  blob?: Blob;

  constructor(private departmentService: DepartmentService, private adminService: AdminService,
    public modalService: NgbModal, private eventService: EventService ) { }

  ngOnInit(): void {
    this.retrieveEvents();
    this.retrieveUsers();
    this.retrieveEventTypes();
    this.retrieveDepartments();
    this.buttonDepartment = true;
    this.buttonRanking = false;
    this.buttonUsers = false;
    this.buttonEventType = false;
  }

  retrieveEvents(): void {
    this.adminService.getEvents().subscribe(
      data => {
        this.events = data;
        console.log(this.events);
      },
      error => {
        console.log(error);
      });
  }

  retrieveUsers(): void {
    this.adminService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users); 
      },
      error => {
        console.log(error);
      }
    )
  }

  retrieveEventTypes(): void {
    this.eventService.getAllEventTypes().subscribe(
      data => {
        this.eventTypes = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  retrieveDepartments(): void {
    this.departmentService.getAll().subscribe(
      data => {
        this.departments = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
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
        this.retrieveDepartments();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
        this.isSuccessful = false;
      });
  }

  showAddingDepartment(): void {
    this.buttonDepartment = true;
    this.buttonRanking = false;
    this.buttonUsers = false;
    this.buttonEventType = false;
  }

  showEventsRanking(): void {
    this.buttonDepartment = false;
    this.buttonRanking = true;
    this.buttonUsers = false;
    this.buttonEventType = false;
  }

  showUsers(): void {
    this.buttonDepartment = false;
    this.buttonRanking = false;
    this.buttonUsers = true;
    this.buttonEventType = false;
  }

  showAddingEventTypes(): void {
    this.buttonDepartment = false;
    this.buttonRanking = false;
    this.buttonUsers = false;
    this.buttonEventType = true;
  }

  openModalToRemove(user: User) {
    const modalRef = this.modalService.open(RemoveUserComponent);
    modalRef.componentInstance.userToRemove = user;
    modalRef.result.then((result:any) => {
      console.log(result);
    }, (reason:any) => {
      this.retrieveUsers();
    });
  }

  openModalRole(user: User) {
    const modalRef = this.modalService.open(AddDetacheRoleComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((result:any) => {
      console.log(result);
    }, (reason:any) => {
      this.retrieveUsers();
    });
  }

  onSubmitEventType(): void {
    const data = {
      name: this.eventTypeName
    }
    if (this.eventTypeName.length<1) {
      this.isAddingFailed = true;
      this.addingMessage = "name length required"
    } else {
    this.adminService.addEventType(data).subscribe(
      response => {
        this.isAddingSuccessfull = true;
        this.isAddingFailed = false;
        this.addingMessage = response.message;
        this.retrieveEventTypes();
      },
      error => {
        this.isAddingSuccessfull = false;
        this.isAddingFailed = true;
        this.addingMessage = error.error.message;
      });
    }
  }

  exportPdf(): void {
    this.adminService.eventsexportPdf().subscribe(
      data => {
        this.blob = new Blob([data], {type: 'application/pdf'});
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = "rank.pdf";
        link.click();
      },
      error => {
        console.log(error)
      }
    );
  }

}
