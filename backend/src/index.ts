import express from "express"
import routesUser from "./routes/routesUser";

const app = express()
app.use(express.json());

app.use(routesUser)

export default app;