import { Injectable } from '@angular/core';
import { Employee } from './emp';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import * as moment from "moment";
import { DatePipe } from '@angular/common';

const baseUrl = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {


  empData: Employee[] = [
    { id: "101", fname: 'zzzz', lname: 'Garg', email: 'qwe@abc.com', phoneNumber: 1234567890, dob: new Date("Dec 08 2019"), city: 'jaipur', state: 'rajasthan', country: 'India', pincode: 123456, gender: 'female', education: 'Graduate' },
    { id: "102", fname: 'Deepak', lname: 'Gupta', email: 'xyz@abc.com', phoneNumber: 1234567890, dob: new Date("Dec 08 2019"), city: 'jaipur', state: 'rajasthan', country: 'India', pincode: 123456, gender: 'male', education: 'Graduate' },
    { id: "103", fname: 'Ram', lname: 'Sharma', email: 'tyu@abc.com', phoneNumber: 1234567890, dob: new Date("Dec 08 2019"), city: 'jaipur', state: 'rajasthan', country: 'India', pincode: 123456, gender: 'male', education: 'Graduate' },
    { id: "104", fname: 'Aakash', lname: 'Singh', email: 'jvk@abc.com', phoneNumber: 1234567890, dob: new Date("Dec 08 2019"), city: 'jaipur', state: 'rajasthan', country: 'India', pincode: 123456, gender: 'male', education: 'Graduate' },
    { id: "105", fname: 'Ravi', lname: 'Kumar', email: 'kxs@abc.com', phoneNumber: 1234567890, dob: new Date("Dec 03 2019"), city: 'jaipur', state: 'rajasthan', country: 'India', pincode: 123456, gender: 'male', education: 'Graduate' },
  ];

  getRegister(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/register`, data);
  }

  getLogin(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/login`, data).pipe(
      tap({
        next: (res) => {
          this.setSession(res);
        },
        error: (err) => {
          console.error(err);

        }
      })
    );

  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'hour');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getinfo(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  deleteInfo(i: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/delete/${i}`);
  }


  datePipe = new DatePipe('en-US');


  addInfo(login: any): Observable<any> {
    const empdob = this.datePipe.transform(login.dob, 'yyyy-MM-dd');
    const data = {
      fname: login.fname,
      lname: login.lname, email: login.email, phonenumber: login.phonenumber, dob: empdob, city: login.city, state: login.state, country: login.country, pincode: login.pincode, gender: login.gender, education: login.education
    };
    return this.http.post<any>(`http://localhost:8081/add`, data);
  }

  updateInfo(i: any, oldId: any): Observable<any> {
    const empdob = this.datePipe.transform(i.dob, 'yyyy-MM-dd');
    const data = {
      id: i.id, fname: i.fname, lname: i.lname, email: i.email, phonenumber: i.phonenumber, dob: empdob, city: i.city, state: i.state, country: i.country, pincode: i.pincode, gender: i.gender, education: i.education
    };
    return this.http.put<any>(baseUrl + `/update/${oldId}`, data);
  }

  getData(empId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/getId/${empId}`);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/register']);
}

  constructor(private router: Router, private snackbar: MatSnackBar, private http: HttpClient) { }
}

