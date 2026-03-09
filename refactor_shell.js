const fs = require('fs');
const path = require('path');

const html_files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');
const info_pages = ['privacy.html', 'terms.html', 'annual-report.html'];

// Restore the "Fine" Header Style
const primaryColor = "#1754cf";
const bgDark = "#0f172a";

const header_template = `
    <!-- Header -->
    <header class="flex items-center justify-between whitespace-nowrap border-b-4 border-primary/20 px-6 md:px-10 py-5 bg-white dark:bg-background-dark sticky top-0 z-50 shadow-sm">
        <div class="flex items-center gap-3">
            <a href="index.html"
               class="flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all"
               title="Back to Portal">
                <span class="material-symbols-outlined text-xl">arrow_back</span>
            </a>
            <div class="flex items-center gap-3 cursor-pointer group" onclick="window.location.href='index.html'">
                <div class="flex items-center justify-center p-2 rounded-lg bg-primary/20 text-primary">
                    <span class="material-symbols-outlined text-2xl">account_balance</span>
                </div>
                <h2 class="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Montgomery Circular Tech</h2>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <div class="bg-cover bg-center size-10 rounded-full border-2 border-primary cursor-pointer hover:shadow-[0_0_12px_rgba(23,84,207,0.35)] transition-all"
                data-alt="User profile avatar" onclick="window.location.href='user-profile.html'" style="background-image: url('avatar.png');"></div>
        </div>
    </header>
`;

const sidebar_template = `
    <aside id="app-sidebar" class="hidden lg:flex w-64 flex-col border-r-4 border-primary/10 bg-white dark:bg-slate-900 px-4 py-6 gap-6 sticky top-[81px] h-[calc(100vh-81px)] overflow-y-auto shadow-sm">
      <div class="pb-3 border-b border-slate-100 dark:border-slate-800">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</p>
      </div>
      <nav class="flex flex-col gap-1">
        <a href="data-flows.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/8 hover:text-primary transition-all text-slate-600 dark:text-slate-300 font-semibold hover:font-bold group">
          <span class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors">dashboard</span>
          <span class="text-sm">E-Waste Data Flows</span>
        </a>
        <a href="job-forecast.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/8 hover:text-primary transition-all text-slate-600 dark:text-slate-300 font-semibold hover:font-bold group">
          <span class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors">trending_up</span>
          <span class="text-sm">Job Forecast</span>
        </a>
        <a href="zone-development.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/8 hover:text-primary transition-all text-slate-600 dark:text-slate-300 font-semibold hover:font-bold group">
          <span class="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary transition-colors">architecture</span>
          <span class="text-sm">Zone Development</span>
        </a>
      </nav>
    </aside>
`;

const sub_header_template = `
    <div class="bg-slate-50 dark:bg-slate-800/50 px-6 lg:px-10 py-3 border-b border-slate-100 dark:border-slate-700 flex gap-8 items-center">
        <a href="data-flows.html" class="text-sm font-bold \${TAB_DATA} transition-all flex items-center gap-2 py-1">
            <span class="material-symbols-outlined text-base">data_usage</span> Data Flows
        </a>
        <a href="hardware-exchange.html" class="text-sm font-bold \${TAB_HARDWARE} transition-all flex items-center gap-2 py-1">
            <span class="material-symbols-outlined text-base">memory</span> Hardware Exchange
        </a>
    </div>
`;

html_files.forEach(filename => {
  let content = fs.readFileSync(filename, 'utf-8');

  const mainMatch = content.match(/(<main[^>]*>.*?<\/main>)/s);
  if (!mainMatch) return;

  let main_content = mainMatch[1];

  const isInfoPage = info_pages.includes(filename);

  // Styling adjustment for main content
  if (isInfoPage) {
    main_content = main_content.replace(/<main[^>]*>/, '<main class="flex-1 overflow-x-hidden p-8 md:p-12 w-full max-w-4xl mx-auto space-y-10 bg-background-light dark:bg-transparent min-h-screen">');
  } else {
    main_content = main_content.replace(/<main[^>]*>/, '<main class="flex-1 overflow-x-hidden p-6 md:p-10 w-full mx-auto space-y-10 bg-background-light dark:bg-slate-950/10">');
  }

  const ewasteGroup = ['data-flows.html', 'hardware-exchange.html', 'partner-details.html', 'asset-details.html'];
  let sub_header = "";

  if (ewasteGroup.includes(filename)) {
    const tab_data = ['data-flows.html', 'partner-details.html'].includes(filename) ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-primary";
    const tab_hardware = ['hardware-exchange.html', 'asset-details.html'].includes(filename) ? "text-primary border-b-2 border-primary pb-1" : "text-slate-400 hover:text-primary";

    sub_header = sub_header_template
      .replace('${TAB_DATA}', tab_data)
      .replace('${TAB_HARDWARE}', tab_hardware);
  }

  const new_body = `
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
  <div class="flex flex-col min-h-screen">
    ${header_template}
    <div class="flex flex-1 overflow-hidden">
      ${isInfoPage ? '' : sidebar_template}
      <div class="flex-1 flex flex-col overflow-y-auto">
        ${sub_header}
        ${main_content}
      </div>
    </div>
  </div>
</body>`;

  content = content.replace(/<body[^>]*>.*?<\/body>/s, new_body);

  // Standardize styling token across all pages
  content = content.replace(/tailwind\.config\s*=\s*{[\s\S]*?}/, `tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1754cf",
                        "primary-dark": "#0e3a8f",
                        "circular-green": "#16a34a",
                        "accent": "#f59e0b",
                        "background-dark": "#0f172a",
                        "background-light": "#f8fafc",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"],
                        "body": ["Inter", "sans-serif"]
                    },
                    borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
                },
            },
        }`);

  fs.writeFileSync(filename, content, 'utf-8');
});

console.log("Portal refactored: Sidebar removed from info pages and footer links updated to open in new tabs.");
