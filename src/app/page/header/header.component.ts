import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() searchEvent= new EventEmitter<string>(); //event
  searchText: string = '';
  onSearch(): void {
    console.log(this.searchText)
    this.searchEvent.emit(this.searchText); // Gửi từ khóa tìm kiếm
    this.searchText = ''; // Xóa ô tìm kiếm sau khi gửi
  }
}
