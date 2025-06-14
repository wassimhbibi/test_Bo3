import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ServiceService } from '../../service.service';


@Component({
    selector: 'app-feedback',
    standalone: true,
    imports: [RouterLink, CarouselModule, NgIf, NgClass, NgMultiSelectDropDownModule,FormsModule,CommonModule],
    templateUrl: './feedback.component.html',
    styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {

	constructor (
        public router: Router,
        public service : ServiceService
    ) {this.getDomaine_dexpertise(),this.getCertifications_clés(),this.getFormation_principale(),this.getAnnées_dexpérience()}


    step:any=1;

    next(){

      if(this.step<4){
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
      ...this.Domainedexpertise,
      ...this.Certifications,
      ...this.Formationprincipale,
      `experience_${this.selectedItem}`
    ].join(' ');

    console.log('finaldata:', this.finaldata);
    debugger
    this.matchCandidates();
    this.step++;

  }


topExpert: any[] = [];
loading: boolean = false;

matchCandidates() {
  this.loading = true; // Show loader

  this.service.sendCandidatDATA(this.finaldata).subscribe(result => {
    this.matchingCandidates = result;
    console.log('Matching candidates:', this.matchingCandidates);

    const scoreMap = new Map<number, number>();
    this.matchingCandidates.forEach((expert: any) => {
      scoreMap.set(expert.Id, expert.Score);
    });

    const expertsTop3 = this.matchingCandidates.map((expert: any) => expert.Id);
    console.log('IDs of top experts:', expertsTop3);

    this.service.GetExpert().subscribe(data => {
      this.topExpert = data
        .filter((d: any) => expertsTop3.includes(d.Id))
        .map((expert: any) => ({
          ...expert,
          Score: scoreMap.get(expert.Id)
        }));

      this.topExpert.sort((a, b) => b.Score - a.Score);
      console.log('Top Expert Details (with Scores):', this.topExpert);
      
      this.loading = false;
    });
  });
}





// Domaine_dexpertise dropdown

Domainedexpertise = new Set();
onItemSelect1(item: any) {

this.Domainedexpertise.add(item); 
}

onItemDeSelect1(item: any) {
  
  this.Domainedexpertise.delete(item);
}

onSelectAll1(items: any) {
  // Using Set to ensure uniqueness
  this.Domainedexpertise = new Set(items);
}

onDeSelectAll1() {
  // Clear all selections
  this.Domainedexpertise.clear();
}




// Certifications_cles dropdown

Certifications = new Set();
onItemSelect2(item: any) {

this.Certifications.add(item); 
}

onItemDeSelect2(item: any) {
  
  this.Certifications.delete(item);
}

onSelectAll2(items: any) {
  // Using Set to ensure uniqueness
  this.Certifications = new Set(items);
}

onDeSelectAll2() {
  // Clear all selections
  this.Certifications.clear();
}




// Formation dropdown

Formationprincipale = new Set();
onItemSelect3(item: any) {

this.Formationprincipale.add(item); 
}

onItemDeSelect3(item: any) {
  
  this.Formationprincipale.delete(item);
}

onSelectAll3(items: any) {
  // Using Set to ensure uniqueness
  this.Formationprincipale = new Set(items);
}

onDeSelectAll3() {
  // Clear all selections
  this.Formationprincipale.clear();
}



Domaine_dexpertise:any;
Annees_dexperience:any;
Certifications_cles:any;
Formation_principale:any;


getCertifications_clés() {
  this.service.GetExpert().subscribe(data => {
    const certifications = data.flatMap((expert: any) => {
      const cert = expert?.Certifications_clés?.trim();
      return cert ? this.smartSplit(cert) : [];
    });

    this.Certifications_cles = Array.from(new Set(certifications));
    console.log('Certifications_clés:', this.Certifications_cles);
  });
}

getDomaine_dexpertise() {
  this.service.GetExpert().subscribe(data => {
    const domaines = data.flatMap((expert: any) => {
      const domaine = expert?.Domaine_dexpertise?.trim();
      return domaine ? this.smartSplit(domaine) : [];
    });

    this.Domaine_dexpertise = Array.from(new Set(domaines));
    console.log("Domaines d'expertise séparés:", this.Domaine_dexpertise);
  });
}


getFormation_principale() {
  this.service.GetExpert().subscribe(data => {
    const formations = data.flatMap((expert: any) => {
      const formation = expert?.Formation_principale?.trim();
      return formation ? this.smartSplit(formation) : [];
    });

    this.Formation_principale = Array.from(new Set(formations));
    console.log("Formation principale séparés:", this.Formation_principale);
  });
}
getAnnées_dexpérience() {
  this.service.GetExpert().subscribe(data => {
    const annees = data
      .map((expert: any) => expert?.Années_dexpérience?.trim())
      .filter((a: string) => !!a);

    this.Annees_dexperience = Array.from(new Set(annees));
    console.log("Années d'expérience:", this.Annees_dexperience);
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


SelectSettings = {
  singleSelection: true,      
  idField: 'item_id',
  textField: 'item_text',
  allowSearchFilter: true,
  closeDropDownOnSelection: true,
  itemsShowLimit: 1

};
selectedItem = null;

}