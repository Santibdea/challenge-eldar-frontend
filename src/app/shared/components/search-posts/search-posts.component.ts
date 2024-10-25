import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-posts',
  standalone: true,
  imports: [FormsModule, InputTextModule, CommonModule], 
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.scss']
})
export class SearchPostsComponent {
  @Output() filter = new EventEmitter<string>();

  onSearch(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filter.emit(filterValue);
  }
}
