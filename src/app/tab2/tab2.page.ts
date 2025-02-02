import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
url = 'https://kimmo.vercel.app/favoris/';
userinfo:any;
favoris : any;
  constructor(private http : HttpClient, private router : Router) {}

ngOnInit():void{
  this.getfavoris();
  
}

getfavoris() {
  const info = localStorage.getItem('Currentuser');
  if (info) {
    this.userinfo = JSON.parse(info);
    this.http.get<any>(this.url).pipe(
      map((articles: any) => {
        // Si la réponse est un objet unique, on le transforme en tableau
        if (!Array.isArray(articles)) {
          articles = [articles];
        }
        return articles.filter((article: { user_id: any; }) => article.user_id === this.userinfo.userId);
      })
    ).subscribe(result => {
      this.favoris = result;
      this.ngOnInit();
    });
  } else {
    this.router.navigateByUrl('/login');
  }
}

deletefavoris(favoris_id:any){
   this.http.delete(`https://kimmo.vercel.app/favoris/${favoris_id}`).subscribe(data => {
       console.log('donnée supprimé');
       this.ngOnInit()
   })
;} 

}