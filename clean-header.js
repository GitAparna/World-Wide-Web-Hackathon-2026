const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const targetAvatarHtml = `<div class="bg-cover bg-center size-8 rounded-full bg-primary/30 border-2 border-primary cursor-pointer"
            data-alt="User profile avatar abstract green gradient" onclick="window.location.href='user-profile.html'" style="background-image: url('avatar.png'); cursor:pointer;"></div>`;

fs.readdirSync(dirPath).forEach(filename => {
    if (!filename.endsWith('.html')) return;
    const filepath = path.join(dirPath, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // Replace all broken avatars with the clean target
    content = content.replace(/<div[^>]*data-alt="User profile avatar abstract green gradient"[^>]*><\/div>/g, targetAvatarHtml);

    fs.writeFileSync(filepath, content, 'utf8');
});
console.log("Avatar clean up completed.");
