import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }