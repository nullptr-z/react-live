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
            <li>{{ this }}</li>
        {{/each}}
    </ul>
</body>
</html>
`;

// 将模板解析为AST
const ast = parse(templateString);

// 用于收集字段类型的对象
const fieldTypes = {};

// 分析AST并收集字段类型
function analyzeAST(node, parentEach = null) {
  if (node.type === 'MustacheStatement') {
    const fieldName = node.path.original;
    if (parentEach) {
      // 如果父节点是 {{#each}} 语句，则假设为数组类型
      fieldTypes[fieldName] = 'array';
    } else {
      // 其他情况假设为字符串类型
      fieldTypes[fieldName] = 'string';
    }
  } else if (node.type === 'BlockStatement' && node.path.original === 'each') {
    // 进入 {{#each}} 语句内部
    const eachNode = node.program;
    eachNode.body.forEach(childNode => analyzeAST(childNode, node.path.original));
  } else if (node.type === 'Program') {
    node.body.forEach(childNode => analyzeAST(childNode, parentEach));
  }
}

// 开始分析AST
analyzeAST(ast);

// 输出字段类型
console.log(fieldTypes);
