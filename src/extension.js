var vscode = require("vscode");
function activate(context) {
    var disposable = vscode.languages.registerCompletionItemProvider("dart", {
        provideCompletionItems: function (document, position) {
            var linePrefix = document
                .lineAt(position)
                .text.substr(0, position.character);
            if (!linePrefix.endsWith("aaa")) {
                return undefined;
            }
            var snippetCompletion = new vscode.CompletionItem("aaa");
            snippetCompletion.insertText = new vscode.SnippetString("test('should $1', () async {\n" +
                "  //arrange\n" +
                "  $2\n" +
                "  //act\n" +
                "  \n" +
                "  //assert\n" +
                "  $0\n" +
                "});");
            snippetCompletion.documentation = new vscode.MarkdownString("Create a test case for Dart");
            return [snippetCompletion];
        }
    }, "a");
    context.subscriptions.push(disposable);
}
function deactivate() { }
module.exports = {
    activate: activate,
    deactivate: deactivate
};
