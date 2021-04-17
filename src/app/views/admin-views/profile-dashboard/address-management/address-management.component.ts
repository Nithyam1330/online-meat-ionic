import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LOCAL_STORAGE_ENUMS } from 'src/app/shared/constants/local-storage.enums';
import { LoaderService } from 'src/app/shared/services/common/loader/loader.service';
import { StorageService } from 'src/app/shared/services/common/storage/storage.service';
import { ToasterService } from 'src/app/shared/services/common/toaster/toaster.service';
import { CommonRequestService } from 'src/app/shared/services/http/common-request.service';
import { RequestEnums } from '../../../../shared/constants/request-enums';
import Utils from '../../../../shared/services/common/utils';

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.scss'],
})
export class AddressManagementComponent implements OnInit {
  addressList = [];
  constructor(
    private router: Router,
    private commonRequestService: CommonRequestService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getAllAddress();
  }

  public navigateToAddAddress() {
    this.router.navigate(['profile-dashboard', 'address-management', 'add-address']);
  }

  public async openAddressOptions(addressInfo) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.confirmDelete(addressInfo);
        }
      }, {
        text: 'Edit',
        icon: 'Pencil',
        handler: () => {
          this.router.navigate(['profile-dashboard', 'address-management', addressInfo.address_id])
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
    console.log('onDidDismiss resolved with role', role);
  }


  private async confirmDelete(addressInfo) {
    const alertRef = this.alertController.create({
      backdropDismiss: false,
      header: 'Confrimation',
      keyboardClose: false,
      message: 'Are you Sure ? Do you want to remove this Address ? Once You remove it can not be reverted back.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAddress(addressInfo);
          }
        }
      ]
    });
    (await alertRef).present();

  }

  private async deleteAddress(address) {
    console.log(address);
    RequestEnums.DELETE_ADDRESS_BY_ADDRESS_ID.values = [
      this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID),
      address.address_id
    ]
    this.commonRequestService.request(RequestEnums.DELETE_ADDRESS_BY_ADDRESS_ID).subscribe(res => {
      if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
        this.toasterService.presentToast({
          message: res.message,
          color: 'danger'
        });
      } else {
        this.toasterService.presentToast({
          message: 'Address deleted successfully.',
          color: 'success'
        });
        this.addressList = res.data;
      }
    }) 
  }

  /**
   * Get all the user addresses
   */
  private async getAllAddress() {
    await this.loaderService.showLoader();
    RequestEnums.GET_ALL_ADDRESS.values = [
      this.storageService.getLocalStorageItem(LOCAL_STORAGE_ENUMS.ID)
    ]
    this.commonRequestService
      .request(RequestEnums.GET_ALL_ADDRESS)
      .subscribe(async (res) => {
        await this.loaderService.dissmissLoading();

        if (Utils.isValidInput(res.errorType) || res.statusCode !== 200) {
          this.toasterService.presentToast({
            message: res.message,
            color: 'danger'
          });
        } else {
          this.addressList = res.data;
        }
  }, async error => {
    this.toasterService.presentToast({
      message: error.message,
      color: 'danger'
    });
  })
}
}
