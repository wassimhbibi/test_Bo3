import { Routes } from '@angular/router';
import { HomeDemoOneComponent } from './demos/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './demos/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './demos/home-demo-three/home-demo-three.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseDetailsPageComponent } from './pages/course-details-page/course-details-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamDetailsPageComponent } from './pages/team-details-page/team-details-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './pages/blog-details-page/blog-details-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './pages/terms-conditions-page/terms-conditions-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AddChercheurComponent } from './pages/add-chercheur/add-chercheur.component';
import { ListChercheurComponent } from './pages/list-chercheur/list-chercheur.component';
import { MatchChercheurComponent } from './pages/match-chercheur/match-chercheur.component';
import { AddBrevetComponent } from './pages/add-brevet/add-brevet.component';
import { BrevetListComponent } from './pages/brevet-list/brevet-list.component';
import { BrevetComponent } from './pages/brevet/brevet.component';

export const routes: Routes = [
    {path: '', component: HomeDemoOneComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'index-3', component: HomeDemoThreeComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'expert-list', component: CoursesPageComponent},
    {path: 'add-expert', component: CourseDetailsPageComponent},
    {path: 'team', component: TeamPageComponent},
    {path: 'team-details', component: TeamDetailsPageComponent},
    {path: 'match-expert', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path:'forget-password' , component:ForgetPasswordComponent},
    {path:'reset-password', component:ResetPasswordComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'ajouter-chercheur' , component:AddChercheurComponent},
    {path:'chercheur-list' , component:ListChercheurComponent},
    {path:'match-chercheur' , component:MatchChercheurComponent},
    {path:'brevet-list' , component:BrevetListComponent},
    {path:'ajouter-brevet' , component:AddBrevetComponent},
    {path: 'brevet' , component:BrevetComponent},

    // Here add new pages component

    {path: '**', component: ErrorPageComponent} // This line will remain down from the whole pages component list
];