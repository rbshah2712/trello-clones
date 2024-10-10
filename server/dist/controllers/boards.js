"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.leaveBoard = exports.joinBoard = exports.createBoard = exports.getBoard = exports.getBoards = void 0;
const board_1 = __importDefault(require("../models/board"));
const socketEvents_enum_1 = require("../types/socketEvents.enum");
const helpers_1 = require("../helpers");
const getBoards = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.sendStatus(401);
        }
        const boards = yield board_1.default.find({ userId: req.user.id });
        res.send(boards);
    }
    catch (err) {
        next(err);
    }
});
exports.getBoards = getBoards;
const getBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.sendStatus(401);
        }
        const board = yield board_1.default.findById(req.params.boardId);
        res.send(board);
    }
    catch (err) {
        next(err);
    }
});
exports.getBoard = getBoard;
const createBoard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.sendStatus(401);
        }
        const newBoard = new board_1.default({
            title: req.body.title,
            userId: req.user.id,
        });
        const savedBoard = yield newBoard.save();
        res.send(savedBoard);
    }
    catch (err) {
        next(err);
    }
});
exports.createBoard = createBoard;
const joinBoard = (io, socket, data) => {
    console.log("server socket io join", socket.user);
    socket.join(data.boardId);
};
exports.joinBoard = joinBoard;
const leaveBoard = (io, socket, data) => {
    console.log("server socket io leave", data.boardId);
    socket.leave(data.boardId);
};
exports.leaveBoard = leaveBoard;
const updateBoard = (io, socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!socket.user) {
            socket.emit(socketEvents_enum_1.SocketEventsEnum.boardsUpdateFailure, "User is not authorized");
            return;
        }
        const updatedBoard = yield board_1.default.findByIdAndUpdate(data.boardId, data.fields, { new: true });
        io.to(data.boardId).emit(socketEvents_enum_1.SocketEventsEnum.boardsUpdateSuccess, updatedBoard);
    }
    catch (err) {
        socket.emit(socketEvents_enum_1.SocketEventsEnum.boardsUpdateFailure, (0, helpers_1.getErrorMessage)(err));
    }
});
exports.updateBoard = updateBoard;
const deleteBoard = (io, socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!socket.user) {
            socket.emit(socketEvents_enum_1.SocketEventsEnum.boardsDeleteFailure, "User is not authorized");
            return;
        }
        yield board_1.default.deleteOne({ _id: data.boardId });
        io.to(data.boardId).emit(socketEvents_enum_1.SocketEventsEnum.boardsDeleteSuccess);
    }
    catch (err) {
        socket.emit(socketEvents_enum_1.SocketEventsEnum.boardsDeleteFailure, (0, helpers_1.getErrorMessage)(err));
    }
});
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=boards.js.map