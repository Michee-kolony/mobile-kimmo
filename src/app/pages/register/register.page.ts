import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  url = 'https://kimmo.vercel.app/client/register';
  nom: string = '';
  email: string = '';
  password1: string = '';
  password: string = '';
  pays:string = '';
  erreur: boolean = false;
  success: boolean = false;
  message: string = '';
  connecter:boolean = false;
  spinner: boolean = false;
constructor(private http: HttpClient , private router: Router){}
  ngOnInit() {
    
  }

  register() {
    const userregister = {
      nom: this.nom,
      email: this.email,
      pays: this.pays,
      password: this.password
    };
   this.spinner  = true;
    if (this.nom == '') {
      this.erreur = true;
      this.message = 'nom requis';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    } else if (this.email == '') {
      this.erreur = true;
      this.message = 'Email requis';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    } else if (!this.isValidEmail(this.email)) {
      this.erreur = true;
      this.message = 'Email invalide';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    } else if (this.password1 == '') {
      this.erreur = true;
      this.message = 'mot de passe requis';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    }
    else if (this.pays == '') {
      this.erreur = true;
      this.message = 'Selectionnez votre pays';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    }
    else if (this.password == '') {
      this.erreur = true;
      this.message = 'Confirmez votre mot de passe';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    } else if (this.password1 != this.password) {
      this.erreur = true;
      this.message = 'mot de passe différents';
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      }, 2000);
    } else {
      this.http.post(this.url,userregister).subscribe(
        data=>{
           this.success = true;
           this.message = "Inscription réussie";
           this.connecter =true
           this.spinner = false;
           setTimeout(() => {
            this.success = false;
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error => {
           this.erreur = true;
           this.connecter = false;
           this.message = "Echec inscription";
           this.spinner = false;
           setTimeout(() => {
            this.erreur = false;
          }, 2000);
        }
      );
      setTimeout(() => {
        this.success = false;
      }, 2000);
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
