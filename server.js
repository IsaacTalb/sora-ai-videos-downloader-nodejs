const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/extract', async (req, res) => {
    const pageUrl = req.body.url;
    if (!pageUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(pageUrl, { waitUntil: 'networkidle2' });

        // Wait for the <video> element to be present
        const videoElement = await page.$('video');
        let videoUrl = null;
        if (videoElement) {
            videoUrl = await page.evaluate((element) => element.src, videoElement);
        }

        await browser.close();

        if (videoUrl) {
            res.json({ videoUrl });
        } else {
            res.status(404).json({ error: 'Video URL not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to extract video URL' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});