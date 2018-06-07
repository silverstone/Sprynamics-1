import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SharedModule } from '#app/shared/shared.module'

import { DesignerAdminComponent } from './admin/designer-admin.component'
import { DesignerClientComponent } from './client/designer-client.component'
import { AgentsComponent } from './sidebar/agents/agents.component'
import { DesignsComponent } from './sidebar/designs/designs.component'
import { PropertyComponent } from './sidebar/property/property.component'
import { TextComponent } from './sidebar/text/text.component'

import { AlignmentService } from './admin/alignment.service'
import { ObjectFactoryService } from './object-factory.service'
import { ImageSelectDialog } from './image-select-dialog/image-select.dialog'
import { AdminDesignerProgressDialog } from './admin/admin-designer-progress-dialog/admin-designer-progress.dialog'
import { DesignerDevComponent } from './dev/designer-dev.component'
import { ProductsComponent } from './sidebar/products/products.component'
import { DesignerViewComponent } from '#app/designer/view/designer-view.component'
import { FabricCanvasComponent } from '#app/designer/fabric-canvas.component'
import { SidebarTabComponent } from '#app/designer/view/sidebar-tab.component'
import { CheckoutComponent } from '#app/checkout/checkout.component'

const routes: Routes = [
  {
    path: '',
    component: DesignerDevComponent,
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
        loadChildren: '../checkout/checkout.module#CheckoutModule'
      }
    ]
  },
  { path: 'admin', component: DesignerAdminComponent },
  { path: 'old', component: DesignerClientComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [
    DesignerAdminComponent,
    DesignerClientComponent,
    AgentsComponent,
    DesignsComponent,
    PropertyComponent,
    TextComponent,
    ImageSelectDialog,
    AdminDesignerProgressDialog,
    DesignerDevComponent,
    ProductsComponent,
    DesignerViewComponent,
    FabricCanvasComponent,
    SidebarTabComponent
  ],
  entryComponents: [ImageSelectDialog, AdminDesignerProgressDialog],
  providers: [AlignmentService, ObjectFactoryService]
})
export class DesignerModule {}
