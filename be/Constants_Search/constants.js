import express from "express";
import { chosungIncludes } from "es-hangul";
import fs from "fs";
import csv from "csv-parser";

var app = express();
const data = [];

fs.createReadStream("../fastapi_app/items.csv")
  .pipe(csv())
  .on("data", (row) => {
    data.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

function search(query) {
  const results = [];
  for (const item of data) {
    console.log(item.name);
    if (chosungIncludes(item.name, query)) {
      results.push(item.name);
    }
  }
  return results;
}

app.get("/search", (req, res) => {
  const query = req.query.q;
  const results = search(query);
  res.send(results);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
