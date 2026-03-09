const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;
    let changed = false;

    // Sidebar hover bug fix (remove primary/blue hover)
    let newContent = content.replace(/hover:bg-primary\/20/g, 'hover:bg-white/10');

    // Sidebar active bug fix
    newContent = newContent.replace(/bg-primary\/20 text-primary/g, 'bg-white/10 text-white');
    newContent = newContent.replace(/text-primary group-hover:text-primary/g, 'text-white group-hover:text-white');

    // Sub-navigation container styling
    // <div class="bg-slate-100 dark:bg-slate-900 px-6 lg:px-10 py-3 border-b border-slate-200 dark:border-primary-dark shadow-inner flex gap-8 items-center">
    newContent = newContent.replace(/bg-slate-100 dark:bg-slate-900 [^>]*border-slate-200 dark:border-primary-dark[^>]*flex gap-8/g,
        (match) => match.replace(/bg-slate-100 dark:bg-slate-900/g, 'bg-[#0A1128]')
            .replace(/border-slate-200 dark:border-primary-dark/g, 'border-white/10'));

    // Active sub-navigation item
    // text-sm font-bold text-white border-b-2 border-primary pb-1
    newContent = newContent.replace(/border-b-2 border-primary/g, 'border-b-2 border-white');

    // Fix generic text-primary where it shouldn't be (e.g. data flows tabs)
    if (file === 'data-flows.html' || file === 'hardware-exchange.html') {
        newContent = newContent.replace(/text-primary/g, 'text-white');
    }

    // Also replace any other stray blue colors in data-flows.html and hardware-exchange.html
    // such as "from-primary to-blue-600" -> "from-white to-slate-400"
    newContent = newContent.replace(/from-primary to-blue-600/g, 'from-white to-slate-400');
    newContent = newContent.replace(/bg-primary\/20/g, 'bg-white/20');
    newContent = newContent.replace(/text-blue-500/g, 'text-white');

    // Button background: bg-primary hover:bg-blue-700
    newContent = newContent.replace(/bg-primary hover:bg-blue-700/g, 'bg-white text-[#0A1128] hover:bg-slate-200');
    newContent = newContent.replace(/bg-primary/g, 'bg-white');


    if (newContent !== content) {
        fs.writeFileSync(path.join(dir, file), newContent, 'utf8');
        console.log(`Removed local blue from ${file}`);
    }
});
