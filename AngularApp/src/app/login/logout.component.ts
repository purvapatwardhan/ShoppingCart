import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: `
    <p>
      logout works!
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        sessionStorage.setItem("cart","");
        sessionStorage.setItem("cartTotal","");

        sessionStorage.setItem("user","");
        sessionStorage.setItem("purchaseId","");

        this.router.navigateByUrl('/login');
    }

}
