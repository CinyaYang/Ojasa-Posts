import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  loadPosts(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts`).pipe(
      map(data => {
        return data;
      })
    );
  }

  loadContrubutorDetail(userId: number): Observable<any> {
    return this.http.get(`${this.url}/users/${userId}`);
  }

  loadComments(postId: number): Observable<any> {
    return this.http.get(`${this.url}/posts/${postId}/comments`);
  }
}
