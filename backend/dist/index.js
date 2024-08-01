"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectToDB_1 = __importDefault(require("./database/ConnectToDB"));
require("./config/env");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const main_router_1 = require("./routes/main.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static('../public'));
(0, ConnectToDB_1.default)();
app.use('/api/v1/', main_router_1.mainRouter);
app.listen(process.env.PORT, () => {
    console.log('Server started on port - ' + process.env.PORT);
});
