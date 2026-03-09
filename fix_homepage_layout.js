const fs = require('fs');

const filesToFix = ['index.html', 'original_index.html'];

filesToFix.forEach(file => {
    if (!fs.existsSync(file)) return;

    let content = fs.readFileSync(file, 'utf8');

    // Add w-full to the hero section container
    content = content.replace(/class="@container z-10"/g, 'class="w-full @container z-10"');

    // Add w-full to the strategic impact container
    content = content.replace(/class="flex flex-col gap-10 px-4 py-16 @container max-w-7xl mx-auto z-10"/g, 'class="flex flex-col gap-10 px-4 py-16 w-full @container max-w-7xl mx-auto z-10"');

    // To be safe, any @container without w-full in the top-level divs that are breaking
    // For original_index.html specifically:
    content = content.replace(/class="flex flex-col gap-10 px-4 py-16 @container max-w-5xl mx-auto z-10"/g, 'class="flex flex-col gap-10 px-4 py-16 w-full @container max-w-5xl mx-auto z-10"');

    fs.writeFileSync(file, content);
});

console.log('Fixed @container layout collapse bugs in index.html and original_index.html');
