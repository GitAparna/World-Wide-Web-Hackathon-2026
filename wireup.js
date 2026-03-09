const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // 1. Wire up Avatars
    // Match line with data-alt="User profile avatar"
    const avatarRegex = /<div\s+class="([^"]*rounded-full[^"]*)"\n?\s*data-alt="User profile avatar/g;
    content = content.replace(avatarRegex, (match, classes) => {
        if (classes.includes('cursor-pointer')) return match;
        return `<div onclick="window.location.href='user-profile.html'" class="${classes} cursor-pointer"\n            data-alt="User profile avatar`;
    });

    // Some avatars might be all on one line or slightly different, so a fallback:
    content = content.replace(/data-alt="User profile avatar[^"]*"/g, (match) => {
        return match + ` onclick="window.location.href='user-profile.html'" style="cursor:pointer;"`;
    });

    // 2. Data Sources in data-flows.html
    if (file === 'data-flows.html') {
        content = content.replace(/cursor-pointer group"/g, `cursor-pointer group" onclick="window.location.href='partner-details.html'"`);
    }

    // 3. Hardware Exchange table rows
    if (file === 'hardware-exchange.html') {
        content = content.replace(/<tr class="hover:bg-primary\/5 transition-colors">/g,
            `<tr class="hover:bg-primary/5 transition-colors cursor-pointer" onclick="window.location.href='asset-details.html'">`);
    }

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
console.log('Wireup complete.');
