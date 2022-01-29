import express from "express"
import cors from "cors"
import dotenv from "dotenv"

if (process.env.NOVE_ENV != "PRODUCTION") dotenv.config();

//initializare server
const server = express();
const router = express.Router();

//utilitare
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use("/api", router);

const port = process.env.PORT || 8000;
server.listen(port, function aferServerStart() {
    console.log(`Server is running on port ${port}...`);
});


export { server, router };