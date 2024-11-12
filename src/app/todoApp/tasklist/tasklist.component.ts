
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../../services/app.service';
import { RouterOutlet, RouterLink} from '@angular/router';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterOutlet, RouterLink],
  providers: [AppService],
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
  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.app.tasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.filterTasks();  // Lọc tasks theo từ khóa tìm kiếm mỗi khi load lại
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // filter
  filterTasks(): void {
    let filteredTasks = this.tasks;

    if (this.searchText) {
      filteredTasks = this.tasks.filter(task => 
        task.name.toLowerCase().includes(this.searchText.toLowerCase())  // Kiểm tra tên task có chứa từ khóa tìm kiếm không
      );
    }

    this.totalPage = Math.ceil(filteredTasks.length / this.tasksPerPage);
    this.pages = Array.from({ length: this.totalPage }, (_, i) => i + 1);
    this.updateDisplayedTasks(filteredTasks);
  }

  //udapte danh sách tasks hiển thị 
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

  // Hàm xử lý thay đổi từ khóa tìm kiếm
  onSearch(): void {
    this.currentPage = 1;  // Đặt lại trang về 1 khi tìm kiếm
    this.filterTasks();  // Lọc lại danh sách khi người dùng tìm kiếm
  }

  // ondeleteTask(idTask: number):void {
  //   this.app.deleteTask(idTask).subscribe({
  //     next: ()=>{
  //        this.tasks = this.tasks.filter(task => task.id !== idTask);
  //        this.filterTasks();
  //     },
  //     error: (err: any) => console.log(err),
  //   })
  // }
  ondeleteTask(idTask: number): void {
    this.app.deleteTask(idTask).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== idTask);
        this.filterTasks();  // Lọc lại danh sách sau khi xóa
      },
      error: (err: any) => {
        console.log(err);
      }
    });
}

}
