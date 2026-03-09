const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the icon background sitting inside the header
    content = content.replace(/bg-primary\/20 text-primary/g, 'bg-white/20 text-white');

    // Make sure to write file back
    fs.writeFileSync(file, content, 'utf8');
}

console.log("Fixed icon contrast within the header");
