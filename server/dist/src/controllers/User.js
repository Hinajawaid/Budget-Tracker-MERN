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
exports.UserSignIn = exports.UserSignUp = exports.helloWorld = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helloWorld = (req, res, next) => {
    res.status(200).send("Hello World");
};
exports.helloWorld = helloWorld;
const UserSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, budget } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email: email }).exec();
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield User_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            budget,
        });
        console.log("aaa", newUser);
        return res.json(newUser);
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.UserSignUp = UserSignUp;
const UserSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const oldUser = yield User_1.default.findOne({ email });
        if (!oldUser) {
            console.log("first");
            return res.status(404).json({ message: "Email doesn't exists" });
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            email: oldUser.email,
            id: oldUser._id,
        }, "maarij");
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(`error ${error}`);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.UserSignIn = UserSignIn;
