const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove forced light or dark mode on html tag so system preference (dark) applies correctly
    content = content.replace(/<html class="light" lang="en">/g, '<html lang="en">');
    content = content.replace(/<html class="dark" lang="en">/g, '<html lang="en">');

    // 2. Change sidebar and header from 'bg-primary' to a premium dark blue
    // The dark blue will be: bg-[#0A1128]

    // Header replacement (only replacing bg-primary that is part of the header classes)
    content = content.replace(/(<header[^>]*?)bg-primary([^>]*?>)/g, '$1bg-[#0A1128]$2');

    // Sidebar replacement (aside id="app-sidebar")
    content = content.replace(/(<aside[^>]*?)bg-primary([^>]*?>)/g, '$1bg-[#0A1128]$2');

    // 3. Make sure 'bg-[#0A1128]' hasn't lost text-white if needed
    // (Both already specify text-white and text-blue-100/50 so it's fine)
    // Let's also ensure border colors remain sensible on the dark blue
    content = content.replace(/(<header[^>]*?)border-primary([ \/])/g, '$1border-[#1A284D]$2');
    content = content.replace(/(<aside[^>]*?)border-primary-dark([^>]*?>)/g, '$1border-[#1A284D]$2');
    content = content.replace(/(<header[^>]*?)border-primary-dark([^>]*?>)/g, '$1border-[#1A284D]$2');

    fs.writeFileSync(file, content, 'utf8');
}

console.log("Fixed dashboard visibility across all pages and updated to premium dark blue header/sidebar.");
