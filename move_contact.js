const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;
    let changed = false;

    // 1. Move Contact from Footer to Header

    // Remove from footer links (if exists in a flex container of links)
    let newContent = content.replace(/<a class="hover:text-slate-400 transition-colors" href="briefing\.html">Contact<\/a>\s*/g, '');
    newContent = newContent.replace(/<a[^>]*href="briefing\.html"[^>]*>Contact<\/a>\s*/g, '');

    if (newContent !== content) {
        content = newContent;
        changed = true;
    }

    // Add Contact link to header right before the avatar
    // Look for the avatar container in the header
    const headerAvatarPatternIndex = /<div class="flex items-center justify-end gap-4">[\s]*<div class="bg-cover bg-center size-10/g;
    const headerAvatarPatternOther = /<div class="flex items-center gap-4">[\s]*<div class="bg-cover bg-center size-10/g;

    if (headerAvatarPatternIndex.test(content)) {
        content = content.replace(headerAvatarPatternIndex, `<div class="flex items-center justify-end gap-4">\n                <a href="briefing.html" class="text-white font-bold text-sm tracking-wide hover:text-slate-300 transition-colors mr-2">Contact</a>\n                <div class="bg-cover bg-center size-10`);
        changed = true;
    } else if (headerAvatarPatternOther.test(content)) {
        content = content.replace(headerAvatarPatternOther, `<div class="flex items-center gap-4">\n                <a href="briefing.html" class="text-white font-bold text-sm tracking-wide hover:text-slate-300 transition-colors mr-2">Contact</a>\n                <div class="bg-cover bg-center size-10`);
        changed = true;
    }

    // 2. Change homepage "Now Live: 2026 Impact Report" to "Now Live: Annual Report" and make clickable
    if (file === 'index.html' || file === 'original_index.html') {
        const reportPattern = /<span\s*class="([^"]*?bg-\[#0A1128\]\/10 text-slate-400[^"]*?)"\s*>[\s]*Now Live: 2026 Impact Report[\s]*<\/span>/g;

        // The exact match might be split on lines
        const reportPatternMultiline = /<span([\s\S]*?)Now Live: 2026 Impact Report([\s\S]*?)<\/span>/g;

        content = content.replace(reportPatternMultiline, (match, p1, p2) => {
            // Only target the one that looks like a tag
            if (p1.includes('bg-[#0A1128]/10') || p1.includes('rounded-full')) {
                // we will replace <span ...> with <a href="annual-report.html" ...>
                let className = p1.match(/class="([^"]+)"/);
                let cls = className ? className[1] : '';
                // Add hover effect and cursor pointer
                cls = cls + ' cursor-pointer hover:bg-white/10 hover:text-white transition-all text-white border-white/20';

                return `<a href="annual-report.html"${p1.replace(/class="[^"]+"/, `class="${cls}"`)}>Now Live: Annual Report${p2}</a>`;
            }
            return match;
        });

        // Also try simple replace just in case
        content = content.replace(/Now Live: 2026 Impact Report/g, 'Now Live: Annual Report');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated footer/header and Report link in ${file}`);
    }
});
