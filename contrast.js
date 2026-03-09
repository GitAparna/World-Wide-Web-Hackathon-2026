const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // === HEADER ENHANCEMENTS ===
    // 1. Change white headers to deep slate
    content = content.replace(/bg-white\/80 dark:bg-background-dark\/80 backdrop-blur-xl border-b border-slate-200\/80 dark:border-slate-800\/80/g,
        'bg-[#0B1120] border-b border-slate-800');

    // Replace the index.html sticky header as well
    content = content.replace(/bg-white\/90 dark:bg-slate-900\/90 backdrop-blur-lg/g, 'bg-[#0B1120] text-white');
    content = content.replace(/bg-white dark:bg-background-dark/g, 'bg-[#0B1120] text-white border-slate-800');

    // 2. Header Title
    content = content.replace(/text-slate-900 dark:text-slate-100 group-hover:text-primary/g,
        'text-white group-hover:text-blue-400');
    content = content.replace(/text-slate-900 dark:text-white/g, 'text-white font-bold'); // For index

    // 3. Header Back Arrow Box
    content = content.replace(/border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary/g,
        'border-slate-700 text-slate-300 hover:border-white hover:text-white hover:bg-slate-800');

    // === SIDEBAR ENHANCEMENTS ===
    // 1. Sidebar background
    content = content.replace(/bg-white dark:bg-slate-900/g, 'bg-[#0B1120] border-slate-800');
    content = content.replace(/border-r-4 border-primary\/10/g, 'border-r border-slate-800');

    // 2. Sidebar Navigation Label Border
    content = content.replace(/border-b border-slate-100 dark:border-slate-800/g, 'border-b border-slate-800');
    content = content.replace(/text-slate-400 uppercase tracking-\[0\.2em\]/g, 'text-slate-500 uppercase tracking-[0.2em]');

    // 3. Sidebar Links Hover Classes
    content = content.replace(/hover:bg-primary\/8 hover:text-primary/g, 'hover:bg-white/10 hover:text-white');
    content = content.replace(/text-slate-600 dark:text-slate-300 font-semibold hover:font-bold/g, 'text-slate-300 font-semibold');

    // 4. Sidebar Link Icons
    content = content.replace(/text-slate-400 group-hover:text-primary/g, 'text-slate-500 group-hover:text-white');

    // Sub-Navigation under header (Data Flows / Hardware Exchange tabs) 
    content = content.replace(/bg-slate-50 dark:bg-slate-800\/50 px-6 lg:px-10 py-3 border-b border-slate-100 dark:border-slate-700/g,
        'bg-slate-100 dark:bg-slate-900 px-6 lg:px-10 py-3 border-b border-slate-200 dark:border-slate-800 shadow-inner');

    fs.writeFileSync(file, content, 'utf8');
}

console.log("Contrast enhanced!");
