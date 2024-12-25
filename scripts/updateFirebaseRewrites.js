const fs = require("fs");
const path = require("path");

const outDirectory = path.join(__dirname, "../out"); // Adjust if your directory structure is different
const firebaseConfigPath = path.join(__dirname, "../firebase.json");

// Function to read all .html files from a directory
function readHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  let htmlFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively read nested directories
      htmlFiles = [...htmlFiles, ...readHtmlFiles(filePath)];
    } else if (file.endsWith(".html") && file !== "index.html") {
      // Remove the 'out' directory and '.html' extension from path
      const relativePath = path.relative(outDirectory, filePath).replace(/\.html$/, "");
      htmlFiles.push(`/${relativePath}`);
    }
  });

  return htmlFiles;
}

const htmlFiles = readHtmlFiles(outDirectory);

// Generate rewrite rules for each HTML file
let rewrites = htmlFiles.map((file) => ({
  source: `${file}{,/**}`,
  destination: `${file}.html`,
}));

// Add the root path rewrite at the end
rewrites.push({
  source: "/{,/**}",
  destination: "/index.html",
});

// Read the existing firebase.json configuration
const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf8"));

// Update the rewrites in firebase.json
firebaseConfig.hosting = firebaseConfig.hosting || {};
firebaseConfig.hosting.rewrites = rewrites;

// Write the updated configuration back to firebase.json
fs.writeFileSync(firebaseConfigPath, JSON.stringify(firebaseConfig, null, 2));

console.log("firebase.json has been updated with new rewrites.");
