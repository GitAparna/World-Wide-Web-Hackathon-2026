const fs = require('fs');

function getHtmlTemplate(filename) {
    const html = fs.readFileSync(filename, 'utf-8');
    const mainStart = html.indexOf('<main');
    const mainContentStart = html.indexOf('>', mainStart) + 1;
    const mainEnd = html.indexOf('</main>', mainContentStart);

    if (mainStart !== -1 && mainEnd !== -1) {
        const templateTop = html.substring(0, mainStart) + '<main class="flex-1 p-6 lg:p-10 space-y-10">\n';
        const templateBottom = '\n      ' + html.substring(mainEnd);
        return { templateTop, templateBottom };
    }
    return null;
}

const hwExchange = getHtmlTemplate('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/hardware-exchange.html');

if (hwExchange) {
    const assetContent = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <nav class="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <a href="hardware-exchange.html" class="hover:text-primary transition-colors">Market Inventory</a>
                <span class="material-symbols-outlined text-xs">chevron_right</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">Asset #DX-9932</span>
              </nav>
              <h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dell PowerEdge R740 (Grade A+)</h1>
            </div>
            <div class="flex gap-2">
              <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all">
                <span class="material-symbols-outlined text-lg">shopping_cart</span> Request Asset
              </button>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Status</p>
              <div class="mt-2 text-green-600 font-bold flex items-center gap-2">
                <span class="size-2 rounded-full bg-green-500 animate-pulse"></span> Available (24 in stock)
              </div>
            </div>
            <div class="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Price / Unit</p>
              <p class="text-2xl font-bold mt-2 font-mono">$1,200 <span class="text-sm font-normal text-slate-500">MSRP: $3,500</span></p>
            </div>
            <div class="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Warranty</p>
              <p class="text-xl font-bold mt-2">1 Year Basic</p>
            </div>
            <div class="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Refurbisher</p>
              <p class="text-xl font-bold mt-2">AL Secondary IT</p>
            </div>
        </div>

        <div class="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 class="font-bold text-xl mb-4">Diagnostics &amp; Quality Assurance</h3>
            <div class="space-y-4">
                <div class="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500">check_circle</span>
                        <span class="font-bold">CPU Stress Test</span>
                    </div>
                    <span class="text-sm font-mono text-slate-500">Pass (98% stability)</span>
                </div>
                <div class="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500">check_circle</span>
                        <span class="font-bold">RAM Memory Diagnostic</span>
                    </div>
                    <span class="text-sm font-mono text-slate-500">Pass (0 bad sectors)</span>
                </div>
                <div class="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined text-green-500">check_circle</span>
                        <span class="font-bold">Secure Data Erase</span>
                    </div>
                    <span class="text-sm font-mono text-slate-500 text-green-600 font-bold">NIST 800-88 Compliant</span>
                </div>
            </div>
            <div class="mt-6 flex gap-4">
                <button class="flex items-center gap-2 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold transition-colors">
                    <span class="material-symbols-outlined text-lg">picture_as_pdf</span> Download QA Report
                </button>
            </div>
        </div>
    `;
    fs.writeFileSync('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/asset-details.html', hwExchange.templateTop + assetContent + hwExchange.templateBottom);
    console.log('asset-details.html created.');
} else {
    console.log('Could not find markers.');
}
