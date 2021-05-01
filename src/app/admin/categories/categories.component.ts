import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../shared/constants/request-enums';
import Utils from '../../shared/services/common/utils';

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
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getAllcategories();
  }

  public navigateToAddCategories() {
    this.router.navigate(['admin', 'categories', 'add']);
  }

  public async openActions(category) {
    const actionSheet = await this.actionSheetController.create({
      header: `${category.name}`,
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            // navigate to edit page
            this.router.navigate(['admin', 'categories', category.categoryKey]);

          }
        }, {
          text: `${category.status}`,
          icon: 'ellipse',
          cssClass: `${category.status === 'ACTIVE' ? 'green-color' : 'red-color'}`,
          handler: () => {
            this.activeOrInActiveConfirmationPopup(category);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
  }

  private async activeOrInActiveConfirmationPopup(category) {
    const alert = await this.alertController.create({
      header: 'Delete Confimation !',
      message: `Are you sure, You want to ${category.status} ${category.name} Category ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: `${category.status === 'ACTIVE' ? 'Inactive' : 'Active'}`,
          handler: () => {
            // console.log('Confirm Okay');
            // Active in active api call
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
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
      )
  }
}
