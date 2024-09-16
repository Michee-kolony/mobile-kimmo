import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  articleId!: string |null;
  article:any;
  user:any;
  spinner : boolean = false;
  res:boolean = false;
  insert : boolean = false;
  tel:string = "";
  constructor(private activated : ActivatedRoute, private http : HttpClient, private router : Router) { }

  ngOnInit() {
   // Récupération de l'id de l'article à partir de l'URL
   this.articleId = this.activated.snapshot.paramMap.get('id');
  if(this.articleId ){
     this.loadArticle(this.articleId);
   } else {
    console.log('erreur de récuperation');
  }
  }


  loadArticle(id: string) {
    this.spinner = true;
    const apiUrl = `https://kimmo.vercel.app/offres/${id}`; 
    this.http.get(apiUrl).subscribe(
      (data) => {
        this.article = data;
        console.log(this.article); 
        this.spinner = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }


  getinfo(){
    this.insert = true;
    const info = localStorage.getItem('Currentuser');
    if(info){
     this.user = JSON.parse(info);

     const body = {
      user_id : this.user.userId,
      offre_id : this.article._id,
      image:this.article.image,
      prix: this.article.prix
     }

     this.http.post('https://kimmo.vercel.app/favoris/', body).subscribe(
      ()=>{
       alert('Ajouté au favoris');
       this.insert = false;
      }
     )
    }
    else{
      this.router.navigateByUrl('/login');
      this.insert = false;
    }
   }

   reserver() {
    const info = localStorage.getItem('Currentuser');
    this.res = true;
    if(info){
      this.user = JSON.parse(info);
      const reservation = {
           nom : this.user.nom,
           email:this.user.email,
           telephone:this.tel,
           titre:this.article.titre,
           prix:this.article.prix,
           image:this.article.image,
           pays:this.user.pays,
           user_id:this.user.userId   
      }
      if (!this.tel || this.tel.trim() === '') {
        alert('Veuillez entrer un numéro de téléphone valide.');
        this.res = false;
      }      
     else{
      this.http.post('https://kimmo.vercel.app/commande',reservation).subscribe(
        () =>{
          alert('Reservation effectué');
          this.res = false;
        },
        () => {
         alert('erreur lors de la reservation');
         this.res = false;
        }
      );
     }
    }
    else{
      this.router.navigateByUrl('/login');
    }
}
  
}
