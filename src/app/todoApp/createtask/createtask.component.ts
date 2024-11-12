import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-createtask',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,HttpClientModule],
  providers:[ AppService],
  templateUrl: './createtask.component.html',
  styleUrl: './createtask.component.scss'
})
export class CreatetaskComponent {
  createF: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    group: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    duedate: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    createdate: new FormControl(new Date().toISOString().split('T')[0], Validators.required) 
  })

  constructor(private app: AppService){}
  onSubmit(){
    // console.log(this.createF.value)
    const formValue = this.createF.value;
    if (formValue.status === 'false') {
      formValue.status = false;  
    } else if (formValue.status === 'true') {
      formValue.status = true; 
    }
    formValue.priority = Number(formValue.priority)
    formValue.duedate = new Date(formValue.duedate).toISOString();
    formValue.createdate = new Date(formValue.createdate).toISOString();
    if(this.createF.valid){
      this.app.addTask(this.createF.value).subscribe({
        
        next:()=>{
          console.log(this.createF.value)
          alert("Thêm task mới thành công")
          // this.createF.reset()
          this.createF.setValue({
            name: '',
            group: '',
            status: '',
            priority: '',
            duedate: '',
            description: '',
            createdate: new Date().toISOString().split('T')[0]
          });
        },
        error: (err: any) => {
        console.log(this.createF.value)
        console.log(err);
      }
      })
    }
  }
}