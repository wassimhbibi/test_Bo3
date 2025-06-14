import { Component, OnInit } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { Router, RouterLink } from '@angular/router';
import { ContactComponent } from '../../common/contact/contact.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-courses-page',
    standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, ContactComponent, FooterComponent, BackToTopComponent,CommonModule,NgxPaginationModule],
    templateUrl: './courses-page.component.html',
    styleUrl: './courses-page.component.scss'
})

export class CoursesPageComponent implements OnInit {
  p1: number = 1; 
  p2: number = 1; 
    constructor(private service : ServiceService , private router : Router){}

      ngOnInit(): void {
   
         this.getExpert();
      }


      ExoertList:any;

      getExpert(){

        this.service.GetExpert().subscribe(data=>{
            this.ExoertList = data;
            console.log(this.ExoertList)
        })
      }


DeleteData(val:any) {
    
    Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pourrez pas annuler cela !",
   showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
   confirmButtonText: 'Oui, supprimez-le !'
  }).then((result) => {
    if (result.value) {
     this.service.DeleteExpert(val).subscribe(data=>{
      this.getExpert();
      });
      this.service.GetExpert().subscribe((data)=>{
       this.ExoertList=data;
     })
      Swal.fire(
       'Supprimé !',
      'Votre fichier a été supprimé.',
        'success'
      )
   }
  })
   
 }

  updateData(id: any): void {
    
    const selectedUser = this.ExoertList.find((d:any) => d.Id === id);
    if (selectedUser) {
      this.service.usersData = selectedUser;
      this.router.navigate(['/add-expert']);
    }
  }

}