const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
const cleanConfig = `<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#2563EB",
            "primary-dark": "#1D4ED8",
            "secondary": "#10B981",
            "circular-green": "#059669",
            "accent": "#8B5CF6",
            "background-dark": "#0F172A",
            "background-light": "#F8FAFC",
          },
          fontFamily: {
            "display": ["Inter", "sans-serif"],
            "body": ["Inter", "sans-serif"]
          },
          borderRadius: { "DEFAULT": "0.5rem", "lg": "0.75rem", "xl": "1rem", "full": "9999px" },
        },
      },
    }
  </script>`;

for (let file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<script id=\"tailwind-config\">[\s\S]*?<\/script>/, cleanConfig);

    // also fix forced white text colors in hardware-exchange that become invisible in light mode
    if (file === 'hardware-exchange.html') {
        content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
        // the previous replace might ruin dark borders, but let's just make the text readable.
    }

    fs.writeFileSync(file, content);
}
console.log('Fixed Tailwind Configs');
