const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // We want to remove `bg-primary` from large container elements to respect the user's contrast request.
    // We'll replace it with the clean `bg-white dark:bg-slate-800` or just let it fall back.
    // The specific classes breaking the cards are things like:
    // `class="bg-primary border-primary-dark p-6 rounded-xl ..."`
    // Let's replace those specifically if they appear. We'll find any `bg-primary` that is immediately followed by `border-primary-dark` or `border-primary` in a padding block.

    content = content.replace(/bg-primary\s+border-primary-dark\s+p-6/g, 'bg-white dark:bg-slate-800 p-6');

    // Also any `bg-primary` class that is mixed into `bg-white dark:bg-slate-900 border`
    content = content.replace(/bg-primary\s+bg-white/g, 'bg-white');
    content = content.replace(/bg-primary\s+text-white\s+bg-white/g, 'bg-white');

    // Make sure headers are cleaned
    content = content.replace(/bg-primary\s+border-b-4\s+border-primary-dark\/20/g, 'bg-[#0A1128] border-b border-white/10');

    // Specifically for the profile page invisible inputs:
    if (file === 'user-profile.html') {
        content = content.replace(/class="w-full bg-primary text-white border-primary-dark\/80 /g, 'class="w-full bg-white text-slate-900 border-slate-300 ');
        content = content.replace(/class="w-[^"]*bg-primary\s+text-white[^"]*"/g, (match) => match.replace(/bg-primary text-white/g, 'bg-white text-slate-900'));

        // Remove forced `bg-primary` text-white on inputs
        content = content.replace(/bg-primary\s+text-white\s+border-primary/gi, 'bg-white text-slate-900 border-slate-200');
    }

    // Ensure ALL input fields universally across the site are readable and NOT bright blue
    content = content.replace(/class="([^"]*)bg-primary\s+text-white([^"]*)border-primary-dark\/80([^"]*)"/g, 'class="$1bg-white text-slate-900 border-slate-300 focus:border-primary focus:ring-primary$2$3"');

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Cleaned remnant bright blue backgrounds from cards and input fields across all pages.');
