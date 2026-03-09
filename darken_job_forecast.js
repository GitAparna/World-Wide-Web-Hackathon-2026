const fs = require('fs');
let html = fs.readFileSync('job-forecast.html', 'utf8');

// Header nav links
html = html.replace(/hover:bg-primary\/20/g, 'hover:bg-[#0A1128]/20');
html = html.replace(/group-hover:text-primary/g, 'group-hover:text-white');

// Background main
html = html.replace(/bg-slate-50 dark:bg-slate-900 dark:bg-\[radial-gradient\(ellipse_at_top,_var\(--tw-gradient-stops\)\)\] dark:from-slate-800 dark:to-slate-950/g, 'bg-slate-900');

// Cards
html = html.replace(/bg-white dark:bg-slate-800/g, 'bg-[#0A1128]');
html = html.replace(/border-slate-200 dark:border-primary-dark/g, 'border-white/10');

// Card Icons
html = html.replace(/bg-primary\/10 rounded-lg text-primary/g, 'bg-white/10 rounded-lg text-slate-300');

// Badges
html = html.replace(/text-primary px-2 py-1 bg-primary\/10/g, 'text-slate-300 px-2 py-1 bg-white/10');

// Progressbars
html = html.replace(/"bg-primary h-full/g, '"bg-white h-full');

// Active sidebar item background and text colors
html = html.replace(/bg-primary\/20/g, 'bg-white/20');
html = html.replace(/text-primary"/g, 'text-white"');

// Fix the main gradient just in case:
html = html.replace(/bg-\[radial-gradient\(ellipse_at_top,_var\(--tw-gradient-stops\)\)\] from-slate-900 via-[#0A1128] to-slate-900/g, 'bg-slate-900');

fs.writeFileSync('job-forecast.html', html);
console.log('Fixed job-forecast.html colors');
