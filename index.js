import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const result = response.data;
    res.render("index.ejs", { data: result, error: null });
  } catch (error) {
    console.log("Failed to make request:", error.message);
    res.render("index.ejs", { data: null, error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const category = req.body.category;
    const jokeType = req.body.jokeType;
    const amount = req.body.amount;

    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=${jokeType}&amount=${amount}`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result, error: null,category:category,type:jokeType,amount:amount });
  } catch (error) {
    console.log("Failed to make request:", error.message);
    res.render("index.ejs", { data: null, error: "No activities match your criteria" });
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
