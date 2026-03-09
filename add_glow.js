const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const borderRegexes = [
    {
        // index.html cards
        find: /border border-slate-200 dark:border-slate-800/g,
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
    },
    {
        // index.html hover states
        find: /hover:shadow-lg hover:border-\[#0A1128\]\/40/g,
        replace: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50'
    },
    {
        // job forecast and other standard dark cards
        find: /border border-white\/10 shadow-sm(?!.*overflow-hidden)/g, // avoid iframes
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all'
    },
    {
        // fix brief card glow where it already had "border border-white/10 shadow-sm hover:border-[#0A1128]/50 transition-colors"
        find: /border border-white\/10 shadow-sm flex items-center justify-between group hover:border-\[#0A1128\]\/50 transition-colors/g,
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] flex items-center justify-between group hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all'
    },
    {
        find: /border border-[#0A1128]\/10 shadow-sm relative overflow-hidden group/g,
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all relative overflow-hidden group'
    },
    {
        find: /border border-white\/10 shadow-sm overflow-hidden/g,
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all overflow-hidden'
    },
    {
        find: /border border-[#0A1128]\/10 shadow-sm/g,
        replace: 'border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all'
    }
];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;
    let changed = false;

    borderRegexes.forEach(rule => {
        let newContent = content.replace(rule.find, rule.replace);
        if (newContent !== content) {
            content = newContent;
            changed = true;
        }
    });

    // some cards had "border border-white/10 shadow-sm transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:border-white/50 transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
    // just cleanup
    content = content.replace(/transition-all transition-all/g, 'transition-all');

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Added white outline and glow in ${file}`);
    }
});
