import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { BoardsService } from "src/app/shared/services/boards.service";
import { BoardService } from "../../services/board.service";
import { filter, Observable } from "rxjs";
import { BoardInterface } from "src/app/shared/types/board.interface";

@Component({
    selector:'board',
    templateUrl:'./board.component.html',
})

export class BoardComponent {

    boardId:string;
    board$:Observable<BoardInterface>;
    
    constructor(
                private boardsService:BoardsService,
                private route: ActivatedRoute,
                private boardservice: BoardService
              ){
        const boardId = this.route.snapshot.paramMap.get('boardId');

        if(!boardId){
            throw new Error('Cant get boardID from url');
        }

        this.boardId = boardId;
        this.board$ = this.boardservice.board$.pipe(filter(Boolean));

    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData():void {
        this.boardsService.getBoard(this.boardId).subscribe((board) => {
            this.boardservice.setBoard(board);
        })
    }
}