import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesComponent } from '../sales/sales.component';
import { SalespersonsComponent } from '../salespersons/salespersons.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-salespersons-add',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './salespersons-add.component.html',
  styleUrl: './salespersons-add.component.css'
})
export class SalespersonsAddComponent {
  FirstName= ''
  LastName=''
  Address= ''
  Phone= ''
  StartDate= ''
  TerminationDate= ''
  Manager= ''

  APIURL = "http://127.0.0.1:8000"
 constructor(private http:HttpClient){
  }

  ngOnInit(): void {
  }
  
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
    const url = `${this.APIURL}/salespersons?FirstName=${encodeURIComponent(this.FirstName)}&LastName=${encodeURIComponent(this.LastName)}&Address=${encodeURIComponent(this.Address)}&Phone=${encodeURIComponent(this.Phone)}&StartDate=${encodeURIComponent(this.StartDate)}&Manager=${encodeURIComponent(this.Manager)}`;
    return  this.http.post(url, body)
    
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