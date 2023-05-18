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
  formdata!: FormGroup;
  hide = true;

  onClick(val: any) {
    this.rservice.getLogin(val).subscribe((res) => {
      console.log(res);
      if(res){
        this.router.navigate(['/list']);
      }else {
        this.snackbar.open(res , "close");
      }
    });
  }

  ngOnInit() {
    this.formdata = this.fb.group({
      email: [null, [Validators.required]],
      pwd: [null, [Validators.required]]
    });
  }

  constructor(private rservice: RecordsService, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) { }
}
