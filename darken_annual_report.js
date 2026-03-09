const fs = require('fs');

let file = 'annual-report.html';
if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Enforce dark mode
    content = content.replace(/<html lang="en">/g, '<html lang="en" class="dark">');

    // 2. Base Background
    content = content.replace(/bg-background-light/g, 'bg-slate-900 dark:bg-slate-900');

    // 3. Fix the header text ("Montgomery Circular Tech" needs to be white)
    content = content.replace(/<h2[\s\S]*?class="[^"]*text-slate-900 group-hover:text-primary[^"]*"[\s\S]*?>[\s\S]*?Montgomery Circular Tech<\/h2>/g,
        '<h2 class="text-lg font-bold leading-tight tracking-tight text-white group-hover:text-slate-300 transition-colors">Montgomery Circular Tech</h2>');

    // Also fix the little bank logo icon in the header
    content = content.replace(/bg-white\/20 text-slate-900/g, 'bg-white/20 text-white');

    // 4. Change bright blue (primary) to black navy (#0A1128) across the rest of the file
    content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
    content = content.replace(/text-primary/g, 'text-slate-300 dark:text-slate-300');
    content = content.replace(/border-primary/g, 'border-[#0A1128]');

    // 5. Fix text colors for dark mode context
    // Change large dark text (like "2026 Annual Report" and other text-slate-900) to white
    content = content.replace(/text-slate-900/g, 'text-white');

    // Make sure 'text-slate-300' wasn't messed up
    content = content.replace(/text-white dark:text-slate-300/g, 'text-slate-300');

    fs.writeFileSync(file, content);
    console.log(`Successfully enforced dark theme and black branding on ${file}`);
}
