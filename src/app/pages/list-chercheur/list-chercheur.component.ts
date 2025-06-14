import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';
import { Router, RouterLink } from '@angular/router';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-chercheur',
  standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, BackToTopComponent ,CommonModule,NgxPaginationModule],
  templateUrl: './list-chercheur.component.html',
  styleUrl: './list-chercheur.component.scss'
})
export class ListChercheurComponent implements OnInit {
 constructor(private service : ServiceService , private router : Router){}
  p1: number = 1; 
  p2: number = 1; 
      ngOnInit(): void {
   
         this.geChercheur();
      }


      ChercheurList:any;

      geChercheur(){

        this.service.GetChercheur().subscribe(data=>{
            this.ChercheurList = data;
            console.log(this.ChercheurList)
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
     this.service.DeleteChercheur(val).subscribe(data=>{
      this.geChercheur();
      });
      this.service.GetChercheur().subscribe((data)=>{
       this.ChercheurList=data;
     })
      Swal.fire(
       'Supprimé !',
      'le Chercheur a été supprimé.',
        'success'
      )
   }
  })
   
 }

  updateData(id: any): void {
    
    const selectedUser = this.ChercheurList.find((d:any) => d.id === id);
    if (selectedUser) {
      this.service.usersData = selectedUser;
      this.router.navigate(['/ajouter-chercheur']);
    }
  }
}
