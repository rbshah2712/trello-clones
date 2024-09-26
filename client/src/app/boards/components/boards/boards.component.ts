import { Component, OnInit } from "@angular/core";
import { BoardsService } from "src/app/shared/services/boards.service";

@Component({
    selector:'boards',
    templateUrl:'./boards.component.html',
})
export class BoardsComponent implements OnInit {
    constructor(private boardsservice: BoardsService){}

    ngOnInit(): void {
        this.boardsservice.getBoards().subscribe(boards => {
            console.log(boards);
        })
    }
}