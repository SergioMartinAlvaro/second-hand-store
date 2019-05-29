import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from './../../../services/product.service';
import { Category } from 'src/app/models/category';
import { NavController, Platform, ActionSheetController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../../services/auth.service';

const STORAGE_KEY = "my_images";
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  private localStorage: any;
  categories: any;
  images = [];
  userProfile: any;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private camera: Camera,
    private ref: ChangeDetectorRef,
    private plt: Platform,
    private actionSheetController: ActionSheetController,
    private file: File,
    private webview: WebView,
    private storage: Storage,
    private _authService: AuthService
  ) {
    this.localStorage = localStorage;
   }

  ngOnInit() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    );

    this._authService.getUserProfile().subscribe(
      data => {
        this.userProfile = data;
      }
    );

    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if(images) {
        let arr = JSON.parse(images);
        this.images = [];
        for(let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({name: img, path: resPath, filePath: filePath});
        }
      }
    })
  }

  pathForImage(img) {
    if(img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(_ => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.alertService.presentToast("Error while storing file.");
    });
  }

  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if(!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges();
    })
  }

  createProduct(form: NgForm) {
    if(form.value.Name && form.value.Description && form.value.Price && form.value.Category) {
        this._productService.createProduct(form.value.Name, form.value.Description, form.value.Price, form.value.Category, this.userProfile.Id)
        .subscribe(data => {
          this.alertService.presentToast("Product created succesfully!");
          form.reset();
        });
    } else {
      this.alertService.presentToast("All fields must be filled, review the formulary.");
    }

  }

  onChange(value) {
    console.log(value);
  }

  dimissCreate() {

  }

}
