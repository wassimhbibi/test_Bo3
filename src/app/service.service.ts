import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  readonly APIUrl='http://localhost:7151/api'
usersData:any;
role:any;
  constructor(private router: Router,private _httpClient: HttpClient) { }




  Rech(email: string, password: string) {
 
    const credentials = { email ,password};
    return this._httpClient.post<any>(`http://localhost:7151/api/Account`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  requestPasswordReset(email: string): Observable<any> {
  const requestBody = { email: email };

  return this._httpClient.post(`${this.APIUrl}/ForgetPassword/forgotpassword`, requestBody);
}

  resetPasswordd(token: string, newPassword: string): Observable<any> {
    const resetPasswordData = {
        FoPasModel: { resetToken: token },
        UsersModel: { password: newPassword }
    };
  
  
  
    return this._httpClient.post(`${this.APIUrl}/ForgetPassword/UpdateUserPassword`, resetPasswordData);
  }

GetUsersData():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/Account')
}

 signup(data: any) {
    return this._httpClient.post(`${this.APIUrl}/Account/signup`, data);
  }

  // expert

  GetExpert():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/Expert')
  }

  AddExpert(data: FormData) {
    return this._httpClient.post(`${this.APIUrl}/Expert/Add_Expert`, data);
  }

  UpdateExpert(data: FormData) {
  return this._httpClient.put(`${this.APIUrl}/Expert/Update_Expert`, data);
}


DeleteExpert(id: number) {
  const url = `${this.APIUrl}/Expert/Delete_Expert?id=${id}`;
  return this._httpClient.delete(url);
}



  sendCandidatDATA(profileText: string): Observable<any> {
    return this._httpClient.post<any>(`${this.APIUrl}/Expert/match`, {
      profileText: profileText
    });
  }




 // Chercheur

GetChercheur():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/chercheur')
}

AddChercheur(data: FormData) {
  return this._httpClient.post(`${this.APIUrl}/chercheur/Add_Chercheur`, data);
}

UpdateChercheur(data: FormData) {
  return this._httpClient.put(`${this.APIUrl}/chercheur/Update_chercheur`, data);
}

DeleteChercheur(id: number) {
  const url = `${this.APIUrl}/chercheur/Delete_chercheur?id=${id}`;
  return this._httpClient.delete(url);
}

MatchChercheur(profileText: string): Observable<any> {
    return this._httpClient.post<any>(`${this.APIUrl}/chercheur/match-chercheur`, {
      profileText: profileText
    });
  }


   // brevet

GetBrevet():Observable<any[]>{
  return this._httpClient.get<any>(this.APIUrl+'/brevets')
}

AddBrevet(data: any) {
  return this._httpClient.post(`${this.APIUrl}/brevets/Add_Brevets`, data);
}

UpdateBrevet(data: any) {
  return this._httpClient.put(`${this.APIUrl}/brevets/Update_Brevets`, data);
}

DeleteBrevet(id: number) {
  const url = `${this.APIUrl}/brevets/Delete_Brevets?id=${id}`;
  return this._httpClient.delete(url);
}


}