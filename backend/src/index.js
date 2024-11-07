import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PORT } from './config/veriables.js';
import { connectDB } from './config/dbConfig.js';
import userRouter from './routes/v1/user.route.js';
import swaggerDocs from '../swagger.js';
import swaggerUi from 'swagger-ui-express';


const app = express();
const httpServer = createServer(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

app.use(cors())
app.use(express.json())
app.get("/ping", (_req, res) => {
    res.json({ message: "pong" })
})
app.use("/api/v1/user", userRouter);

await connectDB();
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})