const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const contactIconNew = `<a href="briefing.html"
                    class="flex items-center justify-center p-2 rounded-lg border border-white/10 text-slate-300 hover:border-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all mr-2"
                    title="Contact">
                    <span class="material-symbols-outlined text-xl">mail</span>
                </a>`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let originalLength = content.length;

    // 1. Convert Text "Contact" into Icon
    content = content.replace(/<a href="briefing.html" class="text-white font-bold text-sm tracking-wide hover:text-slate-300 transition-colors mr-2">Contact<\/a>/g, contactIconNew);
    content = content.replace(/<a href="briefing.html" class="text-white font-bold text-sm tracking-wide hover:text-slate-300 transition-colors mr-2">\n?\s*Contact\n?\s*<\/a>/g, contactIconNew);

    // 2. Fix the hover effect on the left Back arrow to be consistent white glow
    content = content.replace(/hover:border-primary hover:text-white hover:bg-\[#0A1128\]\/20/g, 'hover:border-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]');
    content = content.replace(/hover:border-\[#0A1128\] hover:text-white hover:bg-\[#0A1128\]\/20/g, 'hover:border-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]');
    content = content.replace(/hover:border-white\/10 text-slate-300 hover:border-white\/50/g, 'border-white/10 text-slate-300 hover:border-white/50'); // cleanup any dupes

    // 3. Update the left Title and Icon to exactly match the look the user wants
    // the user's screenshot has: "bg-white/20" rounded container for the seal
    if (file === 'index.html' || file === 'original_index.html') {
        // It currently has: <div class="text-white flex size-10 shrink-0 items-center justify-center bg-[#0A1128] rounded-lg shadow-md shadow-primary/20">
        content = content.replace(/<div\n\s*class="text-white flex size-10 shrink-0 items-center justify-center bg-\[#0A1128\] rounded-lg shadow-md shadow-primary\/20">/g, '<div class="flex items-center justify-center p-2 rounded-lg bg-white/20 text-white shrink-0">');
    }

    // Double check and fix any other occurrences across files
    content = content.replace(/p-2 rounded-lg border border-white\/10 text-slate-300 hover:border-primary/g, 'p-2 rounded-lg border border-white/10 text-slate-300 hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-white/10 hover:text-white');

    if (content.length !== originalLength || content !== fs.readFileSync(path.join(dir, file), 'utf8')) {
        fs.writeFileSync(path.join(dir, file), content, 'utf8');
        console.log(`Updated header icons in ${file}`);
    }
});
