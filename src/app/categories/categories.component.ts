import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../shared/constants/request-enums';
import Utils from '../shared/services/common/utils';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories = [];
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.getAllcategories();
  }

  public navigateToAddCategories() {
    this.router.navigate(['admin', 'categories', 'add-category']);
  }

  getAllcategories() {
    this.commonRequestService
      .request(RequestEnums.GET_ALL_CATEGORY)
      .subscribe(res => {
        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.categories = res.data;
        }
      }, 
      ) }
}
