const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Fix empty background avatars to use avatar.png
    content = content.replace(
        /<div class="([^"]*rounded-full[^"]*)"\n?\s*(onclick="[^"]*")?\n?\s*style="(cursor:pointer;)?"\n?\s*data-alt="User profile avatar abstract green gradient">\s*<\/div>/g,
        `<div class="$1 bg-cover bg-center" $2 style="$3 background-image: url('avatar.png');" data-alt="User profile avatar"></div>`
    );

    // Some cases might have different formatting, try alternative
    content = content.replace(
        /<div[^>]*data-alt="User profile avatar abstract[^>]*><\/div>/g,
        (match) => {
            // inject the background-image and cover classes
            let r = match.replace('class="', 'class="bg-cover bg-center ');
            if (!r.includes('style=')) {
                r = r.replace('>', ` style="background-image: url('avatar.png');">`);
            } else {
                r = r.replace('style="', `style="background-image: url('avatar.png'); `);
            }
            return r;
        }
    );

    // Finally let's build briefing.html
    // I will write this file manually.

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated empty div avatar in ${file}`);
    }
});
