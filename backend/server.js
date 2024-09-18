import express from "express";
import puppeteer from "puppeteer-core";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server working");
});

//instagram scraping route
app.post("/instagram", async (req, res) => {
  const { username, password } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      "https://www.instagram.com/accounts/login/?next=%2Flivein.now%2Ftagged%2F&source=profile_tagged_tab",
      { waitUntil: "networkidle2" }
    );

    await page.type('input[name="username"]', "myUsername"); // Fill the "username" field
    await page.type('input[name="password"]', "myPassword"); // Fill the "password" field

    await page.click('button[type="submit"]'); // Click on the "submit" button
    await page.waitForNavigation();
    console.log("Form submitted!");

    const screenshot = await page.screenshot();
    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
