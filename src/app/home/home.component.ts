import { Component, OnInit } from '@angular/core';
import siteList from "../site_list.json";
import { NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'
import { DeleteComponent } from '../delete/delete.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface site {
  siteId: number;
  site_Name: string;
  client: string;
  site_Contact: number;
  site_Description: string;
  product: string;
  subscription: string;
  site_Location: string;
  [x: string]: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  siteData: site[] = [];
  searchText: any;
  dataSource = new MatTableDataSource(this.siteData);
  sortDir = 1;
  route: any;

  constructor(private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // localStorage.setItem("siteList", JSON.stringify(siteList));
    this.siteData = JSON.parse(localStorage.getItem('siteList') || '{}');
  }

  view(enterAnimationDuration: string, exitAnimationDuration: string, rowData: any): void {

    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: rowData
    });
  }

  edit(rowData: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: { formMode: 'edit' },
      state: rowData
    };
    this.router.navigateByUrl('/edit', navigationExtras);
  }

  delete(enterAnimationDuration: string, exitAnimationDuration: string, index: any): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: index
    });
  }

  logout() {
    this._snackBar.open('LogOut Successfully', 'OK', {
      duration: 3000,
    });
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log(charCode);
      return false;
    }
    return true;
  }

  onSortClickSite(event: any) {
    console.log(event);
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr('site_Name');
  }

  onSortClickClient(event: any) {
    console.log(event);
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr('client');
  }

  sortArr(colName: any) {
    this.sortDir = this.sortDir == 1 ? -1 : 1;
    this.siteData.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a['localeCompare'](b) * this.sortDir;
    });
  }
}
