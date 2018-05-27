// angular modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
// package modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { ColorPickerModule } from 'ngx-color-picker'
import { PapaParseModule } from 'ngx-papaparse'
// local modules
import { MaterialModule } from './material.module'
// components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { MailingListDialogComponent } from './mailing-list-dialog/mailing-list-dialog.component'
import { ViewListDialogComponent } from '#app/shared/view-list-dialog/view-list-dialog.component'
import { ContextMenuModule } from 'ngx-contextmenu'
import { ColorsComponent } from '#app/shared/colors/colors.component'

const modules = [
  CommonModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgbModule,
  ColorPickerModule,
  PapaParseModule,
  MaterialModule,
  ContextMenuModule
]

const components = [
  BreadcrumbsComponent, 
  SidenavComponent, 
  ColorsComponent
]

@NgModule({
  imports: modules,
  declarations: components,
  exports: [...modules, ...components]
})
export class SharedModule {}
