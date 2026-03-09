const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Add class="dark" if it's not already there attached to the HTML tag
    content = content.replace(/<html[^>]*>/i, (match) => {
        // If it already has class, add dark if missing
        if (match.includes('class=')) {
            if (!match.includes('dark')) {
                return match.replace(/class=["'](.*?)["']/, 'class="dark $1"');
            }
            return match;
        } else {
            // Add class="dark"
            return match.replace('<html', '<html class="dark"');
        }
    });

    fs.writeFileSync(file, content, 'utf8');
}

console.log("Enforced dark mode across all Dashboard pages (excluding index.html) to guarantee visibility.");
