import { Component, OnInit } from '@angular/core';
import { Post } from './post.uidto';
import { PostModelService } from '../models/post-model.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss']
})
export class PostsPage implements OnInit {
  posts: Post[] = [];

  constructor(private postModel: PostModelService) {}

  ngOnInit() {
    this.postModel.getPosts(this.posts.length, 10, posts => {
      this.posts = this.posts.concat(posts);
    });
  }

  onload(event) {
    setTimeout(() => {
      this.postModel.getPosts(this.posts.length, 10, posts => {
        if (posts) {
          this.posts = this.posts.concat(posts);
        }
        event.target.complete();
      });
    }, 500);
  }
}
