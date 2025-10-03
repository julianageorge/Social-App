"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const module_1 = require("./module");
const DB_1 = require("./DB");
function bootstrap(app, express) {
    (0, DB_1.connectDB)();
    app.use(express.json());
    app.use("/auth", module_1.authRouter);
    app.use("/user", module_1.userRouter);
    app.use("/post", module_1.postRouter);
    app.use("/comment", module_1.CommentRouter);
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "Invalid router", success: false });
    });
    app.use((err, req, res, next) => {
        return res.status(err.statusCode || 500).json({ message: err.message, errorDetails: err.errorDetails, success: false });
    });
}
