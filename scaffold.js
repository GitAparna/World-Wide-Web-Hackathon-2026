const fs = require('fs');

function getHtmlTemplate(filename) {
    const html = fs.readFileSync(filename, 'utf-8');
    const headerEnd = html.indexOf('<!-- Main Content -->');
    const mainEnd = html.indexOf('</main>', headerEnd);

    if (headerEnd !== -1 && mainEnd !== -1) {
        const templateTop = html.substring(0, headerEnd + 21);
        const templateBottom = '\n      ' + html.substring(mainEnd);
        return { templateTop, templateBottom };
    }
    return null;
}

const dataFlows = getHtmlTemplate('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/data-flows.html');

if (dataFlows) {
    let top = dataFlows.templateTop + '\n      <main class="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">\n';

    // Partner Details Content
    const partnerContent = `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <div class="size-10 rounded-full bg-white shadow flex items-center justify-center">
                    <span class="material-symbols-outlined text-blue-500">google</span>
                </div>
                <h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Google Integration</h1>
              </div>
              <p class="text-slate-500 dark:text-slate-400 mt-1">Status: <span class="text-green-600 font-bold">Live Feed Active</span></p>
            </div>
            <div class="flex gap-2">
              <button class="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <span class="material-symbols-outlined text-lg">sync_alt</span> Sync Now
              </button>
              <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors">
                <span class="material-symbols-outlined text-lg">link_off</span> Disconnect
              </button>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Last Sync</p>
              <p class="text-2xl font-bold mt-2">Just now</p>
            </div>
            <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">Data Points Transferred</p>
              <p class="text-2xl font-bold mt-2">1,248,392</p>
            </div>
            <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
              <p class="text-slate-500 text-sm font-medium uppercase tracking-wide">E-Waste Logged (Tons)</p>
              <p class="text-2xl font-bold mt-2">450.2</p>
            </div>
        </div>

        <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
            <h3 class="font-bold text-lg mb-6">Integration Settings</h3>
            <div class="space-y-4">
               <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">API Endpoint URL</label>
                  <input type="text" disabled class="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-500 dark:text-slate-400" value="https://api.montgomery-circular.gov/v1/ingest/partner_xyz" />
               </div>
               <div>
                  <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Polling Frequency</label>
                  <select class="w-full bg-white dark:bg-background-dark/80 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100">
                    <option>Real-time (Webhooks)</option>
                    <option>Every 5 minutes</option>
                    <option>Hourly</option>
                    <option>Daily Batch</option>
                  </select>
               </div>
               <div class="pt-4">
                 <button class="bg-primary hover:brightness-110 text-white dark:text-background-dark font-bold px-6 py-2 rounded-lg transition-all" onclick="window.history.back()">Save Changes</button>
               </div>
            </div>
        </div>
    `;
    fs.writeFileSync('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/partner-details.html', top + partnerContent + dataFlows.templateBottom);

    // User Profile Content
    const profileContent = `
        <div class="flex flex-col md:flex-row gap-8 items-start">
            <div class="w-full md:w-1/3 bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm text-center">
                <div class="size-32 rounded-full border-4 border-primary/20 bg-cover bg-center mx-auto" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDos-IqlHvS2ffjf7CJyAbi57UHpC3W9LAN8LKiZSPPduA_mzXXAdBkfpM0l0V-CZt_aaKdBDyYCGeLz-mEVhXJYD2faKuBKWDEBxIlaW4gyUcIpq5-aUpKDmtrEtLupX0CjlOUiCKp4z0shiA0qpl-0t90xucKnojzPtFnie0uVwgD397ZRbLnAWsRG5RfX_sKXZZ-ZhxIn_22bnBWv9oV8JerOp7pA7PHAdtOqfX3Wh411a3a26iz_npdxzniG1G9VrAOpEbR3Lg");'></div>
                <h2 class="text-xl font-bold mt-4">System Administrator</h2>
                <p class="text-slate-500 text-sm">Montgomery County Dept. of Resource Management</p>
                <div class="mt-6">
                    <button class="w-full bg-primary hover:opacity-90 text-white dark:text-background-dark font-bold px-4 py-2 rounded-lg transition-all">Upload New Photo</button>
                </div>
            </div>
            
            <div class="w-full md:w-2/3 space-y-6">
                <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
                    <h3 class="font-bold text-lg mb-6 border-b border-primary/10 pb-4">Personal Information</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                            <input type="text" class="w-full bg-white dark:bg-background-dark/80 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100" value="System Administrator" />
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                            <input type="email" class="w-full bg-white dark:bg-background-dark/80 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100" value="admin@montgomery-circular.gov" />
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-primary/10 shadow-sm">
                    <h3 class="font-bold text-lg mb-6 border-b border-primary/10 pb-4">Notification Preferences</h3>
                    <div class="space-y-4">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked class="form-checkbox rounded text-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                            <span class="text-sm">Email alerts for failed partner data syncs</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked class="form-checkbox rounded text-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                            <span class="text-sm">Weekly hardware exchange summaries</span>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" class="form-checkbox rounded text-primary border-slate-300 dark:border-slate-600 dark:bg-slate-800" />
                            <span class="text-sm">SMS notifications for high-priority environmental incidents</span>
                        </label>
                    </div>
                </div>

                <div class="flex justify-end gap-4">
                    <button class="bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 font-bold px-6 py-2 rounded-lg transition-all" onclick="window.history.back()">Cancel</button>
                    <button class="bg-primary hover:brightness-110 text-white dark:text-background-dark font-bold px-6 py-2 rounded-lg transition-all" onclick="window.location.href='index.html'">Save Preferences</button>
                </div>
            </div>
        </div>
    `;
    fs.writeFileSync('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/user-profile.html', top + profileContent + dataFlows.templateBottom);

    console.log("partner-details.html and user-profile.html created.");
} else {
    console.error("Could not parse data-flows.html");
}

const hwExchange = getHtmlTemplate('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/hardware-exchange.html');

if (hwExchange) {
    let top = hwExchange.templateTop + '\n      <main class="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">\n';

    // Asset Details Content
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
            <h3 class="font-bold text-xl mb-4">Diagnostics & Quality Assurance</h3>
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
    fs.writeFileSync('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/asset-details.html', top + assetContent + hwExchange.templateBottom);
    console.log("asset-details.html created.");
} else {
    console.error("Could not parse hardware-exchange.html");
}
