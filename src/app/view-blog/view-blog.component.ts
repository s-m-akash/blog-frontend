import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  decodedToken: any;
  helper = new JwtHelperService();
  currentUserId: number = 0;
  blogs: any[] = [];

  constructor(private service: JwtClientService) { }
  ngOnInit(): void {
    this.decodeToke();
    this.getAllBlogs();

  }

  decodeToke() {
    let token = localStorage.getItem('token')?.toString();
    this.decodedToken = this.helper.decodeToken(token);
    this.currentUserId = this.decodedToken.userId;
    // const expirationDate = this.helper.getTokenExpirationDate(token);
    // const isExpired = this.helper.isTokenExpired(token);
  }

  getAllBlogs() {
    this.service.getAllBlogs()
      .subscribe(data => {
        this.blogs = data;
      });
  }
  delete(blogId: number) {
    this.service.deleteUser(blogId)
    .subscribe(data => {
      this.ngOnInit();
    });
    
}

}
