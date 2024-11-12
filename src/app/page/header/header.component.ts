import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { searchService } from '../../../services/app.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule ],
  providers:[ searchService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchText: string = '';
  constructor(private appSearch: searchService){}
  onSearch(): void {
    console.log(this.searchText)
    this.appSearch.setSearchText(this.searchText)
    this.searchText = ''
  }
}
