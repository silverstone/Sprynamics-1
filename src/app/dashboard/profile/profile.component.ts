import { StorageService } from '#core/storage.service';
import {
  BrandColorChangeEvent,
  DEFAULT_BRAND_COLORS
} from '#models/brand-colors.model';
import { User } from '#models/user.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '#core/auth.service';
import { FirestoreService } from '#core/firestore.service';
import { CropDialog } from '#app/shared/crop-dialog/crop.dialog';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input('agent') agent: any

  userRef: Observable<User>
  user: any;
  userSub: Subscription;
  userForm: FormGroup;
  file: any;
  blob:any;


  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private storage: StorageService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.agent) {
      this.userSub = this.firestore
        .doc$<User>(`users/${this.agent.uid}`)
        .subscribe(user => {
          this.user = user
          if (!user.brandColors) {
            this.initBrandColors(user)
          }
          if (!this.userForm) {
            this.buildForm()
          }
        })
    } else {
      this.userSub = this.auth.user.subscribe(user => {
        this.user = user;
        this.uploadLinkedinAvtar(this.user.avatarUrl);
        if (!user.brandColors) {
          this.initBrandColors(user)
        }
        if (!this.userForm) {
          this.buildForm()
        }
      })
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe()
    }
  }

  initBrandColors(user) {
    this.firestore.update(`users/${user.uid}`, {
      brandColors: DEFAULT_BRAND_COLORS
    })
  }

  buildForm() {
    this.userForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.email],
      phoneNumber: [this.user.phoneNumber],
      company: [this.user.company],
      website: [this.user.website],
      address1: [this.user.address1],
      address2: [this.user.address2],
      city: [this.user.city],
      state: [this.user.state],
      zipCode: [this.user.zipCode],
      country: [this.user.country],
      licenseId: [this.user.licenseId, Validators.required]
    })
  }

  saveForm() {
    this.firestore.update(`users/${this.user.uid}`, this.userForm.value)
    window.alert('Your changes have been saved.')
  }

  addColor() {
    if (!this.user.brandColors) {
      this.user.brandColors = []
    }
    this.user.brandColors.push('#ffffffff')
    this.saveColors()
  }

  setColor(event: BrandColorChangeEvent) {
    this.user.brandColors[event.role] = event.color
  }

  saveColors() {
    this.firestore.update(`users/${this.user.uid}`, {
      brandColors: this.user.brandColors
    })
  }

  uploadAvatar(file: File) {
    const extension = file.name.split('.').pop()
    const path = `avatars/${this.user.uid}.${extension}`
    this.storage
      .putFile(file, path)
      .then()
      .then(_ => {
        this.storage.getDownloadURL(path).subscribe(url => {
          this.firestore.update(`users/${this.user.uid}`, { avatarUrl: url })
        })
      })
  }

  uploadLinkedinAvtar(path) {
    const request = new XMLHttpRequest();
    const array = [];
    request.open('GET', path, true);
    request.responseType = 'blob';
    request.onload = () => {
      const reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload =  (e: any) => {
        const target = e.target;
        const dataURI = target.result;
        const binary = atob(dataURI.split(',')[1]);
        for ( let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        this.blob = new Blob( [new Uint8Array(array)], {type: 'image/jpeg'});
        this.file = new File([this.blob], 'abc', {type: 'image/jpeg', lastModified: Date.now()});
        const imgPath = `avatars/${this.user.uid}.jpeg`
        this.storage.putFile(this.file, imgPath);
      };
    };
    request.send();
  }

  uploadCompany(file: File) {
    const extension = file.name.split('.').pop()
    const path = `companyLogos/${this.user.uid}.${extension}`
    this.storage
      .putFile(file, path)
      .then()
      .then(_ => {
        this.storage.getDownloadURL(path).subscribe(url => {
          this.firestore.update(`users/${this.user.uid}`, {
            companyLogoUrl: url
          })
        })
      })
  }

  uploadBrokerage(file: File) {
    const extension = file.name.split('.').pop()
    const path = `brokerageLogos/${this.user.uid}.${extension}`
    this.storage
      .putFile(file, path)
      .then()
      .then(_ => {
        this.storage.getDownloadURL(path).subscribe(url => {
          this.firestore.update(`users/${this.user.uid}`, {
            brokerageLogoUrl: url
          })
        })
      })
  }

  openDialog(dataURL, imageType) {
    const dialogRef = this.dialog.open(CropDialog, {
      data: {
        url: dataURL,
        width: 192,
        height: 192
      }
    });
    dialogRef
      .afterClosed()
      .take(1)
      .subscribe(data => {
        if (data) {
          const arr = [];
          const binary = atob(data.split(',')[1]);
          for ( let i = 0; i < binary.length; i++) {
            arr.push(binary.charCodeAt(i));
          }
          const blob = new Blob( [new Uint8Array(arr)], {type: 'image/jpg'});
          const file = new File([blob], 'temp.jpg', {type: 'image/jpg', lastModified: Date.now()});
          if (imageType === 'profile') {
            this.uploadAvatar(file);
          } else if (imageType === 'companyLogo') {
            this.uploadCompany(file);
          } else if (imageType === 'brokerageLogo') {
            this.uploadBrokerage(file);
          }
        }
      })
  }
}
