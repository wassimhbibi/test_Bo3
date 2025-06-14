import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brevet-list',
  standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, BackToTopComponent,CommonModule,NgxPaginationModule],
  templateUrl: './brevet-list.component.html',
  styleUrl: './brevet-list.component.scss'
})
export class BrevetListComponent {

 p1: number = 1; 
  p2: number = 1; 

    constructor(private service : ServiceService , private router : Router){}

      ngOnInit(): void {
   
         this.getBrevet();
      }


      BrevetList:any;

      getBrevet(){

        this.service.GetBrevet().subscribe(data=>{
            this.BrevetList = data;
            console.log(this.BrevetList)
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
     this.service.DeleteBrevet(val).subscribe(data=>{
      this.getBrevet();
      });
      this.service.GetBrevet().subscribe((data)=>{
       this.BrevetList=data;
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
    
    const selectedUser = this.BrevetList.find((d:any) => d.ID === id);
    if (selectedUser) {
      this.service.usersData = selectedUser;
      this.router.navigate(['/ajouter-brevet']);
    }
  }

}