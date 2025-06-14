import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
userRole:any;

    constructor (
        public router: Router, public service : ServiceService
    ) {

        this.userRole = sessionStorage.getItem('role')
    }

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }
    // Menu Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
}

}