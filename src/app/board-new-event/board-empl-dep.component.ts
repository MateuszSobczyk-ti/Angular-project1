import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Event } from 'src/app/models/event.model'
import { EventService } from '../_services/event.service';
import { Department } from '../models/department.model';
import { EventType } from '../models/event-type.model';
import { DepartmentService } from '../_services/department.service';
import { ActivatedRoute } from '@angular/router';
import { StatusEvent } from '../models/status-event.model';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-empl-dep',
  templateUrl: './board-empl-dep.component.html',
  styleUrls: ['./board-empl-dep.component.css']
})
export class BoardEmplDepComponent implements OnInit{
  form: any = {
    name: null,
    description: '',
    max_number_of_contestant: 0,
    data_start: null,
    data_end: null,
    departmentId: null,
    eventTypeId: null,
    statusEventId: null,
    imageId: null,
    comments: null,
    place: ''
  }
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = '';
  isUpdate = false;

  departments?: Department[];
  eventTypes?: EventType[];
  statusEvent?: StatusEvent[];
  event: Event = {};
  dep: Department = {}; 
  currentDate?: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  emplCompany = false;

  constructor(private eventService: EventService, private departmentService: DepartmentService,
      private route: ActivatedRoute, private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    this.retrieveDepartments();
    this.retrieveEventTypes();
    this.retrieveStatusEvent();
    this.currentDate = new Date().toISOString().slice(0, 16);
    this.emplCompany = this.tokenStorageService.getUser().roles.includes('ROLE_EMPL_COMPANY');
    console.log(this.emplCompany);
  }

  retrieveEvent(id: string): void {
    this.eventService.getEvent(id)
      .subscribe(
        data => {
          this.event = data;
          this.event.comments = this.event.comments?.replace("\\n", "\n");
          console.log(data);
          this.fillForm();
        },
        error => {
          console.log(error);
        }
      )
  }

  fillForm(): void {
    this.form.name = this.event.name;
    this.form.description = this.event.description;
    this.form.max_number_of_contestant = this.event.max_number_of_contestant;
    this.form.place = this.event.place;
    if (this.event.imageData != null) {
      this.message = "image has been added before, you can change it by choosing new image.";
    }
    this.form.data_start = this.event.data_start?.slice(0,16);
    this.form.data_end = this.event.data_end?.slice(0,16);
    const dep = this.departments?.filter(i => i.name == this.event.department);
    if (dep != undefined) {
      this.form.departmentId = dep[0].id;
    } 
    const type = this.eventTypes?.filter(i => i.name == this.event.eventType);
    if (type != undefined) {
      this.form.eventTypeId = type[0].id;
    }
    const status = this.statusEvent?.filter(i => i.name == this.event.statusEvent);
    if (status != undefined) {
      this.form.statusEventId = status[0].id;
    }
  }

  retrieveStatusEvent(): void {
    this.eventService.getAllStatusEvent().subscribe(
      data => {
        this.statusEvent = data;
        console.log(data);
        if(this.route.snapshot.params.id != undefined) {
          this.isUpdate = true;
          this.retrieveEvent(this.route.snapshot.params.id);
        } else {
          this.isUpdate = false;
        }
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.eventService.uploadImage(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.form.imageId = event.body.imageId;
              console.log(this.form.imageId);
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }

  onSubmit(): void {
    const data = {
      name: this.form.name,
      description: this.form.description,
      max_number_of_contestant: this.form.max_number_of_contestant,
      data_start: this.form.data_start,
      data_end: this.form.data_end,
      departmentId: this.form.departmentId,
      eventTypeId: this.form.eventTypeId,
      statusEventId: this.form.statusEventId==null ? 3 : this.form.statusEventId,
      imageId: this.form.imageId,
      comment: this.form.comments,
      place: this.form.place
    };

    this.eventService.create(data).subscribe(
      response => {
        console.log(data);
        this.isSuccessful = true;
        this.isSubmitFailed = false;
      },
      error => {
        console.log(error);
        console.log(data);
        this.errorMessage = error.error.message;
        this.isSubmitFailed = true;
      });
  }

  onUpdate(): void {
    const data = {
      name: this.form.name,
      description: this.form.description,
      max_number_of_contestant: this.form.max_number_of_contestant,
      data_start: this.form.data_start,
      data_end: this.form.data_end,
      departmentId: this.form.departmentId,
      eventTypeId: this.form.eventTypeId,
      statusEventId: this.form.statusEventId,
      imageId: this.form.imageId,
      comment: this.form.comments,
      place: this.form.place
    };

    this.eventService.updateEvent(this.event.id, data).subscribe(
      response => {
        console.log(data);
        this.isSuccessful = true;
        this.isSubmitFailed = false;
      },
      error => {
        console.log(error);
        console.log(data);
        this.errorMessage = error.error.message;
        this.isSubmitFailed = true;
      });
  }
}
