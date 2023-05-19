import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordsService } from '../records.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private rservice: RecordsService, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) { }

    
  ngOnInit() {
    this.formdata = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      pwd: [null, [Validators.required]]
    });
  }

  formdata!: FormGroup;
  hide = true;

  onClick(val: any) {
    this.rservice.getRegister(val).subscribe({
      next: res => {
        this.snackbar.open("Login to access", "close", {duration: 10})
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackbar.open("Error", "close", {duration: 10})
        console.error(err);
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
