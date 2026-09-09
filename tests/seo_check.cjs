const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.argv[2] || '../work/jekyll-site';
for (const file of ['index.html', 'code.html', 'maps.html', 'blog.html', 'python/gis/2025/01/02/mi-primer-analisis.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(match, file + ': structured data present');
  const data = JSON.parse(match[1]);
  const graph = data['@graph'];
  const ids = new Set(graph.map(node => node['@id']));
  assert.equal(graph[0].name, 'Jorge Ulloa Roa');
  for (const node of graph) {
    assert(new URL(node.url).protocol === 'https:');
    for (const key of ['author', 'publisher', 'isPartOf', 'mainEntity']) {
      if (node[key]) assert(ids.has(node[key]['@id']), file + ': resolvable ' + key);
    }
  }
  assert.equal(graph[2]['@type'], file === 'index.html' ? 'ProfilePage' : file.includes('2025/') ? 'BlogPosting' : 'CollectionPage');
}
assert(fs.readFileSync(path.join(root, '404.html'), 'utf8').includes('content="noindex, follow"'));
console.log('PASS: JSON-LD, entity references, page types and 404 noindex.');
