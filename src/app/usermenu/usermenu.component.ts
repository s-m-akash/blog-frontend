import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createBlog(){
    this.router.navigate(['../create-blog'], { relativeTo: this.route });
  }
  viewBlog(){
    this.router.navigate(['../view-blog'], { relativeTo: this.route });

  }
  createUser(){

  }

}
