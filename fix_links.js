const fs = require('fs');
const path = require('path');

const dirPath = __dirname;

const pageMap = {
    "dashboard": "data-flows.html",
    "overview": "data-flows.html",
    "impact": "environmental-impact.html",
    "esg": "environmental-impact.html",
    "proposal": "zone-development.html",
    "zone": "zone-development.html",
    "job": "job-forecast.html",
    "report": "job-forecast.html",
    "hardware": "hardware-exchange.html",
    "inventory": "hardware-exchange.html",
    "asset": "hardware-exchange.html",
    "contact": "index.html",
    "privacy": "index.html",
    "terms": "index.html",
    "settings": "index.html",
    "started": "zone-development.html",
    "briefing": "zone-development.html",
    "manage all": "data-flows.html",
    "add listing": "hardware-exchange.html",
    "export": "data-flows.html",
    "download": "data-flows.html",
    "view all": "data-flows.html",
    "share": "zone-development.html"
};

function inferLink(text) {
    if (!text) return "index.html";
    const t = text.toLowerCase();
    for (const [key, value] of Object.entries(pageMap)) {
        if (t.includes(key)) return value;
    }
    return "index.html";
}

fs.readdirSync(dirPath).forEach(filename => {
    if (!filename.endsWith('.html')) return;
    const filepath = path.join(dirPath, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace <a href="#">
    content = content.replace(/<a([^>]+)href="#"([^>]*)>([\s\S]*?)<\/a>/gi, (match, prefix, suffix, innerHTML) => {
        const target = inferLink(innerHTML);
        return `<a${prefix}href="${target}"${suffix}>${innerHTML}</a>`;
    });

    // Replace <button> with onclick
    content = content.replace(/<button([^>]*)>([\s\S]*?)<\/button>/gi, (match, attrs, innerHTML) => {
        if (attrs.includes('onclick')) return match;
        const target = inferLink(innerHTML);
        return `<button${attrs} onclick="window.location.href='${target}'">${innerHTML}</button>`;
    });

    fs.writeFileSync(filepath, content, 'utf8');
});

console.log("Links and buttons updated successfully via Node API.");
