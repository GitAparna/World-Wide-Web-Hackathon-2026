const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Replace avatar URLs with our new avatar.png
    content = content.replace(/https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^'"]+/g, 'avatar.png');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated avatar in ${file}`);
    }
});
console.log('Finished updating avatars.');
