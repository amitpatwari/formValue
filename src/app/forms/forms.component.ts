import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { site } from '../home/home.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface product {
  value: string;
  viewValue: string;
}
interface subscription {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})


export class FormsComponent implements OnInit {
  form!: FormGroup;
  editData: any;
  siteId: any = '';
  siteData: site[] = [];
  siteInfo: any;
  selectedValue!: string;
  selectedSubscription!: string;
  formMode: any;
  siteListInfo: any;
  updatedFormValue: any;

  products: product[] = [
    { value: 'product-1', viewValue: 'product-1' },
    { value: 'product-2', viewValue: 'product-2' },
    { value: 'product-3', viewValue: 'product-3' },
  ];

  subscriptions: subscription[] = [
    { value: 'subscription-1', viewValue: 'subscription-1' },
    { value: 'subscription-2', viewValue: 'subscription-2' },
    { value: 'subscription-3', viewValue: 'subscription-3' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.editData = this.router.getCurrentNavigation()?.extras.state;
    this.formMode = this.router.getCurrentNavigation()?.extras.queryParams?.['formMode'];
  }

  addSnack() {
    this._snackBar.open('Site Creation added suceesfully', 'OK', {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.siteId = params['siteId'];
    })
    this.form = this.fb.group({
      siteId: [''],
      site_Name: ['', [Validators.required, Validators.minLength(4)]],
      client: ['', [Validators.required, Validators.minLength(4)]],
      site_Contact: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"), Validators.maxLength(10)]],
      site_Description: ['', [Validators.required, Validators.minLength(4)]],
      site_Location: ['', [Validators.required, Validators.minLength(4)]],
      product: ['', [Validators.required]],
      subscription: ['', [Validators.required]]
    });

    if (this.formMode == 'edit') {
      this.onsetdata();
      // this.form.controls['siteId'].disable();
    }
  }
  onSubmit() {
    this.siteListInfo = JSON.parse(localStorage.getItem('siteList') || '{}');
    if (this.formMode == 'edit') {
      this.updatedFormValue = this.form.value;
      let matchedVal = this.siteListInfo.find((val: any) => {
        if (val.siteId === this.form.value.siteId) {
          val.siteId = this.form.value.siteId;
          val.site_Name = this.form.value.site_Name;
          val.client = this.form.value.client;
          val.site_Contact = this.form.value.site_Contact;
          val.site_Location = this.form.value.site_Location;
          val.site_Description = this.form.value.site_Description;
          val.product = this.form.value.product;
          val.subscription = this.form.value.subscription;
        };
      })
      this._snackBar.open('Data edited successfully', 'OK', {
        duration: 3000,
      });
    }
    else {
      let createData = this.form.value;
      this.siteListInfo.push(createData);
    }
    localStorage.setItem('siteList', JSON.stringify(this.siteListInfo))
    this.router.navigate(['/home']);
  }

  onsetdata() {
    this.form.setValue({
      siteId: this.editData.siteId || '',
      site_Name: this.editData.site_Name || '',
      client: this.editData.client || '',
      site_Contact: this.editData.site_Contact || '',
      site_Description: this.editData.site_Description || '',
      site_Location: this.editData.site_Location || '',
      product: this.editData.product || '',
      subscription: this.editData.subscription || '',
    })
  }

  OnlyNumbersAllowed(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}