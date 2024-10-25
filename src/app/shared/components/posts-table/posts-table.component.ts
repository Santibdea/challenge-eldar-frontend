import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '@interfaces/post.interface';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-posts-table',
  standalone: true,
  imports: [TableModule, PaginatorModule, ButtonModule],
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.scss'
})
export class PostsTableComponent {

  @Input() posts: Post[] = [];
  @Input() role!: string;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();

  onEdit(post: Post) {
    this.edit.emit(post);
  }

  onDelete(postId: number) {
    this.delete.emit(postId);
  }
  
}
