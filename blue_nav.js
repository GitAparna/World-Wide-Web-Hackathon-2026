const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace the dark slate background we just added with a rich blue primary background
    content = content.replace(/bg-\[#0B1120\]/g, 'bg-primary');

    // Update borders that were previously dark slate to be slightly darker blue
    content = content.replace(/border-slate-800/g, 'border-primary-dark');

    // Ensure any dark-mode specific overrides don't ruin the blue
    content = content.replace(/dark:bg-background-dark\/80/g, '');

    // Make sure header title text is purely white so it contrasts perfectly with the blue background.
    // E.g. in index.html specifically: 
    content = content.replace(/text-slate-900 dark:text-slate-100/g, 'text-white');

    // Make sure the "Back arrow" box is legible on the blue background
    content = content.replace(/border-slate-700 text-slate-300 hover:border-white hover:text-white hover:bg-slate-800/g,
        'border-white/20 text-blue-100 hover:border-white hover:text-white hover:bg-white/10');

    // Make sure navigation sidebar icons matches nicely on blue
    content = content.replace(/text-slate-500 uppercase tracking-\[0\.2em\]/g, 'text-blue-200 uppercase tracking-[0.2em]');
    content = content.replace(/text-slate-300 font-semibold/g, 'text-blue-50 font-semibold');
    content = content.replace(/text-slate-500 group-hover:text-white/g, 'text-blue-300 group-hover:text-white');
    content = content.replace(/hover:bg-white\/10/g, 'hover:bg-white/20');

    fs.writeFileSync(file, content, 'utf8');
}

console.log("Nav and Header are now a sleek Primary Blue!");
