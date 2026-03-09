const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// Regex to capture the entire button element containing window.close()
const buttonRegex = /<button[^>]*onclick="window\.close\(\)"[\s\S]*?<\/button>/g;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    if (buttonRegex.test(content)) {
        console.log(`Removing from ${file}`);
        content = content.replace(buttonRegex, '');
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Removed \'Close Tab\' buttons from all HTML files.');
