import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from '@services/private/posts.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserDTO } from '@interfaces/user.interface';
import { UserService } from '@services/private';
import { TokenService } from '@services';
import { Router } from '@angular/router';
import { LoginComponent } from '@views/public/login/login.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FilterUsersComponent } from "../../../shared/components/filter-users/filter-users.component";
import { SearchPostsComponent } from "../../../shared/components/search-posts/search-posts.component";
import { PostsTableComponent } from "../../../shared/components/posts-table/posts-table.component";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ToolbarModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    HeaderComponent,
    FilterUsersComponent,
    SearchPostsComponent,
    PostsTableComponent
],
  providers: [ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public static PATH = 'home';
  protected postDialog: boolean = false;
  protected editMode: boolean = false;
  protected selectedPost: Post = { userId: 1, id: 0, title: '', body: '' };

  protected posts: Post[] = [];
  protected filteredPosts: Post[] = [];
  protected users: UserDTO[] = [];

  protected role: string = '';
  protected userId: number = 0;

  private store = inject(Store<{ user: any }>);
  private postService = inject(PostService);
  private userService = inject(UserService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private tokenService = inject(TokenService);
  private fb = inject(FormBuilder); 

  protected postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
  }); 

  selectedUser: any;

  ngOnInit() {
    this.handleUserAndRole();
    this.setAllPosts();
    this.setAllUsers();
  }

  setAllPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = [...this.posts];
    });
  }
  setAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = [{ id: 0, email: 'All Users', avatar: '' }, ...users];
    });
  }

  handleUserAndRole() {
    this.store.select('user').subscribe((state) => {
      if (state && state.user) {
        this.role = state.user.role;
        if (!this.role) {
          this.tokenService.resetToken();
          this.router.navigate([LoginComponent.PATH]);
        }
        this.userId = state.user.id;
      } else {
        this.tokenService.resetToken();
        this.router.navigate([LoginComponent.PATH]);
      }
    });
  }

  applyFilter(filterValue: any) {
    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(filterValue) ||
        post.body.toLowerCase().includes(filterValue)
    );
  }

  openNewPostDialog() {
    this.postForm.reset();
    this.postDialog = true;
    this.editMode = false;
  }

  editPost(post: Post) {
    console.log('hola');
    this.postForm.patchValue(post);
    this.selectedPost = post;
    this.postDialog = true;
    this.editMode = true;
  }

  createPost() {
    if (this.postForm.invalid) return;

    const postData = this.postForm.value;
    this.postService
      .createPost({
        userId: this.userId,
        id: this.posts.length + 1,
        body: postData.body,
        title: postData.title,
      })
      .subscribe((newPost) => {
        this.posts = [newPost, ...this.posts];
        this.filteredPosts = [...this.posts];
        this.postDialog = false;
      });
  }

  updatePost() {
    if (this.postForm.invalid) return;

    const postData = this.postForm.value;
    this.postService
      .editPost({
        id: this.selectedPost.id,
        userId: this.userId,
        body: postData.body,
        title: postData.title,
      })
      .subscribe((postUpdated) => {
        const index = this.posts.findIndex((p) => p.id === postUpdated.id);
        this.posts[index] = postUpdated;
        this.filteredPosts = [...this.posts];
        this.postDialog = false;
      });
  }

  confirmDelete(postId: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este post?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',   
      rejectLabel: 'No',  
      accept: () => {
        this.deletePost(postId);
      },
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      const index = this.posts.findIndex((p) => p.id === postId);
      if (index !== -1) {
        this.posts.splice(index, 1);
        this.filteredPosts = [...this.posts];
      }
    });
  }

  hideDialog() {
    this.postDialog = false;
  }

  onUserSelect(user: any) {
    if (user.id === 0) { 
      this.setAllPosts();
    } else {
      this.postService.getAllPostsByUser(String(user.id)).subscribe((posts) => {
        this.posts = posts;
        this.filteredPosts = [...this.posts];
      });
    }
  }
  
}
