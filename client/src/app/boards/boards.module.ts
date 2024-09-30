import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/authGuard.service';
import { InlineFormModule } from '../shared/modules/inlineform/inlineform.module';
import {TopbarModule} from '../shared/modules/topbar/topbar.module';
import { BoardsService } from '../shared/services/boards.service';
import { BoardsComponent } from './components/boards/boards.component';
import { ColumnsService } from '../shared/services/columns.service';
import { TasksService } from '../shared/services/tasks.service';

const routes: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), InlineFormModule, TopbarModule],
  declarations: [BoardsComponent],
  providers: [BoardsService,ColumnsService,TasksService],
})
export class BoardsModule {}
