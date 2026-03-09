import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

unified_sidebar = """<aside
        class="hidden md:flex w-64 shrink-0 flex-col border-r border-primary/10 bg-white dark:bg-background-dark/50 p-4 gap-6 bg-slate-900 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
        <div class="flex flex-col gap-1">
          <a href="data-flows.html"
            class="flex items-center gap-3 px-3 py-2 rounded-lg ${DATA_FLOWS_CLASS} transition-colors">
            <span class="material-symbols-outlined">dashboard</span>
            <p class="text-sm font-semibold">E-Waste Data flows</p>
          </a>
          <a href="job-forecast.html"
            class="flex items-center gap-3 px-3 py-2 rounded-lg ${JOB_FORECAST_CLASS} transition-colors">
            <span class="material-symbols-outlined">trending_up</span>
            <p class="text-sm font-medium">Job Forecast</p>
          </a>
          <a href="zone-development.html"
            class="flex items-center gap-3 px-3 py-2 rounded-lg ${ZONE_DEVELOPMENT_CLASS} transition-colors">
            <span class="material-symbols-outlined">architecture</span>
            <p class="text-sm font-medium">Zone Development</p>
          </a>
        </div>
        <div class="mt-auto p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10">
          <p class="text-xs font-bold uppercase tracking-wider mb-2 text-green-600">System Status</p>
          <div class="flex items-center gap-2">
            <div class="size-2 rounded-full animate-pulse bg-green-500"></div>
            <p class="text-xs text-slate-600 dark:text-slate-300">Live feeds active</p>
          </div>
        </div>
      </aside>"""

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Active class logic (bg-primary/10 text-green-600 vs text-slate-600 hover:...)
    # But some screens are dark bg by default and some are light. `data-flows.html` uses `bg-slate-900` for sidebar.
    db_group = ['data-flows.html', 'hardware-exchange.html', 'environmental-impact.html', 'partner-details.html', 'asset-details.html']
    
    data_flows_class = "bg-primary/10 text-green-600" if f in db_group else "hover:bg-slate-50 dark:hover:bg-white/5"
    job_forecast_class = "bg-primary/10 text-green-600" if f == 'job-forecast.html' else "hover:bg-slate-50 dark:hover:bg-white/5"
    zone_development_class = "bg-primary/10 text-green-600" if f in ['zone-development.html', 'briefing.html'] else "hover:bg-slate-50 dark:hover:bg-white/5"

    sidebar = unified_sidebar.replace('${DATA_FLOWS_CLASS}', data_flows_class)
    sidebar = sidebar.replace('${JOB_FORECAST_CLASS}', job_forecast_class)
    sidebar = sidebar.replace('${ZONE_DEVELOPMENT_CLASS}', zone_development_class)

    # Replace <aside>
    new_content = re.sub(r'<aside[\s\S]*?<\/aside>', sidebar, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)

print('Sidebar updated successfully.')
