Blockly.defineBlocksWithJsonArray([
    {
      "type": "andar_frente",
      "message0": "Andar Adiante",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 355,
      "tooltip": "",
      "helpUrl": ""
    }
]);

Blockly.JavaScript['andar_frente'] = function(block) {
    return 'setTimeout( function timer(){ robo.y -= tiled }, count*1000 ); \n';
};