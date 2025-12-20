const express = require("express");
const cors = require('cors');
const { ServerConfig, Logger } = require('./config')
const connectDB = require('./config/db-config');

// Importing PORT from config.js
const app = express();
const apiRoutes = require('./routes');


app.use(cors({
    origin : "https://poke-dex-two-omega.vercel.app"
}
));
app.use(express.json());
async function startServer() {
    app.use('/api', apiRoutes);

    await connectDB();

    app.listen(ServerConfig.PORT, () => {
        console.log(`Listening on port ${ServerConfig.PORT}`);
        Logger.info("Successfully started the Server", {});
    });
}

startServer();
