const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Fix the back button generated earlier.
    content = content.replace(/<button onclick="window.history.back\(\)"/g, '<a href="index.html"');
    content = content.replace(/Return to Previous Page\s*<\/button>/g, 'Return to Home\n            </a>');

    // Fallback: If job forecast didn't look right, let's make sure it's an anchor.
    content = content.replace(/<a href="index.html" class="group flex/g, '<a href="index.html" class="inline-flex group flex');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
console.log('Fixed back buttons.');
