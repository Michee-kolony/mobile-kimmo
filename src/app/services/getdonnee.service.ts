import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdonneeService {
url='https://kimmo.vercel.app/offres';
  constructor(private http : HttpClient) { }
  getData() : Observable<any[]> {
    return this.http.get<any>(this.url);
  }
}
