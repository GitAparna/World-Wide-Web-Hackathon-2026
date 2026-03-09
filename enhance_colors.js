const fs = require('fs');
const glob = require('fs').readdirSync(__dirname).filter(f => f.endsWith('.html'));

const NEW_COLORS = `                    colors: {
                        "primary": "#2563EB", // Vibrant modern blue
                        "primary-dark": "#1D4ED8",
                        "secondary": "#10B981", // Emerald
                        "circular-green": "#059669", // Deeper emerald
                        "accent": "#8B5CF6", // Violet pop
                        "background-dark": "#0F172A", // Rich slate dark
                        "background-light": "#F8FAFC", // Clean light
                    },`;

for (const file of glob) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Update colors in Tailwind config
    content = content.replace(/colors:\s*\{[\s\S]*?"background-light"[^\}]*\},/i, NEW_COLORS);

    // 2. Make Header appealing (Home page + dashboards)
    // Find header
    content = content.replace(/<header\s+class="([^"]*)bg-white dark:bg-background-dark([^"]*)"/g, (match, p1, p2) => {
        return `<header class="${p1}bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm${p2}"`;
    });
    // also replace if it doesn't match perfectly
    content = content.replace(/bg-white dark:bg-slate-900 px-4 py-6/g, 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg px-4 py-6');

    // 3. Add subtle gradients to the dashboard main background
    content = content.replace(/bg-background-light dark:bg-slate-[0-9]+\/[0-9]+/g, 'bg-slate-50 dark:bg-slate-900 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-slate-800 dark:to-slate-950');
    content = content.replace(/bg-background-light dark:bg-transparent/g, 'bg-slate-50 dark:bg-transparent');

    // 4. Enhance cards on the dashboard (data-flows.html, etc.) for better contrast
    content = content.replace(/bg-white dark:bg-background-dark\/80 p-6 rounded-xl border border-primary\/10 shadow-sm/g, 'bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-md hover:shadow-lg hover:border-primary/20 transition-all backdrop-blur-sm');

    // 5. Enhance title gradients
    content = content.replace(/<h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">/g,
        '<h1 class="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primary to-accent dark:from-white dark:via-blue-200 dark:to-purple-200 tracking-tight">');

    // 6. Make Hero title (Home page) have a nice gradient too
    content = content.replace(/Montgomery <span class="text-primary">Circular<\/span> Tech/g,
        'Montgomery <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Circular</span> Tech');

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Applied enhanced colors, gradients, and headers to all pages.');
