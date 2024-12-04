"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const User_1 = __importDefault(require("./src/routes/User"));
const Budget_1 = __importDefault(require("./src/routes/Budget"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./src/middlewares/auth");
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./src/middlewares/auth");
const app = (0, express_1.default)();
const port = 5002;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to MongoDB
const connect = mongoose_1.default.connect("mongodb+srv://fatimaabbasi270:pPZdZc36XUArIzLq@cluster0.rtwxz.mongodb.net/budget-tracker");
connect
    .then((db) => console.log("connected to db"))
    .catch((err) => {
    console.log(err);
});
// setup cors
const allowedOrigins = ["http://localhost:5173"];
// const options: cors.CorsOptions = {
//   // origin: allowedOrigins,
//   origin: allowedOrigins,
// };
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: "http://35.180.254.36:3004",
}));
// const allowedOrigins = ["http://localhost:5173/", "http://localhost:5174/"];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// app.use(cors(options));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use("/users", User_1.default);
app.use("/budget", auth_1.auth, Budget_1.default);
// app.listen(port, () => {
//   console.log(`[Server]: I am running at http://localhost:${port}`);
// });
const server = app.listen(port, "0.0.0.0", () => {
    var _a;
    const address = (_a = server.address) === null || _a === void 0 ? void 0 : _a.call(server);
    if (address) {
        console.log(`Server is running on :${port}`);
    }
    else {
        console.error(`Failed to get server address`);
    }
});
