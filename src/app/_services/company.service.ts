import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

const baseUrl = 'http://localhost:8080/api/org/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

    constructor (private http: HttpClient) {}

    getAll(): Observable<Company[]> {
        return this.http.get<Company[]>(baseUrl + 'companies');
    }


    create(data: any): Observable<any> {
        return this.http.post(baseUrl + 'company', data, httpOptions);
    }
    
}