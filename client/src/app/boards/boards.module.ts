import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardsComponent } from "./components/boards/boards.component";
import { AuthGuardService } from "../auth/services/authGuard.service";
import { BoardsService } from "../shared/services/boards.service";
import { CommonModule } from "@angular/common";
import { InlineFormModule } from "../shared/modules/inlineform/inlineform.module";
import { TopBarModule } from "../shared/modules/topbar/topbar.module";

const routes: Routes = [
    {
        path:'boards',
        component:BoardsComponent,
        canActivate:[AuthGuardService]
    },
];

@NgModule({
    imports:[RouterModule.forChild(routes),CommonModule, InlineFormModule,TopBarModule],
    declarations:[BoardsComponent],
    providers:[BoardsService]
})

export class BoardsModule{}