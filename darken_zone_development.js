const fs = require('fs');

let file = 'zone-development.html';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Enforce dark mode on HTML
    content = content.replace(/<html lang="en">/g, '<html lang="en" class="dark">');

    // 2. Base Background
    content = content.replace(/bg-background-light/g, 'bg-slate-900 dark:bg-slate-900');
    content = content.replace(/bg-slate-50 dark:bg-slate-900 dark:bg-\[radial-gradient[^"]*\]/g, 'bg-slate-900 dark:bg-slate-900'); // clean up main area background if needed

    // 3. Fix the header text ("Montgomery Circular Tech" needs to be white)
    content = content.replace(/<h2[\s\S]*?class="[^"]*text-slate-900 group-hover:text-primary[^"]*"[\s\S]*?>[\s\S]*?Montgomery Circular Tech<\/h2>/g,
        '<h2 class="text-lg font-bold leading-tight tracking-tight text-white group-hover:text-slate-300 transition-colors">Montgomery Circular Tech</h2>');

    // Also fix the little bank logo icon in the header
    content = content.replace(/bg-white\/20 text-slate-900/g, 'bg-white/20 text-white');

    // 4. Change bright blue (primary) to black navy (#0A1128) across the rest of the file
    content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
    content = content.replace(/text-primary/g, 'text-slate-400');
    content = content.replace(/border-primary/g, 'border-[#0A1128]');
    content = content.replace(/border-primary-dark/g, 'border-[#0A1128]');

    // 5. Fix big headers that might be dark slate
    content = content.replace(/text-slate-900/g, 'text-white');

    // 6. Make the buttons real
    // Share Button
    const shareReplacement = `onclick="navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');"`;
    content = content.replace(/onclick="window\.location\.href='zone-development\.html'"(?=\s*>\s*<span class="material-symbols-outlined">share<\/span>)/g, shareReplacement);

    // Export Button
    const exportReplacement = `onclick="window.print();"`;
    content = content.replace(/onclick="window\.location\.href='data-flows\.html'"(?=\s*>\s*<span class="material-symbols-outlined">download<\/span>)/g, exportReplacement);

    // Make export button text readable
    content = content.replace(/text-background-dark/g, 'text-white');

    fs.writeFileSync(file, content);
    console.log(`Successfully enforced dark theme and black branding, and wired up buttons on ${file}`);
}
