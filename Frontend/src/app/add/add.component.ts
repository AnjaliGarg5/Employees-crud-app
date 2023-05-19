import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordsService } from '../records.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private arouter: ActivatedRoute, private rservice: RecordsService, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      fname: [null, [Validators.required]],
      lname: [null],
      email: [null, [Validators.required, Validators.email]],
      phonenumber: [null, [Validators.required, Validators.minLength, Validators.maxLength]],
      dob: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      pincode: [null, [Validators.required, Validators.minLength]],
      gender: this.gender,
      education: [null, [Validators.required]],
    });
    if (this.empId) {
      this.rservice.getData(this.empId).subscribe({
        next: res => {
          this.data = res[0];
          this.formdata.patchValue(this.data);
          this.shwForm = true;
        }
      });
    } else {
      this.shwForm = true;
    }
  }

  formdata!: FormGroup;
  gender = new FormControl('female' as FloatLabelType, [Validators.required]);
  empId = this.arouter.snapshot.paramMap.get('id');
  shwForm = false;
  data: any;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  onClick(val: any) {
    if (this.empId) {
      this.rservice.updateInfo(val, this.empId).subscribe({
        next: res => {
          this.router.navigate(['/list']);
          this.snackbar.open("Successfully Updated", "close");
        }
      });
    } else {
      this.rservice.addInfo(val).subscribe({
        next: res => {
          this.router.navigate(['/list']);
          this.snackbar.open("Successfully Added", "close");
        }
      });
    }
  }

  list() {
    this.router.navigate(['/list']);
  }

}
