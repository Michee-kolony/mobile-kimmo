import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
url = 'https://kimmo.vercel.app/client/login';
email:string = '';
password:string ='';
erreur:boolean = false;
success :boolean = false;
message : string = '';
spinner:boolean = false;
  constructor(private http : HttpClient, private router:Router) { }

  ngOnInit() {
  
  }
   login(){
    const userlogin = {
      email : this.email,
      password:this.password
    }
    this.spinner = true
    if(this.email == ''){
        this.erreur = true;
        this.message = "email requis";
        this.spinner = false;
        setTimeout(() => {
          this.erreur = false;
        },2000)
    }
    else if(this.password == ''){
      this.erreur = true;
      this.message = "mot de passe requis";
      this.spinner = false;
      setTimeout(() => {
        this.erreur = false;
      },2000)
  }
 else{
  this.http.post(this.url, userlogin).subscribe(
    data=>{
      this.success = true;
      this.message = "Connexion réussie";
      this.spinner = false;
      localStorage.setItem('Currentuser', JSON.stringify(data));
      setTimeout(() =>{
        this.router.navigateByUrl('/tabs/tab1');
      }, 3000);
    },
    error=>{
        this.erreur = true;
        this.message = "Email ou mot de passe incorrect";
        this.spinner = false;
        setTimeout(() =>{
          this.erreur= false;
        }, 3000);
    }
  )
  setTimeout(() => {
    this.success = false;
  },3000)
 }
   }
}
