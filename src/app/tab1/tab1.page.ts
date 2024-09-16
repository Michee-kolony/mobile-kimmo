import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  url = 'https://kimmo.vercel.app/offres'; // URL de votre API
  mySwiper!: Swiper;
  articles: any[] = []; // Variable pour stocker les données
  spinner : boolean = false;
  user: any;
  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    // Initialisation du Swiper
    this.initSwiper();

    // Récupération des données
    this.getAll();
    this.getinfo();
  }

  initSwiper(): void {
    this.mySwiper = new Swiper('.slide-wrapper', {
      // Configuration Swiper
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      breakpoints: {
        0: {
          slidesPerView: 2
        },
        620: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 5
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    });
  }

  getAll(): void {
    this.spinner = true;
    this.http.get<any[]>(this.url).subscribe(
      (data) => {
        // Tri des articles par date de création descendante
        this.articles = data.sort((a, b) => {
          return new Date(b.createdate).getTime() - new Date(a.createdate).getTime();
          
        });
        this.ngOnInit();
        this.spinner = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
        this.spinner = false;
      }
    );
  }

  getinfo(){
    const info = localStorage.getItem('Currentuser');
    if(info){
     this.user = JSON.parse(info);
    }
    else{
      this.router.navigateByUrl('/login');
    }
   }
  
  
}
