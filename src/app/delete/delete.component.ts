import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { site } from '../home/home.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// export interface site {
//   siteId: number;
//   site_Name: string;
//   client: string;
//   site_Contact: number;
//   site_Description: string;
//   product: string;
//   subscription: string;
//   site_Location: string;
// }

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  siteData: site[] = [];

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.siteData = JSON.parse(localStorage.getItem('siteList') || '{}');
  }

  deleteRow() {
    let index = this.data;
    this.siteData.splice(index, 1);
    localStorage.setItem("siteList", JSON.stringify(this.siteData));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    this._snackBar.open('Data deleted successfully', 'OK', {
      duration: 3000,
    });
  }
}
