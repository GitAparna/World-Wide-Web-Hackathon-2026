const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;

    // Increase default glow intensity from 0.05 to 0.15, size to 20px
    content = content.replace(/shadow-\[0_0_15px_rgba\(255,255,255,0\.05\)\]/g, 'shadow-[0_0_20px_rgba(255,255,255,0.15)]');

    // Increase hover glow intensity from 0.2 to 0.4, size to 30px
    content = content.replace(/hover:shadow-\[0_0_25px_rgba\(255,255,255,0\.2\)\]/g, 'hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]');

    // Also make the border slightly more visible on hover (white/50 to white/70)
    content = content.replace(/hover:border-white\/50/g, 'hover:border-white/70');

    // Ensure border-white/20 is strong enough (maybe make it white/30)
    content = content.replace(/border border-white\/20/g, 'border border-white/30');

    if (content.length !== originalLength || content !== fs.readFileSync(path.join(dir, file), 'utf8')) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Intensified white glow in ${file}`);
    }
});
