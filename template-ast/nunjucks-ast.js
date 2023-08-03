const nunjucks = require('nunjucks');
const { parse } = require('nunjucks/src/parser');

// 要解析的模板
const templateString = '{{ foo + bar }}';

// 解析模板并得到AST
const ast = parse(templateString, true);

// 打印第一个节点的所有字段和属性
console.log(JSON.stringify(ast, null, 3));
