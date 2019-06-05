function run(){
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(
        Blockly.getMainWorkspace());

    console.log(code);
    
    try {
        eval(code);
    } catch (error) {
        console.log(error);
    };
}

document.querySelector('#executar').addEventListener('click', run);

Blockly.inject('blockly-div', {
    media: './lib/blockly-master/media/',
    toolbox: document.getElementById('toolbox'),
    toolboxPosition: 'end',
    horizontalLayout: true,
    scrollbars: false
});