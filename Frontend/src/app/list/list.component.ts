import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RecordsService } from '../records.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Pipe, PipeTransform } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private rservice: RecordsService, public dialog: MatDialog, private aroute: ActivatedRoute, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.rservice.getinfo().subscribe({
      next: data => {
        this.infoReceived = data;
        this.dataSource = new MatTableDataSource(this.infoReceived);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.shwlist = true;
      },
      error: (err) => {
        console.log(err);
        console.error(err)
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dcolumns: string[] = ['id', 'fname', 'lname', 'email', 'phonenumber', 'dob', 'gender', 'city', 'state', 'country', 'pincode', 'education', 'edit', 'delete'];
  infoReceived: any;
  shwlist = false;
  dataSource: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAdd() {
    this.router.navigate(['/add']);
  }

  onDelete(value: any) {
    const dialogRef = this.dialog.open(Dialog, {
      height: '300px',
      width: '400px',
      data: value,
    });
    dialogRef.afterClosed().subscribe((res) => {})
  }

  logout() {
    this.rservice.logout();
  }

}


@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
export class Dialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<Dialog>, private router: Router, private rservice: RecordsService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onOk(value: any) {
    this.dialogRef.close({ value });
    this.rservice.deleteInfo(value).subscribe({
      next: res => {
        location.reload();
        this.snackbar.open("Successfully Deleted", "close", {duration: 50});
      },
      error: (err) => {
        this.snackbar.open("Not Deleted", "close", {duration: 50});
        console.error(err)
      }
    });
  }
}

@Pipe({
  name: 'FilterData'
})
export class Search implements PipeTransform {
  constructor(private rservice: RecordsService) { }
  infoReceived: any;
  transform(value: string): string {
    this.rservice.getinfo().subscribe({
      next: res=>{
        this.infoReceived = res.filter( (element: { id: string; }) => element.id === value );
      }
    });
    return this.infoReceived;
  }
}