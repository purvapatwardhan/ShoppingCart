import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ContactUsComponent } from './contact-us.component';
import { CheckOutComponent } from './check-out.component';
import { RouteHelpComponent } from './route-help.component';
import { RouteHelpCSRComponent } from './route-help-csr.component';
import { OrderHistoryComponent } from './order-history.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'helpUser', component: RouteHelpComponent },
  { path: 'helpCSR', component: RouteHelpCSRComponent },
  { path: 'products', component: ProductComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routableComponents = [
  ProductComponent,
  RouteHelpComponent, 
  PageNotFoundComponent,
  CheckOutComponent,
  RouteHelpCSRComponent
];

