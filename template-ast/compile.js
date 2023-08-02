const Handlebars = require('handlebars');
const { parse } = require('handlebars');

// 用户自定义的模板
const templateString = `
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>Hello, {{ name }}!</h1>
    <p>{{ message }}</p>
    <div>{{ content }}</div>
    <span>{{ age }}</span>
    <input type="checkbox" {{ is_active }}> Active
    <ul>
        {{#each items}}
            <li>{{ first }} {{ last }}</li>
        {{/each}}
    </ul>
</body>
</html>
`;


// 实际数据
const data = {
  title: 'Sample Title',
  name: 'John Doe',
  message: 'This is a sample message',
  content: '<strong>Sample HTML content</strong>',
  age: 30,
  is_active: true,
  items: [{ first: 'zhou', last: 'zheng' }, { first: 'xiao', last: 'ming' }]
};

// 将实际数据绑定到模板
// const template = Handlebars.compile(templateString);
// const renderedHtml = template(data);
// return console.log('renderedHtml: ', renderedHtml);
//
// ---------------------------------------------------------

// 将模板解析为AST
const ast = parse(templateString);
// return console.log(JSON.stringify(ast, null, 3));

// 用于收集字段类型的对象
const fieldTypes = {};

// 分析AST并收集字段类型
function analyzeAST(node, parentName = null) {
  const fieldName = node.path?.original;
  if (node.path?.original === 'each') {
    // 进入 {{#each}} 语句内部
    const eachNode = node.program;
    eachNode.body.forEach(childNode => {
      return analyzeAST(childNode, fieldName)
    });
  } else if (node.type === 'MustacheStatement' || node.type === 'BlockStatement') {
    if (parentName) {
      if (!fieldTypes[parentName]) {
        fieldTypes[parentName] = { type: 'array', children: {} };
      }
      fieldTypes[parentName].children[fieldName] = { type: 'string' };
      return;
    } else {
      // 其他情况假设为字符串类型
      fieldTypes[fieldName] = { type: 'string' };
    }
  } else if (node.type === 'Program') {
    node.body.forEach(childNode => {
      analyzeAST(childNode)
    });
  }
}

// 开始分析AST
analyzeAST(ast);

// 输出字段类型
console.log((JSON.stringify(fieldTypes, null, 2)));
