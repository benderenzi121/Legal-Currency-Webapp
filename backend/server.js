const express = require("express"),
    connectDB = require("../config/db"),
    cors = require("cors"),
    app = express(),
    PORT = process.env.PORT || 5000;

connectDB();

// const corsMiddleware = (req, res, next) => {
//     //todo: this will only work locally when deploying will need to change
//     const allowedOrigins = ["http://localhost:5000", "http://localhost:8080", "https://www.sandbox.paypal.com/"];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//     }
//     res.header("Access-Control-Allow-Methods", "*"); // or exact http methods like "GET, OPTIONS"
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     return next();
// };

const whitelist = ["http://localhost:5000", "http://localhost:8080", "https://www.sandbox.paypal.com/"];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors());
// app.use(corsMiddleware);
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/shipping", require("./routes/shipping"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));

app.use("/paypal", require("./routes/paypal"));

app.get("/", (req, res) => res.send("API is runnig"));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
