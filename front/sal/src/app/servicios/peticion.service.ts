import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) { }


  urlreal:string = "http://localhost:3000"
  

  
  requestOptions:any = {}




  post (url:string,payload:{}){
  
    let promise:any = new Promise((resolve, reject) => {
    this.requestOptions = {
          headers: new HttpHeaders({
       //"":""
      
      }),withCredentials:true
    }

    this.http.post(url,payload,this.requestOptions).toPromise()
    .then((res:any) => {
      resolve(res)
    }).catch((error:any) => {
   reject(error)

    })

    })

    return promise

  }

  get(url: string) {
  return new Promise((resolve, reject) => {
    this.requestOptions = {
      headers: new HttpHeaders({}),
      withCredentials: true
    };

    this.http.get(url, this.requestOptions).toPromise()
      .then((res: any) => resolve(res))
      .catch((error: any) => reject(error));
  });
}


  put (url:string,payload:{}){
  
    let promise:any = new Promise((resolve, reject) => {
    this.requestOptions = {
          headers: new HttpHeaders({
       //"":""
      
      }), withCredentials:true
    }

    this.http.put(url,payload,this.requestOptions).toPromise()
    .then((res:any) => {
      resolve(res)
    }).catch((error:any) => {
   reject(error)

    })

    })

    return promise

  }

  Delete (url:string,payload:{}){
  
    let promise:any = new Promise((resolve, reject) => {
    this.requestOptions = {
          headers: new HttpHeaders({}),
            body: payload,   
         withCredentials:true
    }

    this.http.request("delete",url,this.requestOptions).toPromise()
    .then((res:any) => {
      resolve(res)
    }).catch((error:any) => {
   reject(error)

    })

    })

    return promise

  }


}
 