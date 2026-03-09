const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const backButtonHtml = `
            <!-- Elegant Back Navigation -->
            <button onclick="window.history.back()" class="group flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all mb-6">
                <div class="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-sm">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                </div>
                Return to Previous Page
            </button>
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // We don't want to add it twice
    if (content.includes('Return to Previous Page')) return;

    if (file === 'job-forecast.html') {
        content = content.replace(
            /(<main class="flex-1 overflow-y-auto p-8">\s*<!-- Header Section -->)/,
            `$1${backButtonHtml}`
        );
    } else if (file === 'environmental-impact.html') {
        content = content.replace(
            /(<div class="max-w-6xl mx-auto space-y-8">\s*<!-- Welcome Section -->)/,
            `$1${backButtonHtml}`
        );
    } else if (file === 'hardware-exchange.html') {
        content = content.replace(
            /(<main class="flex-1 p-6 lg:p-10 space-y-10">\s*<header class="space-y-2">)/,
            `$1${backButtonHtml}`
        );
    } else if (file === 'data-flows.html' || file === 'partner-details.html' || file === 'user-profile.html' || file === 'asset-details.html') {
        // Find after <main ...> and append.
        content = content.replace(
            /(<main class="[^"]*">\s*)/,
            `$1${backButtonHtml}`
        );
    } else if (file === 'zone-development.html') {
        content = content.replace(
            /(<main class="flex-1 max-w-\[1440px\] mx-auto w-full px-6 py-8">\s*)/,
            `$1${backButtonHtml}`
        );
    }

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Added back navigation to ${file}`);
    }
});
console.log('Done adding back buttons.');
