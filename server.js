const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from public directory
app.use(express.static('public'));

// Set up Nunjucks as template engine
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Add custom date filter
nunjucksEnv.addFilter('formatDate', function(dateStr) {
  return new Date(dateStr).toLocaleDateString();
});

app.set('view engine', 'njk');

// Load and parse YAML data
function loadData() {
  try {
    const fileContents = fs.readFileSync('./data.yml', 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error('Error loading data.yml:', e);
    return [];
  }
}

// Routes
app.get('/', (req, res) => {
  const data = loadData();
  res.render('index', { data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
