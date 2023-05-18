import { Component } from '@angular/core';
import { RecordsService } from '../records.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  formdata!: FormGroup;
  data: any;
  empId = this.arouter.snapshot.paramMap.get('id');

  shwForm = false;

  onUpdate(value: any) {
    this.rservice.updateInfo(value, this.empId).subscribe({
      next: res => {
        this.router.navigate(['/list']);
        this.snackbar.open("Successfully Updated", "close");
      }
    });
  }

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  ngOnInit() {
    if (this.empId) {
      this.rservice.getData(this.empId).subscribe({
        next: res => {
          this.data = res[0];
          console.log(this.data.id);
          this.formdata = this.fb.group({
            id: [this.data?.id, [Validators.required]],
            fname: [this.data?.fname, [Validators.required]],
            lname: [this.data?.lname],
            email: [this.data?.email, [Validators.required, Validators.email]],
            phonenumber: [this.data?.phonenumber, [Validators.required, Validators.minLength]],
            dob: [this.data?.dob, [Validators.required]],
            city: [this.data?.city, [Validators.required]],
            state: [this.data?.state, [Validators.required]],
            country: [this.data?.country, [Validators.required]],
            pincode: [this.data?.pincode, [Validators.required, Validators.minLength]],
            gender: [this.data?.gender],
            education: [this.data?.education as ThemePalette, [Validators.required]],
          });
          this.shwForm = true;
        }
      });
    } else {
      this.shwForm = true;
    }

  }

  constructor(private rservice: RecordsService, private arouter: ActivatedRoute, private router: Router, private fb: FormBuilder, private snackbar: MatSnackBar) { }

}
