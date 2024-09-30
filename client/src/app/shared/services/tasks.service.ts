import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskInterface } from '../types/task.interface';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(boardId:string): Observable<TaskInterface[]> {
    const url = `${environment.apiUrl}/boards/${boardId}/tasks`;
    return this.http.get<TaskInterface[]>(url);
  }

}
