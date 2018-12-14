import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FilterArrayPipe } from './product/filter.pipe';
import { FormsModule } from '@angular/forms';

import { ContactUsService } from './contact-us.service';
import { ProductService } from './product/product.service';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { RouteHelpComponent } from './route-help.component';
import { AppRoutingModule, routableComponents } from './app.routing.module';
import { ContactUsComponent } from './contact-us.component';
import { CheckOutComponent } from './check-out.component';
import { RouteHelpCSRComponent } from './route-help-csr.component';
import { Issue, RouteHelpCSRService } from './route-help-csr.service';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    FilterArrayPipe,
    ContactUsComponent,
    CheckOutComponent,
    RouteHelpCSRComponent,
    RouteHelpComponent,
    LoginComponent,
    OrderComponent,
    OrderHistoryComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutingModule
  ],
  providers: [ContactUsService,ProductService,RouteHelpCSRService],
  bootstrap: [AppComponent]
})
export class AppModule { }