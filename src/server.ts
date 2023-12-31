import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.get("/", async (_req, res) => {
    try {
        const lastEntry = await client.query(
            "SELECT * FROM timestamptable ORDER BY time_stamp DESC LIMIT 1;"
        );
        res.status(200).json(lastEntry.rows);
        console.log(lastEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error has occured!!!");
    }
});

app.post("/", async (_req, res) => {
    try {
        await client.query(
            "INSERT INTO timestamptable (time_stamp) VALUES (CURRENT_TIMESTAMP);"
        );
        res.status(201).json({ status: "It worked" });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error has occurred");
    }
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    console.log("Attempting to connect to db");
    await client.connect();
    console.log("Connected to db!");

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}

//////////////
/////////////
