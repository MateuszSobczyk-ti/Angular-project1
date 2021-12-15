import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event} from '../models/event.model';
import { Department } from '../models/department.model';
import { EventType } from '../models/event-type.model';
import { StatusEvent } from '../models/status-event.model';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/event/';

@Injectable({
  providedIn: 'root'
})

export class EventService {

    constructor (private http: HttpClient) {}

    uploadImage(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
      formData.append("file", file);

      const req = new HttpRequest('POST', baseUrl + 'image', formData, {
        reportProgress: true,
        responseType: 'json'
      });
  
      return this.http.request(req);
    }

    create(data: any): Observable<any> {
      return this.http.post(baseUrl + 'event', data);
   }

   enroll(data: any): Observable<any> {
     return this.http.post(baseUrl + 'enroll', data);
   }

   rate(data: any): Observable<any> {
     return this.http.post(baseUrl + 'rate', data);
   }

   getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl + 'events');
  }

    getAllEventTypes(): Observable<EventType[]> {
        return this.http.get<EventType[]>(baseUrl + 'eventTypes');
    }

    getAllStatusEvent(): Observable<StatusEvent[]> {
      return this.http.get<StatusEvent[]>(baseUrl + 'statusEvent');
  }

    findEventByName(name: any): Observable<Event[]> {
      return this.http.get<Event[]>(baseUrl + 'events' + '?name=' + name);
    }

    updateEvent(id: any, data: any): Observable<any> {
      return this.http.put(`${baseUrl}event/${id}`, data);
    }

    getEvent(id: any): Observable<Event> {
      return this.http.get(`${baseUrl}events/${id}`);
    }

    getUser(): Observable<User> {
      return this.http.get<User>(baseUrl + 'user');
    }
  
}