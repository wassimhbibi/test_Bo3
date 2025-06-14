import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { PageBannerComponent } from './page-banner/page-banner.component';

@Component({
  selector: 'app-match-chercheur',
  standalone: true,
    imports: [RouterLink, CarouselModule, NgIf, NgClass, NgMultiSelectDropDownModule,FormsModule,CommonModule,NavbarComponent, PageBannerComponent],
  templateUrl: './match-chercheur.component.html',
  styleUrl: './match-chercheur.component.scss'
})

export class MatchChercheurComponent {

    constructor (
          public router: Router,
          public service : ServiceService
      ) {this.getFonction(),this.getSpecialite(),this.get_Mots_cles(),this.getCompetences(),this.getExpertise()}
  
  
      step:any=1;
  
      next(){
  
        if(this.step<6){
          this.step++
        }
      }
  
      back(){   
          this.step--;                                               
      }
  
  matchingCandidates: any[] = [];
      finaldata:any;
  
   getFullData() {
      this.finaldata = [
        ...this.fonction_,
        ...this.specialite_,
        ...this.Mots_cles_,
        ...this.Competences_,
        ...this.Expertises_
        
      ].join(' ');
  debugger
      console.log('finaldata:', this.finaldata);
      debugger
      this.matchCandidates();
      this.step++;
  
    }
  
  
  topChercheur: any[] = [];
  loading: boolean = false;
  
  matchCandidates() {
    this.loading = true; // Show loader
  
    this.service.MatchChercheur(this.finaldata).subscribe(result => {
      this.matchingCandidates = result;
      console.log('Matching candidates:', this.matchingCandidates);
  
      const scoreMap = new Map<number, number>();
      this.matchingCandidates.forEach((chercheur: any) => {
        scoreMap.set(chercheur.Id, chercheur.Score);
      });
  
      const chercheurTop3 = this.matchingCandidates.map((chercheur: any) => chercheur.Id);
      console.log('IDs of top chercheur:', chercheurTop3);
  
      this.service.GetChercheur().subscribe(data => {
        this.topChercheur = data
          .filter((d: any) => chercheurTop3.includes(d.id))
          .map((chercheur: any) => ({
            ...chercheur,
            Score: scoreMap.get(chercheur.id)
          }));
  
        this.topChercheur.sort((a, b) => b.Score - a.Score);
        console.log('Top Chercheur Details (with Scores):', this.topChercheur);
        
        this.loading = false
      });
    });
  }
  
  
  
  
  
  // fonction dropdown
  
  fonction_ = new Set();
  onItemSelect1(item: any) {
  
  this.fonction_.add(item); 

  }
  
  onItemDeSelect1(item: any) {
    
    this.fonction_.delete(item);
  }
  
  onSelectAll1(items: any) {
    // Using Set to ensure uniqueness
    this.fonction_ = new Set(items);
  }
  
  onDeSelectAll1() {
    // Clear all selections
    this.fonction_.clear();
  }
  
  
  
  
  // specialite dropdown
  
  specialite_ = new Set();
  onItemSelect2(item: any) {
  
  this.specialite_.add(item); 
  }
  
  onItemDeSelect2(item: any) {
    
    this.specialite_.delete(item);
  }
  
  onSelectAll2(items: any) {
    // Using Set to ensure uniqueness
    this.specialite_ = new Set(items);
  }
  
  onDeSelectAll2() {
    // Clear all selections
    this.specialite_.clear();
  }
  
  
  
  
  // Mots cles dropdown
  
  Mots_cles_ = new Set();
  onItemSelect3(item: any) {
  
  this.Mots_cles_.add(item); 
  }
  
  onItemDeSelect3(item: any) {
    
    this.Mots_cles_.delete(item);
  }
  
  onSelectAll3(items: any) {
    // Using Set to ensure uniqueness
    this.Mots_cles_ = new Set(items);
  }
  
  onDeSelectAll3() {
    // Clear all selections
    this.Mots_cles_.clear();
  }







   // Competences dropdown
  
  Competences_ = new Set();
  onItemSelect4(item: any) {
  
  this.Competences_.add(item); 
  }
  
  onItemDeSelect4(item: any) {
    
    this.Competences_.delete(item);
  }
  
  onSelectAll4(items: any) {
    // Using Set to ensure uniqueness
    this.Competences_ = new Set(items);
  }
  
  onDeSelectAll4() {
    // Clear all selections
    this.Competences_.clear();
  }



   // Expertises dropdown
  
  Expertises_ = new Set();
  onItemSelect5(item: any) {
  
  this.Expertises_.add(item); 
  }
  
  onItemDeSelect5(item: any) {
    
    this.Expertises_.delete(item);
  }
  
  onSelectAll5(items: any) {
    // Using Set to ensure uniqueness
    this.Expertises_ = new Set(items);
  }
  
  onDeSelectAll5() {
    // Clear all selections
    this.Expertises_.clear();
  }
  
  
  
  fonction:any;
  specialite:any;
  Mots_cles:any;
  Competences:any;
  Expertises:any;
  
  
  getFonction() {
    this.service.GetChercheur().subscribe(data => {
      const fonction = data.flatMap((chercheur: any) => {
        const ch = chercheur?.fonction?.trim();
        return ch ? this.smartSplit(ch) : [];
      });
  
      this.fonction = Array.from(new Set(fonction));
      console.log('fonction:', this.fonction);
    });
  }
  
  getSpecialite() {
    this.service.GetChercheur().subscribe(data => {
      const specialites = data.flatMap((chercheur: any) => {
        const specialite = chercheur?.specialite?.trim();
        return specialite ? this.smartSplit(specialite) : [];
      });
  
      this.specialite = Array.from(new Set(specialites));
      console.log("specialité:", this.specialite);
    });
  }
  
  
  get_Mots_cles() {
    this.service.GetChercheur().subscribe(data => {
      const Mots_cles = data.flatMap((chercheur: any) => {
        const mot = chercheur?.Mots_cles?.trim();
        return mot ? this.smartSplit(mot) : [];
      });
  
      this.Mots_cles = Array.from(new Set(Mots_cles));
      console.log("Mots_cles:", this.Mots_cles);
    });
  }


   getCompetences() {
    this.service.GetChercheur().subscribe(data => {
      const Competences = data.flatMap((chercheur: any) => {
        const Com = chercheur?.Competences?.trim();
        return Com ? this.smartSplit(Com) : [];
      });
  
      this.Competences = Array.from(new Set(Competences));
      console.log("Competences:", this.Competences);
    });
  }



  getExpertise() {
    this.service.GetChercheur().subscribe(data => {
      const Expertises = data.flatMap((chercheur: any) => {
        const exp = chercheur?.Expertise?.trim();
        return exp ? this.smartSplit(exp) : [];
      });
  
      this.Expertises = Array.from(new Set(Expertises));
      console.log("Expertises:", this.Expertises);
    });
  }




  
  
  smartSplit(input: string): string[] {
      const result: string[] = [];
      let current = '';
      let parenLevel = 0;
  
      for (let i = 0; i < input.length; i++) {
        const char = input[i];
  
        if (char === '(') parenLevel++;
        if (char === ')') parenLevel--;
  
        if (char === ',' && parenLevel === 0) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
  
      if (current) result.push(current.trim());
      return result;
    }
  
  
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    allowSearchFilter: true
  
  };
  
   dropdownSignleSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    allowSearchFilter: true
  
  };
  
  
}
