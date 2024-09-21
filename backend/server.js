import express from "express";
import puppeteer from "puppeteer";
import fs from "fs"

const app = express();
app.use(express.json());

// Utility to check if cookies exist
const cookiesExist = () => {
  return fs.existsSync('./cookies.json');
};


app.get("/", (req, res) => {
  res.send("Server working");
});

app.post('/instagram', async (req,res)=>{

  const {profileLink} = req.body
  
  if (cookiesExist()) {

    const browser = await puppeteer.launch({ headless: true }); // Make headless: true for background operation
    const page = await browser.newPage();
    // If cookies exist, load them and go to the username profile page
    console.log('Loading existing cookies...');
    const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf-8'));
    await page.setCookie(...cookies);
    

    // Navigate to the Instagram profile page
    await page.goto(profileLink, { waitUntil: 'networkidle2' });
    
    // Scrape profile information
    const profileData = await page.evaluate(() => {
      const name = document.querySelector('header section:nth-child(2) div div div div a h2 span')?.innerText;
      const bio = document.querySelector('header section:nth-child(4) div span div span')?.innerText;
      const postCount = document.querySelector('header section:nth-child(3) ul li:nth-child(1) div span')?.innerText;
      const followers = document.querySelector('header section:nth-child(3) ul li:nth-child(2) div a span')?.getAttribute('title');
      const following = document.querySelector('header section:nth-child(3) ul li:nth-child(3) div a span span')?.innerText;

      return { name, bio, postCount, followers, following };
    });

    console.log('Profile Data:', profileData);
    await browser.close();
    res.json(profileData); // Send the scraped data as JSON
  } else {
    // If no cookies exist, log in manually and save cookies
    console.log('No cookies found. Logging in manually...');
    const browser = await puppeteer.launch({ headless: false }); // Make headless: true for background operation
    const page = await browser.newPage();
    
    await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: 'networkidle2' });

    // Wait for navigation after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Save cookies after login
    const cookies = await page.cookies();
    fs.writeFileSync('./cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved.');

    // Navigate to the Instagram profile page after login
    await page.goto(profileLink, { waitUntil: 'networkidle2' });

    // Scrape profile information
    const profileData = await page.evaluate(() => {
      const name = document.querySelector('header section:nth-child(2) div div div div a h2 span')?.innerText;
      const bio = document.querySelector('header section:nth-child(4) div span div span')?.innerText;
      const postCount = document.querySelector('header section:nth-child(3) ul li:nth-child(1) div span')?.innerText;
      const followers = document.querySelector('header section:nth-child(3) ul li:nth-child(2) div a span')?.getAttribute('title');
      const following = document.querySelector('header section:nth-child(3) ul li:nth-child(3) div a span span')?.innerText;

      return { name, bio, postCount, followers, following };
    });
    console.log('Profile Data:', profileData);
    await browser.close()
    res.json(profileData); // Send the scraped data as JSON
  }

})



app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
