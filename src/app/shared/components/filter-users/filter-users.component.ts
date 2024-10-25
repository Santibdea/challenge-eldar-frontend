import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '@interfaces/user.interface';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-filter-users',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './filter-users.component.html',
  styleUrl: './filter-users.component.scss'
})
export class FilterUsersComponent {
  @Input() users: UserDTO[] = [];
  @Input() selectedUser: any;

  @Output() selectedUserChange: EventEmitter<any> = new EventEmitter<any>();

  onUserSelect(event: any) {
    console.log(event.value);
    this.selectedUserChange.emit(event.value); 
  }
  
}
