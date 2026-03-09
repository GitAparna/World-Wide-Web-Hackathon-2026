const fs = require('fs');
let content = fs.readFileSync('hardware-exchange.html', 'utf8');

// The user specifically requested "Change blue to black in this page throughout" for the hardware exchange screenshot they posted
content = content.replace(/bg-primary/g, 'bg-[#0A1128]');
content = content.replace(/text-primary/g, 'text-slate-400 dark:text-slate-300'); // blue text becomes slate/gray
content = content.replace(/border-primary/g, 'border-[#0A1128]');

// Restore the active nav text color on the top so we don't completely lose our UI states!
content = content.replace(/text-slate-400 dark:text-slate-300 border-b-2 border-\[#0A1128\]/g, 'text-[#0A1128] dark:text-white border-b-2 border-[#0A1128] dark:border-white');

fs.writeFileSync('hardware-exchange.html', content);
console.log('Removed all blue on hardware-exchange.html');
