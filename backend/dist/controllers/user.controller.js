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
exports.userSignup = void 0;
const AsyncHandler_1 = __importDefault(require("../utilities/AsyncHandler"));
const ErrorHandler_1 = __importDefault(require("../utilities/ErrorHandler"));
const ResponseHandler_1 = __importDefault(require("../utilities/ResponseHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const cloudinaryUtils_1 = require("../utilities/cloudinaryUtils");
const Oauth_1 = require("../utilities/Oauth");
const nanoid_1 = require("nanoid"); // Or any other unique ID generator
require("../config/env");
const signupSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    avatar: zod_1.z.any(),
    email: zod_1.z.string().email(),
});
const userSignup = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, username, password, avatar, email } = req.body;
    try {
        const { success, error } = signupSchema.safeParse(req.body);
        if (!success) {
            throw new ErrorHandler_1.default(401, `Invalid Inputs ${error}`);
        }
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser) {
            throw new ErrorHandler_1.default(409, 'User Already exists');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const file = req.file || undefined;
        const avatarLocalPath = (file === null || file === void 0 ? void 0 : file.path) || '';
        if (!avatarLocalPath) {
            throw new ErrorHandler_1.default(400, 'Avatar file is required or is invalid');
        }
        const avatarUrl = (_a = (yield (0, cloudinaryUtils_1.uploadToCloudinary)(avatarLocalPath))) === null || _a === void 0 ? void 0 : _a.url;
        const user = yield user_model_1.User.create({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            avatar: avatarUrl,
            email,
        });
        const createdUser = yield user_model_1.User.findById(user._id).select('-password');
        if (!createdUser) {
            throw new ErrorHandler_1.default(500, 'Something went wrong while registering the user');
        }
        return res
            .status(200)
            .json(new ResponseHandler_1.default(200, createdUser, 'User Registered Successfully'));
    }
    catch (error) {
        throw new Error(`Error during Signup.. User not Registered , Error =  ${error}`);
    }
}));
exports.userSignup = userSignup;
const generateUniqueUsername = (displayName) => {
    if (!displayName) {
        displayName = 'newUser';
    }
    return `${displayName}-${(0, nanoid_1.nanoid)(5)}`;
};
const googleLogin = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const payload = yield (0, Oauth_1.verifyGoogleToken)(token);
        if (!payload) {
            throw new ErrorHandler_1.default(401, 'Invalid Google token');
        }
        const { sub: googleId, email, name, picture } = payload;
        const username = generateUniqueUsername(name);
        let user = yield user_model_1.User.findOne({ googleId });
        if (!user) {
            user = yield user_model_1.User.create({
                googleId,
                username,
                email,
                avatar: picture,
            });
        }
        const jwtoken = jsonwebtoken_1.default.sign({ userId: user._id }, 'asdfasjdfasdfasd', {
            expiresIn: '4h',
        });
    }
    catch (error) { }
}));
console.log(process.env.JWT_SECRET);
