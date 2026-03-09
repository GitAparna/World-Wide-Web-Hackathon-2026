const fs = require('fs');

const files = ['index.html', 'original_index.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Enforce dark mode on HTML
    content = content.replace(/<html lang="en">/g, '<html lang="en" class="dark">');

    // Replace background-dark/light with dark #0A1128
    content = content.replace(/bg-background-light dark:bg-background-dark/g, 'bg-[#0A1128]');

    // Update nav to #0A1128
    content = content.replace(/bg-white dark:bg-slate-900/g, 'bg-[#0A1128]');

    // Remove rogue 'dark' from body class
    content = content.replace(/dark transition-colors/g, 'transition-colors');

    // Make the hero section backgrounds dark for the images
    content = content.replace(/bg-slate-200 dark:bg-slate-800/g, 'bg-[#0A1128]');

    // Make the "primary" blue elements black/dark navy
    content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
    content = content.replace(/text-primary/g, 'text-slate-400');
    content = content.replace(/border-primary/g, 'border-[#0A1128]');

    // Ensure the body text is generally white instead of dark slate-900
    content = content.replace(/text-slate-900 dark:text-slate-100/g, 'text-white');
    content = content.replace(/text-slate-900 dark:text-white/g, 'text-white');

    // The official-seal-bg had a blue tint (37, 99, 235), let's make it a subtle white/slate tint for dark mode
    content = content.replace(/rgba\(37, 99, 235,/g, 'rgba(255, 255, 255,');

    // Make sure buttons have visible text
    content = content.replace(/class="flex min-w-\[160px\]([^"]*)bg-\[#0A1128\] text-white/g, 'class="flex min-w-[160px]$1bg-[#0A1128] border border-white/20 hover:border-white/40 text-white');

    fs.writeFileSync(file, content);
    console.log(`Fixed theme on ${file}`);
});
