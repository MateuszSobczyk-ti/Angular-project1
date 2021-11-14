import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventService } from '../_services/event.service';
import { Department } from '../models/department.model';
import { EventType } from '../models/event-type.model';
import { DepartmentService } from '../_services/department.service';

@Component({
  selector: 'app-board-empl-dep',
  templateUrl: './board-empl-dep.component.html',
  styleUrls: ['./board-empl-dep.component.css']
})
export class BoardEmplDepComponent implements OnInit{
  form: any = {
    name: null,
    description: null,
    max_number_of_contestant: 0,
    data_start: null,
    data_end: null,
    departmentId: null,
    eventTypeId: null,
    statusEventId: null,
    imageId: null
  }
  isSuccessful = false;
  isSubmitFailed = false;
  errorMessage = '';

  departments?: Department[];
  eventTypes?: EventType[];
  currentDate?: string;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  constructor(private eventService: EventService, private departmentService: DepartmentService ) { }

  ngOnInit(): void {
    this.retrieveDepartments();
    this.retrieveEventTypes();
    this.currentDate = new Date().toISOString().slice(0, 16);
    console.log(this.currentDate);
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
      statusEventId: 1,
      imageId: this.form.imageId
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
}
