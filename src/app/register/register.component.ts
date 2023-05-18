import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecordsService } from '../records.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formdata!: FormGroup;
  hide = true;

  onClick(val: any) {
    console.log(val);
   this.rservice.getRegister(val).subscribe((res) => {
    console.log(res);
   });
   this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    this.formdata = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],  
      pwd:[null, [Validators.required]]
    });
  }

  constructor(private rservice: RecordsService, private router: Router, private fb: FormBuilder) { }

}
