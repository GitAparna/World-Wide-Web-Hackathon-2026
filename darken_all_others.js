const fs = require('fs');

const files = [
    'privacy.html',
    'terms.html',
    'briefing.html',
    'partner-details.html',
    'asset-details.html',
    'environmental-impact.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // 1. Enforce dark mode on HTML
        content = content.replace(/<html lang="en">/g, '<html lang="en" class="dark">');

        // 2. Base Background
        content = content.replace(/bg-background-light/g, 'bg-slate-900 dark:bg-slate-900');
        // specifically for privacy/terms which had bg-slate-50 or bg-white
        content = content.replace(/bg-slate-50 dark:bg-transparent/g, 'bg-slate-900');
        content = content.replace(/bg-slate-50/g, 'bg-slate-900');
        content = content.replace(/bg-white max-w-4xl/g, 'bg-slate-900 max-w-4xl border border-white/10');

        // 3. Fix the header text ("Montgomery Circular Tech" needs to be white if it was dark)
        content = content.replace(/<h2[\s\S]*?class="[^"]*text-slate-900 group-hover:text-primary[^"]*"[\s\S]*?>[\s\S]*?Montgomery Circular Tech<\/h2>/g,
            '<h2 class="text-lg font-bold leading-tight tracking-tight text-white group-hover:text-slate-300 transition-colors">Montgomery Circular Tech</h2>');
        content = content.replace(/<h2[\s\S]*?class="[^"]*text-slate-900 group-hover:text-blue-400[^"]*"[\s\S]*?>[\s\S]*?Montgomery Circular Tech<\/h2>/g,
            '<h2 class="text-lg font-bold leading-tight tracking-tight text-white group-hover:text-slate-300 transition-colors">Montgomery Circular Tech</h2>');

        content = content.replace(/text-slate-900 group-hover:text-primary/g, 'text-white group-hover:text-slate-300');

        // Fix bank icon background
        content = content.replace(/bg-white\/20 text-slate-900/g, 'bg-white/20 text-white');

        // 4. Change bright blue (primary) to black navy (#0A1128)
        content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
        content = content.replace(/border-primary/g, 'border-[#0A1128]');
        // Only change text-primary to text-slate-300 if it's not inside a hover state or specifically something that shouldn't be dark
        content = content.replace(/text-primary-dark/g, 'text-slate-300');
        content = content.replace(/text-primary/g, 'text-white');

        // 5. Fix text colors (titles that are completely dark slate-900 to white)
        // General paragraph texts
        content = content.replace(/class="([^"]*)text-slate-900([^"]*)"/g, 'class="$1text-white$2"');
        content = content.replace(/class="([^"]*)text-slate-800([^"]*)"/g, 'class="$1text-slate-200$2"');
        content = content.replace(/class="([^"]*)text-slate-700([^"]*)"/g, 'class="$1text-slate-300$2"');

        // 6. Make buttons readable
        content = content.replace(/text-background-dark/g, 'text-white');

        // Buttons on privacy/terms that were blue might have white text
        // "Back to Portal" button
        content = content.replace(/'index\.html'/g, `'index.html'`);

        // Specifically fix any lingering bg-[#0A1128] buttons with invisible text
        content = content.replace(/bg-\[#0A1128\] text-slate-900/g, 'bg-[#0A1128] text-white border border-white/20 hover:border-white/40');

        fs.writeFileSync(file, content);
        console.log(`Successfully enforced dark theme on ${file}`);
    }
});
