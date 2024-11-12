
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppService,searchService  } from '../../../services/app.service';
import { RouterOutlet, RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterOutlet, RouterLink],
  providers: [AppService,searchService],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss',
})
export class TasklistComponent implements OnInit {
  tasks: any[] = [];
  displayedTasks: any[] = [];
  currentPage: number = 1;
  tasksPerPage: number = 10;
  totalPage: number = 1;
  pages: number[] = [];
  searchText: string = '';
  searchSubscription: Subscription= new Subscription();
  constructor(private app: AppService,private appSearch : searchService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.searchSubscription = this.appSearch.searchText$.subscribe(searchText => {
      this.searchText = searchText;
      this.filterTasks(); // Lọc lại danh sách khi giá trị tìm kiếm thay đổi
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadTasks(): void {
    this.app.tasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.filterTasks(); // Lọc tasks khi load lại
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  filterTasks(): void {
    let filteredTasks = this.tasks;

    if (this.searchText) {
      filteredTasks = this.tasks.filter(task =>
        task.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.totalPage = Math.ceil(filteredTasks.length / this.tasksPerPage);
    this.pages = Array.from({ length: this.totalPage }, (_, i) => i + 1);
    this.updateDisplayedTasks(filteredTasks);
  }

  updateDisplayedTasks(filteredTasks: any[]): void {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    this.displayedTasks = filteredTasks.slice(startIndex, startIndex + this.tasksPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPage) {
      this.currentPage = page;
      this.filterTasks();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPage) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  ondeleteTask(idTask: number): void {
    this.app.deleteTask(idTask).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== idTask);
        this.filterTasks();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
