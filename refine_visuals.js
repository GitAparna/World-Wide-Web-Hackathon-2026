const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// The pages that SHOULD NOT have `<html class="dark">` because they are white-bg light mode pages:
const LIGHT_MODE_PAGES = [
    'annual-report.html',
    'briefing.html',
    'privacy.html',
    'terms.html',
    'user-profile.html'
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Fix Layout Overlapping Issue
    // Earlier scripts ripped out wrappers, causing <main> to squish against the <aside>.
    // If it's a dashboard page (has <aside id="app-sidebar">), ensure it is wrapped properly.
    if (content.includes('<aside id="app-sidebar"')) {
        // Look for the specific pattern we broke earlier: 
        // <header ...>...</header> \n <aside id="app-sidebar"
        // Let's ensure the aside and main are wrapped in <div class="flex flex-1 w-full overflow-hidden">

        // This regex tries to find the `<div class="flex flex-1 overflow-hidden">` opening.
        // Let's just structurally wrap it properly if it's missing or misapplied.
        // Actually, looking at job-forecast, we currently have:
        // <div class="flex flex-1 overflow-hidden">
        //   <aside ...>...</aside>
        //   <div class="flex-1 flex flex-col overflow-y-auto">
        //      <main ...>...</main>
        //   </div>
        // </div>
        // Let's ensure <main> has `flex-1 overflow-y-auto w-full` directly, and we remove that intermediate div that might be breaking.

        let mainMatch = content.match(/<main[^>]*>/i);
        if (mainMatch) {
            let mainStr = mainMatch[0];
            // Ensure main has the right flex properties so it doesn't get squished
            if (!mainStr.includes('w-full')) {
                content = content.replace(mainStr, mainStr.replace('class="', 'class="w-full '));
            }
            if (!mainStr.includes('flex-1')) {
                content = content.replace(mainStr, mainStr.replace('class="', 'class="flex-1 '));
            }
        }
    }

    // Fix index.html specific squish
    if (file === 'index.html') {
        // Ensure `<div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden official-seal-bg">` has `overflow-hidden` correctly or `flex-col` is allowing it to stretch.
        content = content.replace(/class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden/g, 'class="relative flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-auto');
    }


    // 2. Change Navigation Color Scheme for Dashboards
    // Only apply if it's not the index.html page (index has a white nav)
    if (file !== 'index.html') {
        // Change header and aside backgrounds to Dark Slate/Navy (#0A1128)
        content = content.replace(/bg-primary\s+border-b-4\s+border-primary-dark\/20/g, 'bg-[#0A1128] border-b border-white/10'); // Header
        content = content.replace(/bg-primary\s+border-b\s+border-primary-dark/g, 'bg-[#0A1128] border-b border-white/10'); // Header alternate

        content = content.replace(/border-r\s+border-primary-dark\s+bg-primary/g, 'border-r border-white/10 bg-[#0A1128]'); // Sidebar
        content = content.replace(/pb-3\s+border-b\s+border-primary-dark/g, 'pb-3 border-b border-white/10'); // Sidebar Nav divider

        // Change the active/hover text colors in the sidebar so they look good on Dark Slate
        // The old active items were `bg-white/20 hover:text-white transition-all text-blue-50`
        // We'll update hovered links to a nice blue accent
        content = content.replace(/text-blue-50\s+font-semibold\s+group/g, 'text-slate-300 font-semibold group');
        content = content.replace(/hover:bg-white\/20\s+hover:text-white/g, 'hover:bg-primary/20 hover:text-white');
        content = content.replace(/text-blue-300\s+group-hover:text-white/g, 'text-slate-400 group-hover:text-primary');

        // Back button hover state
        content = content.replace(/border-white\/20\s+text-blue-100\s+hover:border-white\s+hover:text-white\s+hover:bg-white\/20/g, 'border-white/10 text-slate-300 hover:border-primary hover:text-white hover:bg-primary/20');

        // Brand text active
        content = content.replace(/group-hover:text-blue-400/g, 'group-hover:text-primary');
    }

    // 3. Address the Invisible Text (Forced Dark Mode Issue)
    if (LIGHT_MODE_PAGES.includes(file)) {
        // Strip out the dark class from HTML tag
        content = content.replace(/<html class="dark" lang="en">/g, '<html lang="en">');
        content = content.replace(/<html class="dark "/g, '<html ');
        // Ensure body is light
        content = content.replace(/dark:bg-background-dark/g, '');
        content = content.replace(/dark:text-white/g, '');
        content = content.replace(/text-white/g, 'text-slate-900'); // Force text defaults to slate-900 if they were purely white
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('✅ Applied comprehensive visual fixes for layout wrapping, navigation colors, and dark-mode visibility constraints.');
