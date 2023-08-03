const nunjucks = require('nunjucks')

const template = '{{ name }} Hello, {{ name }}!';
console.log(' nunjucks.parser: ', nunjucks.parser);

const ast = nunjucks.parser.parse(template, true);

console.log(JSON.stringify(ast, null, 3));

// console.log(nunjucks.renderString(template, { name: 'zhouzheng' }))
