import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';

const baseUrl = 'http://localhost:8080/api/org/';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

    constructor (private http: HttpClient) {}

    getAll(): Observable<Department[]> {
        return this.http.get<Department[]>(baseUrl + 'departments');
    }


    create(data: any): Observable<any> {
        return this.http.post(baseUrl + 'department', data);
    }
}