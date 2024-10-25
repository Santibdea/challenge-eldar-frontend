import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpService } from '@services/generic';
import { Post } from '@interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService extends HttpService {


  getAllPosts(){
    return this._http.get<Post[]>(this.getUrl(this.postsEndpoint));
  }

  getAllPostsByUser(userId: string){
    return this._http.get<Post[]>(this.getUrl(`${this.usersEndpoint}/${userId}/${this.postsEndpoint}`))
  }

  createPost(postData: Post): Observable<any> {
    return this._http.post(this.getUrl(this.postsEndpoint), postData);
  }

  editPost(postData: Post): Observable<any> {
    return this._http.put(this.getUrl(`${this.postsEndpoint}/${String(postData.id)}`), postData)
  }

  deletePost(postId: number): Observable<any> {
    return this._http.delete(this.getUrl(`${this.postsEndpoint}/${String(postId)}`));
  }
}
