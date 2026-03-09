const fs = require('fs');

const filename = 'C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/data-flows.html';
const html = fs.readFileSync(filename, 'utf-8');

const mainStart = html.indexOf('<main');
const mainContentStart = html.indexOf('>', mainStart) + 1;
const mainEnd = html.indexOf('</main>', mainContentStart);

if (mainStart !== -1 && mainEnd !== -1) {
    const templateTop = html.substring(0, mainStart) + '<main class="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 max-w-5xl mx-auto">\n';
    const templateBottom = '\n      ' + html.substring(mainEnd);

    const backBtn = `
            <!-- Elegant Back Navigation -->
            <a href="index.html" class="inline-flex group flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all mb-6">
                <div class="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-sm">
                    <span class="material-symbols-outlined text-lg">arrow_back</span>
                </div>
                Return to Home
            </a>
    `;

    const briefingContent = `
        ${backBtn}
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
            <div>
              <h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Request a Briefing</h1>
              <p class="text-slate-500 dark:text-slate-400 mt-1">Connect with our team to explore circular tech solutions and upcoming events.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-background-dark/80 p-8 rounded-xl border border-primary/10 shadow-sm">
                <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                   <span class="material-symbols-outlined text-primary">mail</span>
                   Contact Our Team
                </h2>
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input type="text" placeholder="Jane Doe" class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email / Work Contact</label>
                        <input type="email" placeholder="jane@enterprise.com" class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Briefing Topic</label>
                        <select class="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-slate-100">
                            <option>Enterprise Hardware Recycling</option>
                            <option>Job Creation Initiatives</option>
                            <option>Municipal Land Remediation</option>
                            <option>Circular Strategy Consultation</option>
                        </select>
                    </div>
                    <div class="pt-2">
                        <button type="button" onclick="window.location.href='index.html'" class="w-full bg-primary hover:brightness-110 text-white dark:text-background-dark font-bold px-6 py-3 rounded-lg transition-all shadow-lg shadow-primary/20">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>

            <div class="space-y-6">
                <div class="bg-white dark:bg-background-dark/80 p-8 rounded-xl border border-primary/10 shadow-sm relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    <div class="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <span class="px-2 py-1 bg-primary text-background-dark text-[10px] font-black uppercase rounded mb-4 inline-block">Upcoming Event</span>
                            <h3 class="text-xl font-bold mb-2">Montgomery Circular Tech Convention 2026</h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">Join government officials, hardware recyclers, and enterprise data centers for a hands-on event showcasing Alabama's green economy transition.</p>
                        </div>
                        <div class="flex items-center gap-2 text-primary font-bold text-sm">
                            <span class="material-symbols-outlined text-lg">calendar_month</span> October 15-17
                        </div>
                    </div>
                </div>
                
                <div class="bg-white dark:bg-background-dark/80 p-5 rounded-xl border border-primary/10 shadow-sm flex items-center justify-between group hover:border-primary/50 transition-colors cursor-pointer">
                    <div class="flex items-center gap-4">
                        <div class="size-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-2xl">play_circle</span>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm">Intro to E-Waste Flows</h4>
                            <p class="text-xs text-slate-500">Video Overview • 3 mins</p>
                        </div>
                    </div>
                    <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    `;

    fs.writeFileSync('C:/Users/D067009/.gemini/antigravity/scratch/e-waste-data-flows/briefing.html', templateTop + briefingContent + templateBottom, 'utf-8');
    console.log('Created briefing.html');
}

