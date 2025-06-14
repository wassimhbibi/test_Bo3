import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-brevet',
  standalone: true,
    imports: [RouterLink, CarouselModule, NgIf, NgClass, NgMultiSelectDropDownModule,FormsModule,CommonModule,NavbarComponent, PageBannerComponent],
  templateUrl: './brevet.component.html',
  styleUrl: './brevet.component.scss'
})

export class BrevetComponent {


constructor (public router: Router , public service : ServiceService) {
this.getBrevet();
}
  
  

step:any=1;

  
  // fonction dropdown
  
  brevet = new Set();
onItemSelect(item: any) {
  
  this.brevet.add(item); 

}
  
  onItemDeSelect(item: any) {
   
    this.brevet.delete(item);
  }
  
  onSelectAll(items: any) {
    // Using Set to ensure uniqueness
    this.brevet = new Set(items);

  }
  
  onDeSelectAll() {
    // Clear all selections
    this.brevet.clear();
  }

listBrevet:any;

 getBrevet() {

  this.service.GetBrevet().subscribe(data => {
    const brevet = data
      .map((brevet: any) => brevet?.Titre)

    this.listBrevet = Array.from(new Set(brevet));
    console.log("listBrevet:", this.listBrevet);
  });

}
  


   dropdownSignleSettings = {

    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    allowSearchFilter: true
  
  };



 
  
  
}


