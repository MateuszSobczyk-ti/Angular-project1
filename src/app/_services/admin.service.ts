import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventStatement } from '../models/event-statement.model';
import { EventType } from '../models/event-type.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<EventStatement[]> {
    return this.http.get<EventStatement[]>(baseUrl + 'eventStatement');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + 'users');
  }

  removeUser(id: any): Observable<any> {
    return this.http.put(`${baseUrl}user/${id}`, "");
  }
  
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(baseUrl + 'roles');
  }

  addRole(id: any, newRole: any): Observable<any> {
    return this.http.put(`${baseUrl}userAddRole/${id}`, newRole);
  }

  detacheRole(id: any, oldRole: any): Observable<any> {
    return this.http.put(`${baseUrl}userDeleteRole/${id}`, oldRole);
  }

  addEventType(data: any): Observable<any> {
    return this.http.post(baseUrl + 'eventType', data);
  }

  eventsexportPdf(): Observable<any> {  
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.get(baseUrl + 'eventExportPdf', httpOptions);
  }

}
