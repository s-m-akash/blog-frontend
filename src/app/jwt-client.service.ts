import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http:HttpClient) { }

  public generatetoken(request:any){

    return this.http.post("http://localhost:9192/authenticate",request,{
      responseType: 'text' as 'json'
    });
  }

  public welcome(token:any){
    let tokenStr = 'Bearer '+token;
    const headers = new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get("http://localhost:9192",{headers, responseType: 'text' as 'json'});
  }

  // public createUser(user:any){

  //    this.http.post("http://localhost:9192/createUser",user).toPromise().then((data:any)=>{
  //     return  data;
  //   });
  // }
  public createUser(user: any): Observable<any> {
    return this.http.post("http://localhost:9192/createUser",user);
}

public createBlog(blog: any): Observable<any> {
  let tokenStr = 'Bearer '+localStorage.getItem('token');
  const headers = new HttpHeaders().set("Authorization",tokenStr);
  return this.http.post("http://localhost:9192/createBlog",blog, {headers});
}

public getAllBlogs(): Observable<any> {
  let tokenStr = 'Bearer '+localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization",tokenStr);
  return this.http.get("http://localhost:9192/getAllBlog",{headers});
}

public deleteUser(id: number):Observable<any> {
  let tokenStr = 'Bearer '+localStorage.getItem('token');
    const headers = new HttpHeaders().set("Authorization",tokenStr);
  return this.http.delete("http://localhost:9192/deleteBlog?id="+id, {headers});
}

}
