import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../../services/app.service';
import { RouterOutlet, RouterLink} from '@angular/router';

@Component({
  selector: 'app-detailtask',
  standalone: true,
  imports: [ HttpClientModule,RouterOutlet, RouterLink,CommonModule],
  providers: [AppService],
  templateUrl: './detailtask.component.html',
  styleUrl: './detailtask.component.scss'
})
export class DetailtaskComponent implements OnInit {
  taskDetail: any;
  constructor(private app: AppService,private route: ActivatedRoute,private router: Router ){}
  // ngOnInit(): void {
  //   const taskId = +this.route.snapshot.paramMap.get('id')!;
  //   this.app.getTaskById(taskId).subscribe(task => {
  //       this.taskDetail = task;
  //   });
  // }
  taskId: number = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      this.getTaskById(this.taskId);
    });
  }
  getTaskById(id: any) {
    this.app.getTaskById(id).subscribe(task => {
      this.taskDetail = task;
    });
  }
  ondeleteTask(idTask: number): void {
    this.app.deleteTask(idTask).subscribe({
      next: () => {
        this.router.navigate(['/tasklist']); 
        alert('Task deleted successfully');
        
      },
      error: (err: any) => {
        console.log(idTask)
        console.error('Error deleting task:', err);
      }
    });
  }
}
