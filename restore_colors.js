const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// Restore the vibrant 'bg-primary' that was the standard "dark blue" from 1 hour ago
// and revert the dark mode forced borders that might look messy.

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    if (file !== 'index.html') {
        // Revert Headers and Sidebars back to standard bg-primary and border-primary-dark
        // Remove the newer 'border-blue-800' or 'bg-blue-900 / dark:bg-blue-950' or '#0A1128'

        // First, restore 'bg-[#0A1128]' instances if they exist (though I replaced them earlier)
        content = content.replace(/bg-\[\#0A1128\]/g, 'bg-primary');
        content = content.replace(/border-\[\#1A284D\]/g, 'border-primary-dark');

        // Also catch the bg-blue-900 instances I added in revert_and_fix.js
        content = content.replace(/bg-blue-900 dark:bg-blue-950/g, 'bg-primary');
        content = content.replace(/border-blue-800/g, 'border-primary-dark');
        content = content.replace(/bg-white dark:bg-\[\#0A1128\]/g, 'bg-primary'); // Catch header in index if any

        // Ensure text inside header/sidebar uses 'text-white' explicitly so it stays very readable
        // Remove the forced `<html class="dark">` that caused weird background contrasts earlier
        content = content.replace(/<html class="dark" lang="en">/g, '<html lang="en">');

        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Restored all portal dashboard views to the beautiful standard vibrant blue (bg-primary) color scheme from 1 hour ago.');
