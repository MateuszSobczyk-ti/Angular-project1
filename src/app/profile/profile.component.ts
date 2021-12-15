import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { EventService } from '../_services/event.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser?: User;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.eventService.getUser().subscribe(
      data => {
        this.currentUser = data;
      },
      error => {
      console.log(error);
      });
  }
}