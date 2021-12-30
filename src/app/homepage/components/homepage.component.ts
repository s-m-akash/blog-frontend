import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JwtClientService } from 'src/app/jwt-client.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  response: any;
  userCreationMsg: any;
  logInForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  authRequest: any;

  fetchAuthData(){
    this.authRequest = {
      "userName": this.logInForm.get('userName')?.value,
      "password": this.logInForm.get('password')?.value
    }
  }

constructor(private service: JwtClientService,
            private router: Router,
            private route: ActivatedRoute){
}


  ngOnInit(): void {
    
  }

  // public getAccessToken(authRequest: any){
  //   let resp = this.service.generatetoken(authRequest);
  //   resp.subscribe(data => console.log("Token : "+data));
  //   resp.subscribe(data=>this.accessApi(data));
  // }

  // public accessApi(token: any){
  //   let resp = this.service.welcome(token);
  //   resp.subscribe(data=> this.response = data); 
  // }

  logIn(){
    this.fetchAuthData();
    try{
    let resp = this.service.generatetoken(this.authRequest).subscribe(data =>{
      console.log("Token : "+data);
      localStorage.setItem('token',data.toString());
      this.router.navigate(['../menu'], { relativeTo: this.route });
    });
    this.userCreationMsg = "Wrong username or password!";
  }
  catch(w){
    this.userCreationMsg = 'Wrong username or password!';
  }
    // this.getAccessToken(this.authRequest);
    // this.router.navigate(['../menu'], { relativeTo: this.route });
  }

  signUp(){
    let user = {
      "username" : this.logInForm.get('userName')?.value,
      "password" : this.logInForm.get('password')?.value,
      "role" : "blogger",
      "status" : "notApproved"
    }

    let resp = this.service.createUser(user).subscribe((data:any) => {
      this.userCreationMsg = data.msg;
      console.log(data.msg);
      if(data.msg.startsWith('Success!'))
      {
        this.userCreationMsg = "User created! Please log in.";
        this.logInForm.get('userName')?.setValue(null);
        this.logInForm.get('password')?.setValue(null);
      }
      else{
        this.userCreationMsg = "User already exist!";
      }
  });
  }



}
