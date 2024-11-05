import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { PORT } from './config/veriables.js';
import { connectDB } from './config/dbConfig.js';

const app = express();
const httpServer = createServer(app);

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

await connectDB();
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})