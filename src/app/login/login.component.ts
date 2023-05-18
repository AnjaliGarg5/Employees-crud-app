import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordsService } from '../records.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private rservice: RecordsService, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      email: [null, [Validators.required]],
      pwd: [null, [Validators.required]]
    });
  }

  formdata!: FormGroup;
  hide = true;

  register() {
    this.router.navigate(['/register']);
  }

  onClick(val: any) {
    this.rservice.getLogin(val).subscribe({
      next: (res) => {
        this.snackbar.open("Login Successfuly", "close", {duration: 10});
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.log(err.error)
        this.snackbar.open(err.error, "close", {duration: 10});
      }
    });
  }
}
