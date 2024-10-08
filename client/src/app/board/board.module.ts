import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/authGuard.service';
import { InlineFormModule } from '../shared/modules/inlineform/inlineForm.module';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';
import { ColumnsService } from '../shared/services/columns.service';
import { TasksService } from '../shared/services/tasks.service';
import { BoardComponent } from './components/board/board.component';
import { BoardService } from './services/board.service';
import { TaskModalComponent } from './components/taskModal/taskModal.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [AuthGuardService],
    children:[{
      path: 'tasks/:taskId',
      component:TaskModalComponent
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopbarModule,
    InlineFormModule,
    ReactiveFormsModule
  ],
  declarations: [BoardComponent,TaskModalComponent],
  providers: [BoardService, ColumnsService, TasksService],
})
export class BoardModule {}
