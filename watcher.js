// const chokidar = require('chokidar');
// const { exec } = require('child_process');
// const path = require('path');

// // Path to the public directory
// const publicDir = path.join(__dirname, 'public');

// // Initialize the watcher
// const watcher = chokidar.watch(publicDir, {
//   persistent: true,
//   ignored: /^\./, // Ignore dotfiles
//   ignoreInitial: true, // Ignore initial events (no initial restart)
//   followSymlinks: true
// });

// // File extensions to watch (images)
// const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

// // Watch for added files in the public directory and its subdirectories
// watcher.on('add', (filePath) => {
//   // Check if the added file is an image
//   const extname = path.extname(filePath).toLowerCase();
//   if (imageExtensions.includes(extname)) {
//     console.log(`Image added: ${filePath}`);
//     restartPm2();
//   }
// });

// // Function to restart pm2
// function restartPm2() {
//   exec('pm2 restart lms', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error restarting pm2: ${stderr}`);
//       return;
//     }
//     console.log(`pm2 restarted successfully: ${stdout}`);
//   });
// }

// console.log(`Watching for new images in ${publicDir}...`);
const chokidar = require('chokidar');
const { exec } = require('child_process');
const path = require('path');

// Path to the public directory
const publicDir = path.join(__dirname, 'public');

// Initialize the watcher
const watcher = chokidar.watch(publicDir, {
  persistent: true,
  ignored: /^\./, // Ignore dotfiles
  ignoreInitial: true, // Ignore initial events (no initial restart)
  followSymlinks: true
});

// File extensions to watch (images)
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

// Watch for added files in the public directory and its subdirectories
watcher.on('add', (filePath) => {
  // Check if the added file is an image
  const extname = path.extname(filePath).toLowerCase();
  if (imageExtensions.includes(extname)) {
    console.log(`Image added: ${filePath}`);
    restartPm2();
  }
});

// Function to restart pm2
function restartPm2() {
  exec('pm2 restart lms', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error restarting pm2: ${stderr}`);
      return;
    }
    console.log(`pm2 restarted successfully: ${stdout}`);
  });
}

console.log(`Watching for new images in ${publicDir}...`);
