const fs = require('fs');
let content = fs.readFileSync('user-profile.html', 'utf8');

// The user requested to "make this page also black" regarding user-profile.html
content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
content = content.replace(/text-primary/g, 'text-slate-400 dark:text-slate-300'); // make primary text slategray
content = content.replace(/border-primary/g, 'border-[#0A1128]');
content = content.replace(/text-slate-900 dark:text-background-dark/g, 'text-white'); // ensure buttons are white text instead of dark text
content = content.replace(/text-slate-900/g, 'text-white'); // Fix the input fields that had text-slate-900 when bg is now black
// restore header text color that i might have accidentally made white
content = content.replace(/<h2 class="text-lg font-bold leading-tight tracking-tight text-white/g, '<h2 class="text-lg font-bold leading-tight tracking-tight text-slate-900');

fs.writeFileSync('user-profile.html', content);
console.log('Removed all blue from user-profile.html');
