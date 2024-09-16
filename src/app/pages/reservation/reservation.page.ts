import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
user:any;
articles:any;
userinfo:any;
url ='https://kimmo.vercel.app/commande';
commande:any;
constructor(private http: HttpClient, private router : Router) { }

ngOnInit() {
    this.getcommande();
}

getcommande() {
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
      this.commande = result;
      console.log(this.commande)
      this.ngOnInit();
    });
  } else {
    this.router.navigateByUrl('/login');
  }
}

deletecommande(favoris_id:any){
  this.http.delete(`https://kimmo.vercel.app/commande/${favoris_id}`).subscribe(data => {
      console.log('donnée supprimé');
      this.ngOnInit()
  })
;} 

}
