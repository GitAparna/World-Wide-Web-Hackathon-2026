const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;
    let changed = false;

    // Remove Annual Report from the footer
    let newContent = content.replace(/<a class="hover:text-slate-400 transition-colors" href="annual-report\.html">Annual Report<\/a>\s*/g, '');
    newContent = newContent.replace(/<a[^>]*href="annual-report\.html"[^>]*>Annual Report<\/a>\s*/g, '');

    // To avoid accidentally deleting the one in the hero section, the above regex relies on the exact matching of the footer link classes and text.
    // Wait, in index.html, the hero link is "Now Live: Annual Report". The regex looks for >Annual Report</a>, so it won't match the hero section.

    if (newContent !== content) {
        content = newContent;
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Removed Annual Report from footer in ${file}`);
    }
});
