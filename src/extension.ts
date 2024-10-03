import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.languages.registerCompletionItemProvider(
        'dart',
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                if (!linePrefix.endsWith('aaa')) {
                    return undefined;
                }

                const snippetCompletion = new vscode.CompletionItem('aaa');
                snippetCompletion.insertText = new vscode.SnippetString(
                    "test('should $1', () async {\n" +
                    "  //arrange\n" +
                    "  $2\n" +
                    "  //act\n" +
                    "  \n" +
                    "  //assert\n" +
                    "  $0\n" +
                    "});"
                );
                snippetCompletion.documentation = new vscode.MarkdownString("Create a test case for Dart");

                return [snippetCompletion];
            }
        },
        'a'
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
