const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;

    // Replace border-primary or border-[#0A1128] with border-white for the avatar
    content = content.replace(/border-2 border-primary cursor-pointer/g, 'border-2 border-white cursor-pointer');
    content = content.replace(/border-2 border-\[#0A1128\] cursor-pointer/g, 'border-2 border-white cursor-pointer');

    // Replace the blue hover shadow with a white hover shadow
    content = content.replace(/hover:shadow-\[0_0_12px_rgba\(23,84,207,0\.35\)\]/g, 'hover:shadow-[0_0_12px_rgba(255,255,255,0.35)]');

    // In user-profile.html, the big avatar has border-4 border-[#0A1128]/20 or border-primary
    content = content.replace(/border-4 border-\[#0A1128\]\/20/g, 'border-4 border-white');
    content = content.replace(/border-4 border-primary\/20/g, 'border-4 border-white');
    content = content.replace(/border-4 border-primary/g, 'border-4 border-white');

    if (content.length !== originalLength || content !== fs.readFileSync(path.join(dir, file), 'utf8')) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated avatar border in ${file}`);
    }
});
