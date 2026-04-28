const cors = require('cors');
const express = require('express');
const connectDB = require('./DB/db')
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.route");
const updateRoutes = require("./routes/update.route");
const turnamentRoute = require("./routes/turnament.route");
const schoolRoutes = require("./routes/school.route");
const authRoutes = require('./routes/authRoute');
const EventRoute = require("./routes/event.route");
const compression = require("compression");
const individualRoutes = require("./routes/individual.route");


const allowedOrigins = [
  "https://khel-panchayat.vercel.app",
  "https://sport-super-admin-frontend.vercel.app",
  "https://panchayat-khel.vercel.app",
  "https://sport-super-admin.vercel.app",
  "https://www.ekpanchayatekkhelchuru.in",
  "https://www.admin.ekpanchayatekkhelchuru.in",
  "http://localhost:5173",
];


app.use(compression())

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));




app.use(cookieParser());

connectDB();

app.use(express.json());



app.get("/", (req, res) => {
    res.send("server is running successfully")
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/updates", updateRoutes);

app.use("/api/turnament" , turnamentRoute)

app.use("/api/school", schoolRoutes);

app.use("/api/event", EventRoute);

app.use("/api/individual-users", individualRoutes);

module.exports = app;


// get /api/school/students se sare student aa jate h or  get /api/turnament/get se sare turnament aa ate h or post /api/turnament/register-school se use turnament mai registration hota h 
