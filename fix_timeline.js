const fs = require('fs');

let content = fs.readFileSync('zone-development.html', 'utf8');

// Replace the image map with interactive leaflet/openstreetmap iframe
const mapRegex = /<!-- Map Preview Component -->[\s\S]*?<\/div>(\s*<\/div>\s*<\/div>)/m;
let mapReplacement = `<!-- Map Preview Component -->
                        <div class="mt-8 relative rounded-xl overflow-hidden h-[400px] border border-slate-800">
                            <iframe 
                                class="absolute inset-0 w-full h-full border-0 grayscale dark:opacity-80 dark:invert rounded-xl" 
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-86.34,32.33,-86.26,32.41&amp;layer=mapnik" 
                                title="Interactive Site Plan Preview">
                            </iframe>
                            <div class="absolute inset-0 pointer-events-none border border-white/10 rounded-xl shadow-inner"></div>
                            
                            <!-- Floating Marker UI -->
                            <div class="absolute top-1/4 left-1/3 bg-[#0A1128] text-white border-primary border p-2 rounded shadow-lg pointer-events-none">
                                <p class="text-[10px] font-bold uppercase">Zone A-1 Ready</p>
                            </div>
                            <div class="absolute bottom-1/4 right-1/4 bg-[#0A1128] text-white border-slate-600 border p-2 rounded shadow-lg pointer-events-none">
                                <p class="text-[10px] font-bold uppercase text-slate-400">Zone E-1 Pending</p>
                            </div>
                        </div>
                    </div>
                </div>`;

content = content.replace(mapRegex, mapReplacement);

content = content.replace(/<div\s+class="w-\[calc\(100%-4rem\)\] md:w-\[calc\(50%-2\.5rem\)\] p-4 rounded-lg bg-slate-50 dark:bg-slate-900\/50 border border-slate-200 dark:border-primary-dark">\s*<div class="flex items-center justify-between space-x-2 mb-1">/g,
    `<div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-[#0A1128] border border-slate-700">
                                            <div class="flex flex-col mb-2">`);

content = content.replace(/<div\s+class="w-\[calc\(100%-4rem\)\] md:w-\[calc\(50%-2\.5rem\)\] p-4 rounded-lg bg-primary text-white border-primary-dark border-2 border-primary shadow-sm">\s*<div class="flex items-center justify-between space-x-2 mb-1">/g,
    `<div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg bg-[#0A1128] text-white border-primary border shadow-lg shadow-primary/10">
                                            <div class="flex flex-col mb-2">`);

content = content.replace(/<div class="font-bold text-white">/g, '<div class="font-bold text-white text-sm">');

content = content.replace(/<time\s*class="font-display text-xs font-medium ([^"]*) uppercase">([^<]*)<\/time>\s*<\/div>/g,
    `<time class="font-display text-[10px] font-bold $1 uppercase tracking-widest mt-1">$2</time></div>`);

// Final safety replace for any stray blue timeline boxes if regex missed formatting spaces
content = content.replace(/bg-primary text-white border-primary-dark/g, 'bg-[#0A1128] text-white border-primary');


fs.writeFileSync('zone-development.html', content);
console.log('Fixed zone-development.html layout text overflows and iframe map');
