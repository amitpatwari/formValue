import siteList from '../site_list.json';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// export interface DialogData {
//   product: string;
//   subscription: string;
// }

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // siteData: DialogData[] = [];
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // this.siteData = JSON.parse(localStorage.getItem('siteList') || '{}');
    // console.log('mat data', this.data);
  }
}

