const fs = require('fs');
let content = fs.readFileSync('data-flows.html', 'utf8');

// Update Bar Chart logic by finding the HTML snippet for each company and replacing it
content = content.replace(/<div class="space-y-1">\s*<div class="flex justify-between text-sm mb-1">\s*<span class="font-medium">Google<\/span>\s*<span class="font-bold">450T<\/span>\s*<\/div>\s*<div class="w-full bg-slate-100 dark:bg-white\/5 rounded-full h-3 overflow-hidden">\s*<div class="h-full rounded-full bg-green-500" style="width: 85%;"><\/div>\s*<\/div>\s*<\/div>/,
    `<div class="space-y-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium">Google</span>
                      <span class="font-bold">450T</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                      <div class="h-full rounded-full bg-[#8B5CF6] transition-all duration-1000" style="width: 100%;"></div>
                    </div>
                  </div>`);

content = content.replace(/<div class="space-y-1">\s*<div class="flex justify-between text-sm mb-1">\s*<span class="font-medium">Meta<\/span>\s*<span class="font-bold">320T<\/span>\s*<\/div>\s*<div class="w-full bg-slate-100 dark:bg-white\/5 rounded-full h-3 overflow-hidden">\s*<div class="h-full rounded-full bg-green-500" style="width: 85%;"><\/div>\s*<\/div>\s*<\/div>/,
    `<div class="space-y-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium">Meta</span>
                      <span class="font-bold">320T</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                      <div class="h-full rounded-full bg-[#10B981] transition-all duration-1000" style="width: 71%;"></div>
                    </div>
                  </div>`);

content = content.replace(/<div class="space-y-1">\s*<div class="flex justify-between text-sm mb-1">\s*<span class="font-medium">AWS<\/span>\s*<span class="font-bold">290T<\/span>\s*<\/div>\s*<div class="w-full bg-slate-100 dark:bg-white\/5 rounded-full h-3 overflow-hidden">\s*<div class="h-full rounded-full bg-green-500" style="width: 85%;"><\/div>\s*<\/div>\s*<\/div>/,
    `<div class="space-y-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium">AWS</span>
                      <span class="font-bold">290T</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                      <div class="h-full rounded-full bg-[#3B82F6] transition-all duration-1000" style="width: 64%;"></div>
                    </div>
                  </div>`);

content = content.replace(/<div class="space-y-1">\s*<div class="flex justify-between text-sm mb-1">\s*<span class="font-medium">Montgomery GIS<\/span>\s*<span class="font-bold">120T<\/span>\s*<\/div>\s*<div class="w-full bg-slate-100 dark:bg-white\/5 rounded-full h-3 overflow-hidden">\s*<div class="h-full rounded-full bg-green-500" style="width: 85%;"><\/div>\s*<\/div>\s*<\/div>/,
    `<div class="space-y-1">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium">Montgomery GIS</span>
                      <span class="font-bold">120T</span>
                    </div>
                    <div class="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                      <div class="h-full rounded-full bg-[#F59E0B] transition-all duration-1000" style="width: 27%;"></div>
                    </div>
                  </div>`);

// Replace Pie Chart HTML
const pieChartOriginal = /<!-- Abstract Pie Chart representation using CSS -->\s*<div\s*class="[^"]*border-\[16px\][^"]*">\s*<div class="text-center">\s*<p class="text-2xl font-black">100%<\/p>\s*<p class="text-\[10px\] text-slate-500 uppercase font-bold">Total<\/p>\s*<\/div>\s*<\/div>/m;
const newPie = `<!-- CSS Donut Chart -->
                <div class="relative size-40 rounded-full flex items-center justify-center shadow-inner" style="background: conic-gradient(#8B5CF6 0% 42%, #10B981 42% 70%, #3B82F6 70% 88%, #94A3B8 88% 100%);">
                  <div class="absolute inset-4 rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center shadow-sm">
                    <p class="text-2xl font-black">100%</p>
                    <p class="text-[10px] text-slate-500 uppercase font-bold">Total</p>
                  </div>
                </div>`;
content = content.replace(pieChartOriginal, newPie);

// Correct legend colors
content = content.replace(/<div class="size-3 rounded-full bg-green-500"><\/div>\s*<span class="text-sm font-medium flex-1">Precious Metals<\/span>/,
    `<div class="size-3 rounded-full bg-[#8B5CF6]"></div>
                    <span class="text-sm font-medium flex-1">Precious Metals</span>`);
content = content.replace(/<div class="size-3 rounded-full bg-secondary"><\/div>\s*<span class="text-sm font-medium flex-1">Plastics<\/span>/,
    `<div class="size-3 rounded-full bg-[#10B981]"></div>
                     <span class="text-sm font-medium flex-1">Plastics</span>`);
content = content.replace(/<div class="size-3 rounded-full bg-green-500"><\/div>\s*<span class="text-sm font-medium flex-1">Silicon\/Glass<\/span>/,
    `<div class="size-3 rounded-full bg-[#3B82F6]"></div>
                    <span class="text-sm font-medium flex-1">Silicon/Glass</span>`);
content = content.replace(/<div class="size-3 rounded-full bg-slate-400"><\/div>\s*<span class="text-sm font-medium flex-1">Other Rare Earths<\/span>/,
    `<div class="size-3 rounded-full bg-[#94A3B8]"></div>
                    <span class="text-sm font-medium flex-1">Other Rare Earths</span>`);

fs.writeFileSync('data-flows.html', content);
console.log('Successfully updated the chart data visuals');
