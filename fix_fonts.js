const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const CSS_BLOCK = `    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .official-seal-bg {
            background-image: radial-gradient(circle at 10% 20%, rgba(23, 84, 207, 0.05) 0%, transparent 40%);
        }
    </style>
`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace "Public Sans" font imports with "Inter"
    content = content.replace(/family=Public\+Sans:wght@[a-zA-Z0-9;]+(?:&amp;|&)display=swap/g, 'family=Inter:wght@400;500;600;700;900&display=swap');
    
    // Replace Material+Symbols+Outlined missing FILL to include FILL
    content = content.replace(/family=Material\+Symbols\+Outlined:wght@100\.\.700,0\.\.1(?:&amp;|&)display=swap/g, 'family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
    content = content.replace(/family=Material\+Symbols\+Outlined:wght@400(?:&amp;|&)display=swap/g, 'family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

    // Make tailwind config fonts consistent
    content = content.replace(/"display":\s*\["Public Sans",\s*"Inter",\s*"sans-serif"\]/g, '"display": ["Inter", "sans-serif"]');
    content = content.replace(/"body":\s*\["Public Sans",\s*"Inter",\s*"sans-serif"\]/g, '"body": ["Inter", "sans-serif"]');

    // Add necessary CSS block for .material-symbols-outlined if missing
    if (!content.includes('font-variation-settings: \'FILL\' 0, \'wght\' 400, \'GRAD\' 0, \'opsz\' 24;')) {
        content = content.replace(/<\/head>/i, CSS_BLOCK + '</head>');
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed fonts and icons across all HTML files.');
