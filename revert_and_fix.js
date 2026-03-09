const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// 1. Fix the Sidebar Gap and Colors Site-Wide
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Change near-black to dark blue
    content = content.replace(/bg-\[\#0A1128\]/g, 'bg-blue-900 dark:bg-blue-950');
    content = content.replace(/border-\[\#1A284D\]/g, 'border-blue-800');

    // Remove the hardcoded top/height constraints that cause gaps
    content = content.replace(/sticky top-\[[0-9]+px\] h-\[calc\(.*?\)\]/g, '');

    fs.writeFileSync(file, content, 'utf8');
}

// 2. Fix the Homepage Hero and Restore CTA
const indexFile = 'index.html';
let indexContent = fs.readFileSync(indexFile, 'utf8');

// The hero section currently says bg-primary etc.
indexContent = indexContent.replace(
    /<div[\s\S]*?class="[^"]*official-seal-bg[^"]*"[\s\S]*?(?=<\/main>)/,
    `<div class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-16 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800">
              <span class="material-symbols-outlined text-[18px]">verified</span>
              Official Portal
          </div>
          <h1 class="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6 max-w-4xl">
              Montgomery <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Circular Tech</span>
          </h1>
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium">
              Leading Alabama's transition to a sustainable urban economy through innovation, data-driven policy, and local job creation.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button class="bg-primary text-white font-bold py-4 px-8 rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2" onclick="window.location.href='data-flows.html'">
                  GO TO DASHBOARD
                  <span class="material-symbols-outlined">arrow_forward</span>
              </button>
          </div>
      </div>
  </div>
  
  <!-- Call to Action Section -->
  <section class="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div class="max-w-5xl mx-auto px-6 text-center">
          <h2 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6">Join the Circular Economy</h2>
          <p class="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Whether you are a local business looking to upgrade hardware responsibly or a resident wanting to safely dispose of e-waste, we have resources for you.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition-colors" onclick="window.location.href='hardware-exchange.html'">Hardware Exchange</button>
              <button class="bg-secondary text-slate-900 font-bold py-3 px-8 rounded-xl hover:brightness-110 shadow-lg shadow-secondary/20 transition-all" onclick="window.location.href='briefing.html'">Get Involved</button>
          </div>
      </div>
  </section>`
);

fs.writeFileSync(indexFile, indexContent, 'utf8');

console.log('Fixed blue color, removed gaps globally, and restored Homepage Hero/CTA.');
