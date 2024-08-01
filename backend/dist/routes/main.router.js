"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../config/multer"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
exports.mainRouter = router;
router.post('/user/signup', multer_1.default.single('avatar'), user_controller_1.userSignup);
