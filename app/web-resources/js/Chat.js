class Chat {
    constructor(layerID, inputID) {
		this.layerID = layerID;
		this.inputID = inputID;
	}
	sendMessage(character, withImage){
		var message = document.createElement('div');
		message.classList.add("message","me");
		var bubble = document.createElement('div');
		bubble.classList.add("bubble");
		bubble.innerHTML = '<b>'+character.getName()+'</b><br>';
		var text = document.createElement('span');
		text.classList.add(character.getColor());
		text.innerHTML = $("#"+this.inputID).val();
		$(bubble).append(text);
		$(message).append(bubble);
		if (withImage == true){
			var imagen = document.createElement('div');
			imagen.classList.add("bubble-image");
			imagen.innerHTML = '<img src="game-resources/characters/'+character.getShortname()+'/buttons/'+character.getExpression(character.getCurrentExpression())+'.png"/>';
			$(message).prepend(imagen);
		}
		$("#"+this.layerID).append(message);
		$("#"+this.layerID).scrollTop($("#"+this.layerID).prop("scrollHeight")); 
		$("#"+this.inputID).val("");
	}
	showMessage(){
		
	}
	getLayerID(){
		return this.layerID;
	}
    getInputID() {
        return this.inputID;
    }
	getButtonID() {
		return this.buttonID;
	}
}
