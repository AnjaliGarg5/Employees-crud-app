import { Injectable } from '@angular/core';
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

  constructor(private router: Router, private snackbar: MatSnackBar, private http: HttpClient) { }

  datePipe = new DatePipe('en-US');

  getRegister(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/register`, data);
  }

  getLogin(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8081/login`, data).pipe(
      tap({
        next: (res) => {
          const expiresAt = moment().add(res.expiresIn, 'second');
          this.setSession(res);
          setTimeout(() => {
            this.logout();
          }, expiresAt.valueOf());
        },
        error: (err) => {
          console.error(err);
        }
      })
    );
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getinfo(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  deleteInfo(i: any): Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/delete/${i}`);
  }

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
    this.snackbar.open("Session Time out! Login again.", "close");
    this.router.navigate(['/login']);
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = expiration !== null ? JSON.parse(expiration) : null;
  //   return moment(expiresAt);
  // }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

}

