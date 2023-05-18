import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RecordsService } from '../records.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

  dcolumns: string[] = ['id', 'fname', 'lname', 'email', 'phonenumber', 'dob', 'gender', 'city', 'state', 'country', 'pincode', 'education', 'edit', 'delete'];

  infoReceived: any;

  shwlist = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource=this.searchpipe.transform(this.dataSource, filterValue.trim().toLowerCase());
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  openAdd() {
    this.router.navigate(['/add']);
  }

  onDelete(value: any) {
    //console.log(value);
    const dialogRef = this.dialog.open(Dialog, {
      height: '300px',
      width: '400px',
      data: value,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.value) {
        
      
      }
    })
  }

  logout(){
    this.rservice.logout();
  }
  
  constructor(private router: Router, private rservice: RecordsService, public dialog: MatDialog, private aroute: ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.rservice.getinfo().subscribe({
      next: data => {
        console.log(data);
        this.infoReceived = data;
        this.dataSource = new MatTableDataSource(this.infoReceived);
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.shwlist = true;
      },
      error: (err) => {
        console.error(err)
        this.shwlist = true;
      }
    });
  }

}



@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class Dialog implements OnInit {

  onOk(value: any) {
    this.dialogRef.close({ value });
    this.rservice.deleteInfo(value).subscribe({
      next: res => {
        location.reload();
       // this.router.navigate(['/list']);
        this.snackbar.open("Successfully Deleted", "close");
      },
      error: (err) => console.error(err)
    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<Dialog>, private router: Router, private rservice: RecordsService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

}

import { Pipe, PipeTransform } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Pipe({
  name: 'FilterData'
})
export class Search implements PipeTransform {

  infoReceived = this.rservice.getinfo();
  transform(value: string): string {
    var data = this.infoReceived
    // .filter(
    //       element => element.id === value );
    return " data[0].id";
  }
  constructor(private rservice: RecordsService) { }

}