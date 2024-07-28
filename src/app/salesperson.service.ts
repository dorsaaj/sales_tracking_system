import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {
  private apiUrl = ' http://127.0.0.1:8000/salespersons';  

  constructor(private http: HttpClient) {}

  getSalesperson(FirstName: string, LastName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?FirstName=${FirstName}&LastName=${LastName}`);
  }

  createSalesperson(salesperson: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, salesperson);
  }

  deleteSalesperson(FirstName: string, LastName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?FirstName=${FirstName}&LastName=${LastName}`);
  }

  updateSalesperson(salesperson: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, salesperson);
  }
}