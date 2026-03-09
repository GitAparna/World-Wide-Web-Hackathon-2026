const fs = require('fs');
const path = require('path');

const dirPath = __dirname;

fs.readdirSync(dirPath).forEach(filename => {
    if (!filename.endsWith('.html')) return;
    const filepath = path.join(dirPath, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace the logo div with an anchor tag pointing to index.html
    // E.g. <div class="flex items-center gap-3 ..."> ... <h2 ...>Montgomery Circular Tech</h2></div>
    content = content.replace(
        /<div([^>]*class="[^"]*flex items-center gap-[2348][^"]*"[^>]*)>([\s\S]*?)<h[12]([^>]*)>.*Montgomery.*<\/h[12]>\s*<\/div>/gi,
        (match, divAttrs, innerContent, hAttrs) => {
            // Check if it's already an anchor
            if (divAttrs.includes('<a') || match.includes('<a')) return match;

            // Just replace the opening <div and closing </div> with <a href="index.html" and </a>
            return `<a href="index.html"${divAttrs}>${innerContent}<h2${hAttrs}>Montgomery Circular Tech</h2></a>`;
        }
    );

    // Also replace in footers:
    // <div class="flex items-center gap-3"> ... <span class="font-bold text-slate-900 dark:text-slate-100">Montgomery Circular Tech</span> </div>
    content = content.replace(
        /<div([^>]*class="[^"]*flex items-center gap-[234][^"]*"[^>]*)>([\s\S]*?)<span([^>]*class="[^"]*font-bold[^"]*Montgomery[^"]*"[^>]*)>Montgomery Circular Tech<\/span>\s*<\/div>/gi,
        (match, divAttrs, innerContent, hAttrs) => {
            if (divAttrs.includes('<a') || match.includes('<a')) return match;
            return `<a href="index.html"${divAttrs}>${innerContent}<span${hAttrs}>Montgomery Circular Tech</span></a>`;
        }
    );

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Logos updated to link back to index.html.");
