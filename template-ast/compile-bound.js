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

// 解析模板为AST
const ast = parse(templateString);

// 用于收集字段类型的对象
const fieldTypes = {
  title: 'string',
  name: 'string',
  message: 'string',
  content: 'string',
  age: 'string',
  is_active: 'string',
  items: 'array'
};

// 实际数据
const data = {
  title: 'Sample Title',
  name: 'John Doe',
  message: 'This is a sample message',
  content: '<strong>Sample HTML content</strong>',
  age: 30,
  is_active: true,
  items: ['Item 1', 'Item 2', 'Item 3']
};

// 将实际数据绑定到模板
const template = Handlebars.compile(templateString);
const renderedHtml = template(data);

// 输出渲染后的HTML
console.log(renderedHtml);
