
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const api = 'http://localhost:5014/api/TaskItems';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  tasks(): Observable<any> {
    return this.http.get(api);
  }

  deleteTask(id:number): Observable<any>{
    return this.http.delete<any>(`http://localhost:5014/api/TaskItems/${id}`);
  }

  addTask(task: any): Observable<any>{
    return this.http.post<any>(api, task  );
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${api}/${id}`);
  }

  putTaskId(task: any, id:number): Observable<any>{
    return this.http.put<any>(`${api}/${id}`, task  );
  }
}
export class searchService{
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  constructor() {}

  setSearchText(searchText: string): void {
    this.searchTextSubject.next(searchText);
  }
}