const nunjucks = require('nunjucks');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));

function RemoteExtension() {
  this.tags = ['remote'];

  this.parse = function (parser, nodes, lexer) {
    console.log('parser: ', JSON.stringify(lexer, null, 3));
    // get the tag token
    var tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // parse the body and possibly the error block, which is optional
    var body = parser.parseUntilBlocks('error', 'endtruncate');
    var errorBody = null;

    if (parser.skipSymbol('error')) {
      parser.skip(lexer.TOKEN_BLOCK_END);
      errorBody = parser.parseUntilBlocks('endremote');
    }

    parser.advanceAfterBlockEnd();

    // See above for notes about CallExtension
    return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
  };

  this.run = function (context, url, body, errorBody) {
    console.log('-----------run: ', url);
    var id = 'el' + Math.floor(Math.random() * 10000);
    var ret = new nunjucks.runtime.SafeString('<div id="' + id + '">' + body() + '</div>');
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (ajax.readyState == 4) {
        if (ajax.status == 200) {
          document.getElementById(id).innerHTML = ajax.responseText;
        }
        else {
          document.getElementById(id).innerHTML = errorBody();
        }
      }
    };

    ajax.open('GET', url, true);
    ajax.send();

    return ret;
  };
}

env.addExtension('RemoteExtension', new RemoteExtension());

const template = `
{% remote "/stuff" %}
  {{ world }}
  This content will be replaced with the content from /stuff
{% error %}
  There was an error fetching /stuff
{% endremote %}

{{ name }} Hello, {{ name }}!
`;

env.renderString(template, {}, function (err, res) {
  // console.log('res: ', JSON.stringify(res, null, 5));
});
