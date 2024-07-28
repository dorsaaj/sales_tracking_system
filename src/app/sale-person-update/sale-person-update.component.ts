import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sale-person-update',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sale-person-update.component.html',
  styleUrl: './sale-person-update.component.css'
})
export class SalePersonUpdateComponent {

  sales: any=[];
  APIURL = "http://127.0.0.1:8000"
  FirstName: string = '';
  LastName: string = '';
  Address!: string;
  Phone!: string;
  StartDate!: string;
  TerminationDate!: string;
  Manager!: string;

  constructor(private http: HttpClient) {}
  add_salesperson():Observable<any> {
    const body = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Address: this.Address,
      Phone: this.Phone,
      StartDate: this.StartDate,
      TerminationDate: this.TerminationDate,
      Manager: this.Manager
    };
    const queryParams = [
      this.FirstName ? `FirstName=${encodeURIComponent(this.FirstName)}` : null,
      this.LastName ? `LastName=${encodeURIComponent(this.LastName)}` : null,
      this.Address ? `Address=${encodeURIComponent(this.Address)}` : null,
      this.Phone ? `Phone=${encodeURIComponent(this.Phone)}` : null,
      this.StartDate ? `StartDate=${encodeURIComponent(this.StartDate)}` : null,
      this.Manager ? `Manager=${encodeURIComponent(this.Manager)}` : null
    ].filter(param => param != null).join('&');
    
    const url = `${this.APIURL}/salespersons?${queryParams}`;
    return  this.http.put(url, body)
    
  }
  save(): void{
    this.add_salesperson().subscribe(
      (res: any) => {
        alert('Database updated successfully!');
      },
      (error) => {
          alert('Error updating database: ' + error.message);
      }
    );
  }
}
