let Handlebars = require("handlebars");

let template = "Handlebars <b>{{doesWhat}}</b> precompiled!";
let compiled = Handlebars.precompile(template);
console.log(compiled);
