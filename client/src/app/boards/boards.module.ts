import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardsComponent } from "./components/boards/boards.component";
import { AuthGuardService } from "../auth/services/authGuard.service";
import { BoardsService } from "../shared/services/boards.service";

const routes: Routes = [
    {
        path:'boards',
        component:BoardsComponent,
        canActivate:[AuthGuardService]
    },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    declarations:[BoardsComponent],
    providers:[BoardsService]
})

export class BoardsModule{}