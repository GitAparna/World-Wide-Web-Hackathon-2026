import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

header_template = """
    <!-- Header -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-primary/20 bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 lg:px-10 sticky top-0 z-50">
      <div class="flex items-center gap-2 md:gap-4">
        <button onclick="toggleSidebar()" class="p-2 hover:bg-white/10 rounded-lg text-white">
            <span class="material-symbols-outlined">menu</span>
        </button>
        <div class="flex items-center gap-2 cursor-pointer" onclick="window.location.href='index.html'">
          <div class="flex items-center justify-center size-8 md:size-10 rounded-lg bg-primary/20 text-green-500">
            <span class="material-symbols-outlined text-2xl md:text-3xl">recycling</span>
          </div>
          <h2 class="text-base md:text-lg font-bold leading-tight tracking-tight text-white hidden sm:block">Montgomery Circular Tech</h2>
        </div>
      </div>
      <div class="flex flex-1 justify-end gap-6 items-center">
        <div class="flex items-center gap-2">
          <div class="bg-cover bg-center size-8 md:size-10 rounded-full bg-primary/30 border-2 border-primary cursor-pointer hover:shadow-[0_0_10px_rgba(77,234,62,0.5)] transition-shadow"
            data-alt="User profile avatar abstract green gradient" onclick="window.location.href='user-profile.html'" style="background-image: url('avatar.png');"></div>
        </div>
      </div>
    </header>

    <!-- Sidebar Popover -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-slate-900/50 z-[60] hidden backdrop-blur-sm transition-opacity" onclick="toggleSidebar()"></div>
    <aside id="app-sidebar"
      class="fixed inset-y-0 left-0 z-[70] flex w-72 flex-col border-r border-primary/20 bg-slate-50 dark:bg-slate-900 p-6 gap-6 transform -translate-x-full transition-transform duration-300 shadow-2xl">
      <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Navigation</p>
          <button onclick="toggleSidebar()" class="p-1 hover:bg-slate-200 dark:hover:bg-white/10 rounded text-slate-500"><span class="material-symbols-outlined">close</span></button>
      </div>
      <div class="flex flex-col gap-2">
        <a href="data-flows.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-slate-700 dark:text-slate-300 font-medium">
          <span class="material-symbols-outlined">dashboard</span>
          <p class="text-sm">E-Waste Data flows</p>
        </a>
        <a href="job-forecast.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-slate-700 dark:text-slate-300 font-medium">
          <span class="material-symbols-outlined">trending_up</span>
          <p class="text-sm">Job Forecast</p>
        </a>
        <a href="zone-development.html"
          class="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-slate-700 dark:text-slate-300 font-medium">
          <span class="material-symbols-outlined">architecture</span>
          <p class="text-sm">Zone Development</p>
        </a>
      </div>
    </aside>

    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('app-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        }
    </script>
"""

sub_header_template = """
    <!-- E-Waste Data Flows Sub-Header -->
    <div class="bg-white dark:bg-background-dark/90 border-b border-primary/20 px-6 lg:px-10 flex gap-8 overflow-x-auto sticky top-[57px] md:top-[65px] z-40 backdrop-blur-md">
        <a href="data-flows.html" class="whitespace-nowrap py-4 text-sm font-bold border-b-[3px] ${TAB_DATA} transition-colors">E-Waste Data flows</a>
        <a href="hardware-exchange.html" class="whitespace-nowrap py-4 text-sm font-bold border-b-[3px] ${TAB_HARDWARE} transition-colors">Hardware Exchange</a>
        <a href="environmental-impact.html" class="whitespace-nowrap py-4 text-sm font-bold border-b-[3px] ${TAB_IMPACT} transition-colors">Impact Analytics</a>
    </div>
"""

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    main_match = re.search(r'(<main[^>]*>.*?<\/main>)', content, re.DOTALL)
    if not main_match:
        print(f"Skipping {filename}: No <main> tag found.")
        return

    main_content = main_match.group(1)
    
    # Let's cleanly set main padding to be expansive now that sidebar is gone
    main_content = re.sub(r'<main[^>]*>', '<main class="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 lg:p-12">', main_content, count=1)

    is_ewaste_group = filename in ['data-flows.html', 'hardware-exchange.html', 'environmental-impact.html', 'partner-details.html', 'asset-details.html']
    
    sub_header = ""
    if is_ewaste_group:
        tab_data = "border-primary text-primary" if filename in ['data-flows.html', 'partner-details.html'] else "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
        tab_hardware = "border-primary text-primary" if filename in ['hardware-exchange.html', 'asset-details.html'] else "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
        tab_impact = "border-primary text-primary" if filename == 'environmental-impact.html' else "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
        
        sub_header = sub_header_template.replace('${TAB_DATA}', tab_data).replace('${TAB_HARDWARE}', tab_hardware).replace('${TAB_IMPACT}', tab_impact)

    new_body = f"""
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased selection:bg-primary/30 selection:text-primary">
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden relative">
    {header_template}
    {sub_header}
    {main_content}
  </div>
</body>"""

    content = re.sub(r'<body[^>]*>.*?<\/body>', new_body, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

for f in html_files:
    process_file(f)

print("Refactored layout successfully.")
