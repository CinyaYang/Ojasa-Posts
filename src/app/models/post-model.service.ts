import { Injectable } from '@angular/core';
import { Post } from '../posts/post.uidto';
import { PostService } from '../services/post.service';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PostModelService {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  async getPosts(offset: number, limit: number, callback) {
    if (offset + limit <= this.posts.length) {
      callback(this.posts.slice(offset, limit + offset));
    } else {
      await this.loadPosts(values => {
        this.posts = values;
        if (this.posts.length > offset + limit) {
          callback(this.posts.slice(offset, limit));
        } else {
          callback(null);
        }
      });
    }
  }

  async loadPosts(callback) {
    const postDatas = [] as Post[];
    await this.postService.loadPosts().subscribe(posts => {
      posts.forEach(post => {
        const postData: Post = {
          title: post.title,
          body: post.body,
          contributorName: '',
          contributorCompanyName: '',
          commentsNumber: 0
        };

        this.loadContrubutorDetail(postData, post.userId);
        this.loadComments(postData, post.id);
        postDatas.push(postData);
      });
      callback(postDatas);
    });
  }

  async loadContrubutorDetail(postData: Post, userId: number) {
    await this.postService.loadContrubutorDetail(userId).subscribe(user => {
      postData.contributorName = user.name;
      postData.contributorCompanyName = user.company.name;
    });
  }

  async loadComments(postData: Post, postId: number) {
    await this.postService.loadComments(postId).subscribe(comments => {
      postData.commentsNumber = comments.length;
    });
  }
}
