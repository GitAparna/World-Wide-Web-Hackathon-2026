const fs = require('fs');

let file = 'user-profile.html';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Make the whole page dark themed
    content = content.replace(/<html lang="en">/g, '<html lang="en" class="dark">');

    // 2. Fix the header text - Montgomery Circular Tech is currently text-slate-900 leading to it being invisible on dark header
    content = content.replace(/<h2 class="text-lg font-bold leading-tight tracking-tight text-slate-900 group-hover:text-slate-400 dark:text-slate-300 transition-colors">Montgomery Circular Tech<\/h2>/g,
        '<h2 class="text-lg font-bold leading-tight tracking-tight text-white group-hover:text-slate-300 transition-colors">Montgomery Circular Tech</h2>');

    // Also just in case the first script was reverted, fix any other text-slate-900 in the header.
    // Replace body background
    content = content.replace(/bg-background-light/g, 'bg-slate-900 dark:bg-slate-900');

    fs.writeFileSync(file, content);
    console.log(`Successfully enforced dark theme out on ${file} and fixed text visibility.`);
}
