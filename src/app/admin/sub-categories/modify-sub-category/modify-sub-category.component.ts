import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { STATUS } from 'src/app/shared/constants/app-properties';

@Component({
  selector: 'app-modify-sub-category',
  templateUrl: './modify-sub-category.component.html',
  styleUrls: ['./modify-sub-category.component.scss'],
})
export class ModifySubCategoryComponent implements OnInit {

  subCategoryKey: any;
  subCategoryForm: FormGroup;
  STATUS = STATUS;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.subCategoryForm = this.formBuilder.group({
      name: [''],
      status: [''],
      categoryKey: ['']      
    });
  }

  public createSubCategory() {

  }

  public cancel() {

  }
}
