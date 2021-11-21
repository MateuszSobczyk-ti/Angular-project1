import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model'
import { Department } from '../models/department.model';
import { EventType } from '../models/event-type.model';
import { StatusEvent } from '../models/status-event.model';
import { DepartmentService } from '../_services/department.service';
import { EventService } from '../_services/event.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user', 
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  imgSrc?: string;
  events?: Event[];
  allEvents?: Event[];
  departments?: Department[];
  eventTypes?: EventType[];
  statusEvent?: StatusEvent[];
  currentEvent: Event = {};
  currentIndex = -1;
  searchedName = '';
  filterDepartment = '';
  filterEventType = '';
  filterStatusEvent = '';
  filterSigned = '';
  message='';
  button1 = false;
  button2 = false;
  canFilterStatus = false;
  emplCompany = false;

  constructor(private departmentService: DepartmentService, private tokenStorageService: TokenStorageService, 
      private eventService: EventService) { }

  ngOnInit(): void {
    this.retrieveEvents();
    this.retrieveDepartments();
    this.retrieveEventTypes();
    this.retrieveStatusEvent();
  }

  retrieveEvents(): void {
    this.eventService.getAll().subscribe(
      data => {
        this.events = data;
        this.allEvents = this.events;
        console.log(data);
        this.canFilterStatus = this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN') 
        || this.tokenStorageService.getUser().roles.includes('ROLE_EMPL_DEPARTMENT') 
        || this.tokenStorageService.getUser().roles.includes('ROLE_EMPL_COMPANY');
        this.emplCompany = this.tokenStorageService.getUser().roles.includes('ROLE_EMPL_COMPANY');
        if (this.canFilterStatus == false || this.emplCompany == true) {
          this.search();
        } 
      },
      error => {
        console.log(error);
      });
  }
  
  retrieveEventTypes(): void {
    this.eventService.getAllEventTypes().subscribe(
      data => {
        this.eventTypes = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
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

  retrieveStatusEvent(): void {
    this.eventService.getAllStatusEvent().subscribe(
      data => {
        this.statusEvent = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveEvents();
    this.currentEvent = {};
    this.currentIndex = -1;
  }

  setActiveEvent(event: Event, index: number): void {
    this.currentEvent = event;
    this.currentIndex = index;
    this.currentEvent.data_start = this.currentEvent.data_start?.slice(0,16).replace("T"," ").replace("-",".").replace("-",".");
    this.currentEvent.data_end = this.currentEvent.data_end?.slice(0,16).replace("T", " ").replace("-",".").replace("-",".");
    this.imgSrc = "data:image/png;base64,"+ this.currentEvent.imageData;
    if (this.currentEvent.czyZapisano) {
      this.button1 = true;
      this.button2 = false;
    } else {
      this.button1 = false;
      this.button2 = true;
    }
  }

  search():void {
    this.currentEvent = {};
    this.currentIndex = -1

    if (this.canFilterStatus == false) {
      this.filterStatusEvent = "ZAAKCEPTOWANY";
    }
    
    if (this.allEvents != null) {
      if (this.searchedName.length > 0) {
        this.events = this.allEvents.filter(i => i.name == this.searchedName);
      } else {
        this.events = this.allEvents;
      }
      if (this.filterDepartment.length > 0 && this.filterDepartment != "wszystkie") {
        this.events = this.events.filter(i => i.department == this.filterDepartment);
      }
      if (this.filterEventType.length > 0 && this.filterEventType != "wszystkie") {
        this.events = this.events.filter(i => i.eventType == this.filterEventType);
      }
      if (this.filterStatusEvent.length > 0 && this.filterStatusEvent != "wszystkie") {
        this.events = this.events.filter(i => i.statusEvent == this.filterStatusEvent);
      }
      if (this.filterSigned.length > 0 && this.filterSigned != "wszystkie") {
        if (this.filterSigned == "tak") {
          this.events = this.events.filter(i => i.czyZapisano == true);
        } else {
          this.events = this.events.filter(i => i.czyZapisano == false);
        }
      }
      if (this.emplCompany == true) {
        this.events = this.events.filter(i => i.czyZapisano == true);
      }
    }
    console.log(this.events);
  }

  enroll():void {
    const data = {
      eventId: this.currentEvent.id,
      roleInEvent: "contestant",
      userId: this.tokenStorageService.getUser().id
    }
    this.eventService.enroll(data).subscribe(
      response => {
        console.log(data);
        this.ngOnInit();
        this.button1 = true;
        this.button2 = false;
      },
      error => {
        console.log(error);
        this.message = error.error.message;
      });
  }

  rateEvent():void {
    const data = {
      eventId: this.currentEvent.id,
      userId: this.tokenStorageService.getUser().id,
      rate: this.currentEvent.rate
    }
    this.eventService.rate(data).subscribe(
      response => {
        console.log(data);

      },
      error => {
        console.log(error);
      }
    )
  }

}
