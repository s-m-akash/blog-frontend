import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JwtClientService } from '../jwt-client.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  helper = new JwtHelperService();
  decodedToken: any;
  blog: any;
  createBlogForm = new FormGroup({
    blogTitle: new FormControl(''),
    blogBody: new FormControl(''),
  });
  constructor(private service: JwtClientService) { }

  decodeToke() {
    let token = localStorage.getItem('token')?.toString();
    this.decodedToken = this.helper.decodeToken(token);
    // const expirationDate = this.helper.getTokenExpirationDate(token);
    // const isExpired = this.helper.isTokenExpired(token);
  }


  ngOnInit(): void {
    this.decodeToke();
    console.log(new Date());
  }

  fetchBlogData() {
    this.blog = {
      "blogTitle": this.createBlogForm.get('blogTitle')?.value,
      "blogBody": this.createBlogForm.get('blogBody')?.value,
      "authorId": this.decodedToken.userId,
      "createDateTime": this.getCurrentDate(),
      "blogStatus": "active"
    }

  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' +dd
  }

  submit() {
    this.fetchBlogData();
    console.log(this.createBlogForm.get('blogTitle')?.value);
    console.log(this.createBlogForm.get('blogBody')?.value);

    let resp = this.service.createBlog(this.blog).subscribe((data: any) => {
      //this.userCreationMsg = data.msg;
      console.log(data.msg);
      if (data.msg.startsWith('Success!')) {
        //this.userCreationMsg = "Blog published!";
        this.createBlogForm.get('blogTitle')?.setValue(null);
        this.createBlogForm.get('blogBody')?.setValue(null);
      }
      else {
        //this.userCreationMsg = "User already exist!";
      }
    });

  }

}
