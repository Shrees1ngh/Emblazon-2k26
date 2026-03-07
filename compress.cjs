const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, 'src/assets/events');
const eventsDataPath = path.join(__dirname, 'src/data/eventsData.js');

async function processImages() {
    let eventsDataContent = fs.readFileSync(eventsDataPath, 'utf8');
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        if (!file.match(/\.(png|jpe?g)$/i)) continue;

        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const webpName = `${baseName}.webp`;
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(directoryPath, webpName);

        console.log(`Converting ${file} to ${webpName}...`);
        await sharp(oldPath)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 75, effort: 4 })
            .toFile(newPath);

        fs.unlinkSync(oldPath);

        const searchStr = `../assets/events/${file}`;
        const replaceStr = `../assets/events/${webpName}`;
        eventsDataContent = eventsDataContent.split(searchStr).join(replaceStr);
    }
    fs.writeFileSync(eventsDataPath, eventsDataContent, 'utf8');
    console.log('All images compressed and replaced in eventsData!');
}

processImages().catch(console.error);
