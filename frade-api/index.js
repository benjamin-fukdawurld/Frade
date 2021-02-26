const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const cors = require("cors");
const googleTrends = require("google-trends-api");
const yahooFinance = require("yahoo-finance");

dotenv.config();
const hostName = process.env.SERVER_HOST || "127.0.0.1";
const port = parseInt(process.env.SERVER_PORT || "5000", 10);

const app = express();

app.use(cors());
app.get("/trends/:corp", (req, res) => {
    googleTrends
        .interestOverTime({ keyword: req.params.corp })
        .then(function (results) {
            results = JSON.parse(results).default.timelineData.map((data) => {
                return { timestamp: data.time, value: data.value[0] };
            });
            res.send(results);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.get("/finance", (req, res) => {
    console.log("ici");
    yahooFinance.quote(
        {
            symbol: "AMD",
            modules: ["price", "summaryDetail"], // see the docs for the full list
        },
        function (err, quotes) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(quotes);
            }
        }
    );
});

const server = http.createServer(app);

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});
