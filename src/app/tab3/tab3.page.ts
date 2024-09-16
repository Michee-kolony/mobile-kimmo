import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
user : any;
  constructor(private router : Router) {}

   ngOnInit(): void {
     this.getinfo();
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
   
   logout(){
     localStorage.removeItem('Currentuser');
     this.router.navigateByUrl('/login');
   }
}
