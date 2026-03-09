const fs = require('fs');

let content = fs.readFileSync('environmental-impact.html', 'utf-8');

const newContent = `
                <div class="max-w-6xl flex-1 mx-auto space-y-8 pb-10">
                <!-- Welcome Section -->

                <div>
                    <h2 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                        Impact Analytics</h2>
                    <p class="text-slate-500 dark:text-slate-400 mt-1 font-medium">Real-time tracking of
                        sustainability metrics, waste diversion, and financial impact for Montgomery.</p>
                </div>

                <!-- Tabs -->
                <div class="flex gap-6 border-b border-slate-200 dark:border-slate-800 pb-[1px] mb-8">
                    <button onclick="switchTab('env')" id="tab-btn-env" class="px-2 py-3 text-sm font-bold border-b-[3px] border-primary text-primary transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">public</span> Environmental Impact
                    </button>
                    <button onclick="switchTab('fin')" id="tab-btn-fin" class="px-2 py-3 text-sm font-bold border-b-[3px] border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2">
                        <span class="material-symbols-outlined text-lg">payments</span> Financial Impact
                    </button>
                </div>

                <script>
                    function switchTab(tabId) {
                        const envContent = document.getElementById('tab-content-env');
                        const finContent = document.getElementById('tab-content-fin');
                        const btnEnv = document.getElementById('tab-btn-env');
                        const btnFin = document.getElementById('tab-btn-fin');

                        if(tabId === 'env') {
                            envContent.classList.remove('hidden');
                            finContent.classList.add('hidden');
                            
                            btnEnv.classList.add('border-primary', 'text-primary');
                            btnEnv.classList.remove('border-transparent', 'text-slate-500');
                            
                            btnFin.classList.remove('border-primary', 'text-primary');
                            btnFin.classList.add('border-transparent', 'text-slate-500');
                        } else {
                            finContent.classList.remove('hidden');
                            envContent.classList.add('hidden');
                            
                            btnFin.classList.add('border-primary', 'text-primary');
                            btnFin.classList.remove('border-transparent', 'text-slate-500');
                            
                            btnEnv.classList.remove('border-primary', 'text-primary');
                            btnEnv.classList.add('border-transparent', 'text-slate-500');
                        }
                    }
                </script>

                <!-- ENVIRONMENTAL TAB CONTENT -->
                <div id="tab-content-env" class="space-y-8 animate-[fade-in_0.5s_ease-in-out]">
                    <!-- 4 Metric Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div
                            class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="flex items-center justify-between mb-4 relative z-10">
                                <span class="material-symbols-outlined text-green-500 bg-green-500/10 p-2 rounded-lg">co2</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric</span>
                            </div>
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 relative z-10">Emissions Reduced</h3>
                            <div class="flex items-baseline gap-2 relative z-10">
                                <span
                                    class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">35</span>
                                <span class="text-sm font-bold text-green-500">%</span>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="flex items-center justify-between mb-4 relative z-10">
                                <span
                                    class="material-symbols-outlined text-amber-500 bg-amber-500/10 p-2 rounded-lg">delete_sweep</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric</span>
                            </div>
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 relative z-10">Annual Volume Processed
                                </h3>
                            <div class="flex items-baseline gap-2 relative z-10">
                                <span
                                    class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">5,000</span>
                                <span class="text-sm font-bold text-amber-500">Tons</span>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="flex items-center justify-between mb-4 relative z-10">
                                <span
                                    class="material-symbols-outlined text-blue-500 bg-blue-500/10 p-2 rounded-lg">water_drop</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric</span>
                            </div>
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 relative z-10">Water Saved</h3>
                            <div class="flex items-baseline gap-2 relative z-10">
                                <span
                                    class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">12.4</span>
                                <span class="text-sm font-bold text-blue-500">M Gal</span>
                            </div>
                        </div>
                        <div
                            class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="flex items-center justify-between mb-4 relative z-10">
                                <span
                                    class="material-symbols-outlined text-emerald-500 bg-emerald-500/10 p-2 rounded-lg">nature</span>
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric</span>
                            </div>
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1 relative z-10">Landfill Status
                            </h3>
                            <div class="flex items-baseline gap-2 relative z-10">
                                <span
                                    class="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">Zero</span>
                                <span class="text-sm font-bold text-emerald-500">Waste</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FINANCIAL TAB CONTENT -->
                <div id="tab-content-fin" class="space-y-8 hidden animate-[fade-in_0.5s_ease-in-out]">
                    <!-- 4 Metric Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                            class="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 shadow-sm relative overflow-hidden">
                            <div class="absolute -right-4 -bottom-4 opacity-[0.03] dark:opacity-10">
                                <span class="material-symbols-outlined text-[150px] text-emerald-600">payments</span>
                            </div>
                            <h3 class="text-emerald-700 dark:text-emerald-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">Total Revenue Generated</h3>
                            <div class="flex items-baseline gap-2 relative z-10 mt-4">
                                <span class="text-5xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight leading-none">$6.5</span>
                                <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">Million</span>
                            </div>
                            <p class="text-sm text-emerald-600/80 dark:text-emerald-400/80 mt-4 font-medium relative z-10">Since program inception in Montgomery.</p>
                        </div>
                        <div
                            class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">Capital Investment</h3>
                            <div class="flex items-baseline gap-2 relative z-10 mt-4">
                                <span class="text-4xl font-black text-primary tracking-tight leading-none">$1.1</span>
                                <span class="text-base font-bold text-slate-500">Billion</span>
                            </div>
                            <p class="text-sm text-slate-500 mt-4 font-medium relative z-10">Industrial infrastructure & facilities (FY 2024).</p>
                        </div>
                        <div
                            class="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <h3 class="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">Jobs Created</h3>
                            <div class="flex items-baseline gap-2 relative z-10 mt-4">
                                <span class="text-4xl font-black text-amber-500 tracking-tight leading-none">497</span>
                                <span class="text-base font-bold text-slate-500">New Hires</span>
                            </div>
                            <p class="text-sm text-slate-500 mt-4 font-medium relative z-10">Direct jobs supporting the circular economy loop.</p>
                        </div>
                    </div>

                    <!-- Revenue Channels -->
                    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div class="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">Revenue Channels</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Breakdown of financial impact by sourcing channel.</p>
                            </div>
                            <button class="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                                <span class="material-symbols-outlined text-sm">download</span> Report
                            </button>
                        </div>
                        <div class="p-0">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-sm border-collapse">
                                    <thead class="bg-slate-50 dark:bg-slate-900 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                                        <tr>
                                            <th class="px-6 py-4 font-semibold uppercase tracking-wider text-[11px]">Channel</th>
                                            <th class="px-6 py-4 font-semibold uppercase tracking-wider text-[11px] w-48 text-right">Revenue ($)</th>
                                            <th class="px-6 py-4 font-semibold uppercase tracking-wider text-[11px] w-32 text-center">Trend</th>
                                            <th class="px-6 py-4 font-semibold uppercase tracking-wider text-[11px] w-[15%]">Sector</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
                                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td class="px-6 py-5">
                                                <div class="font-bold tracking-tight text-slate-900 dark:text-white">Energy & Efficiency Returns</div>
                                                <div class="text-slate-500 text-xs mt-1">Cost savings converted to operational revenue from municipal facilities</div>
                                            </td>
                                            <td class="px-6 py-5 text-right font-black text-slate-900 dark:text-white">$3,200,000</td>
                                            <td class="px-6 py-5">
                                                <div class="flex items-center justify-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 py-1 px-2 rounded">
                                                    <span class="material-symbols-outlined text-sm">trending_up</span> +12%
                                                </div>
                                            </td>
                                            <td class="px-6 py-5"><span class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">Municipal</span></td>
                                        </tr>
                                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td class="px-6 py-5">
                                                <div class="font-bold tracking-tight text-slate-900 dark:text-white">Rare Earth Materials & Scrap</div>
                                                <div class="text-slate-500 text-xs mt-1">Sabel Steel & Equip Recycling secondary market sales</div>
                                            </td>
                                            <td class="px-6 py-5 text-right font-black text-slate-900 dark:text-white">$1,850,000</td>
                                            <td class="px-6 py-5">
                                                <div class="flex items-center justify-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 py-1 px-2 rounded">
                                                    <span class="material-symbols-outlined text-sm">trending_up</span> +8%
                                                </div>
                                            </td>
                                            <td class="px-6 py-5"><span class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">Industrial</span></td>
                                        </tr>
                                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td class="px-6 py-5">
                                                <div class="font-bold tracking-tight text-slate-900 dark:text-white">Hardware Refurbishment</div>
                                                <div class="text-slate-500 text-xs mt-1">ReWorx Recycling zero-landfill resale program</div>
                                            </td>
                                            <td class="px-6 py-5 text-right font-black text-slate-900 dark:text-white">$950,000</td>
                                            <td class="px-6 py-5">
                                                <div class="flex items-center justify-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 py-1 px-2 rounded">
                                                    <span class="material-symbols-outlined text-sm">trending_up</span> +24%
                                                </div>
                                            </td>
                                            <td class="px-6 py-5"><span class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">Commercial</span></td>
                                        </tr>
                                        <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                            <td class="px-6 py-5">
                                                <div class="font-bold tracking-tight text-slate-900 dark:text-white">Data Destruction Fees</div>
                                                <div class="text-slate-500 text-xs mt-1">Secure on-site/off-site shredding services via Shred-A-Way</div>
                                            </td>
                                            <td class="px-6 py-5 text-right font-black text-slate-900 dark:text-white">$500,000</td>
                                            <td class="px-6 py-5">
                                                <div class="flex items-center justify-center gap-1 text-amber-500 font-bold bg-amber-500/10 py-1 px-2 rounded">
                                                    <span class="material-symbols-outlined text-sm">trending_flat</span> 0%
                                                </div>
                                            </td>
                                            <td class="px-6 py-5"><span class="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">B2B Service</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

content = content.replace(/<div class="max-w-6xl mx-auto space-y-8">.*<\/main>/s, newContent + '\n</main>');

fs.writeFileSync('environmental-impact.html', content, 'utf-8');
