import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-edittask',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,HttpClientModule],
  providers:[ AppService],
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.scss'
})
export class EdittaskComponent implements OnInit {
  
  editF: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    group: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    duedate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    createdate: new FormControl(new Date().toISOString().split('T')[0], Validators.required) 
  })
  taskId: number = 0;
  constructor(private app: AppService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      this.getTaskById(this.taskId);
    });
  }
  getTaskById(id: any) {
    this.app.getTaskById(id).subscribe(task => {
      if (task.duedate) {
        task.duedate = task.duedate.split('T')[0]; 
      }
  
      if (typeof task.status === 'string') {
        task.status = task.status === 'true';
      }
      console.log(task)
      this.editF.patchValue(task);  
    });
  }
  onEdit(){
    const formValue = this.editF.value;
    if (formValue.status === 'false') {
      formValue.status = false;  
    } else if (formValue.status === 'true') {
      formValue.status = true; 
    }
    formValue.priority = Number(formValue.priority)
    formValue.duedate = new Date(formValue.duedate).toISOString();
    formValue.createdate = new Date(formValue.createdate).toISOString();

    console.log(this.taskId)
    if(this.editF.valid){
      this.app.putTaskId(formValue, this.taskId).subscribe({
        
        next:()=>{
          console.log(this.editF.value)
          alert("Sửa công việc thành công")
        },
        error: (err: any) => {
        console.log(this.editF.value)
        console.log(err);
      }
      })
    }
  }
}
