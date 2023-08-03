const Handlebars = require('handlebars');

// const fs = require('fs');
// const coder = require('./precompile.js')
// const evalresult = eval(coder)

Handlebars.partials["test1"] = Handlebars.template({
  "compiler": [8, ">= 4.3.0"], "main": function (container, depth0, helpers, partials, data) {
    var helper, lookupProperty = container.lookupProperty || function (parent, propertyName) {
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
      }
      return undefined
    };

    return "Handlebars <b>"
      + container.escapeExpression(((helper = (helper = lookupProperty(helpers, "doesWhat") || (depth0 != null ? lookupProperty(depth0, "doesWhat") : depth0)) != null ? helper : container.hooks.helperMissing), (typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), { "name": "doesWhat", "hash": {}, "data": data, "loc": { "start": { "line": 1, "column": 14 }, "end": { "line": 1, "column": 26 } } }) : helper)))
      + "</b> precompiled!";
  }, "useData": true
});

var result = Handlebars.partials["test1"]({ doesWhat: "yourname" });
console.log(result);
// 使用得到的 result
