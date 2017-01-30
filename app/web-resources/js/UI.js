class UI {
    constructor(charlist, room) {
		this.room = room;
		this.charlist = charlist;
		
		for (var i in charlist){
			$("#pjList").append('<a href="#!" id="pj_'+i+'"><img src="game-resources/characters/'+charlist[i].shortname+'/'+charlist[i].shortname+'_thumbnail.png" alt="'+charlist[i].name+'" title="'+charlist[i].name+'"/></a>');
		}
		$("#selectCharacter").show();
		
		$("#background").css("background", "url('game-resources/rooms/"+room+".png')");
		this.historyChat = new Chat("history-content", "textHMessage");
		this.normalChat = new Chat("chat-content", "textCMessage");
	}
	initListeners(){
		var g_object = this;
		$("#expressionlist").on("click", "a", function(event) {
			g_object.selectMood(event.currentTarget.id.split("_")[1]);
		});
		$("#tabs").on("click", "a", function(event) {
			g_object.changeToTab(event.currentTarget.id.split("-")[0]);
		});
		$("#pjList").on("click", "a", function(event) {
			g_object.selectCharacter(event.currentTarget.id.split("_")[1]);
		});
		$("#btnChangeColor").on("click", "a", function (event) {
			g_object.changeColor($(event.currentTarget).attr("class").split(" ")[1]);
		});
		$("#pjList a").hover(
			function(event) {
				g_object.hoverCharacter(event.currentTarget.id.split("_")[1]);
			}, function(event) {
				$("#pjBanner").html('<img src="web-resources/images/no_bigart.png"/>');
			}
		);
		$("#changeSide").click(function(e){
			if (g_object.mychar.getSide() == "left"){
				$("#changeSide").text("Derecha");
			} else {
				$("#changeSide").text("Izquierda");
			}
			g_object.mychar.changeSide();
		});
		$("#changeOrientation").click(function(e){
			if (g_object.mychar.getMirror() == false){
				$("#changeOrientation").text("Espejado");
			} else {
				$("#changeOrientation").text("No espejado");
			}
			g_object.mychar.changeMirror();
		});
		$("#changeCharacter").click(function(e){
			$("#game").hide();
			$("#selectCharacter").show();
		});
		$("#btnSendHMessage").click(function(e){
			if ($("#textHMessage").val() != ""){
				$("#pj-"+g_object.mychar.getSide()).css("background-image", "url('game-resources/characters/"+g_object.mychar.getShortname()+"/"+g_object.mychar.getExpression(g_object.mychar.getCurrentExpression())+".png')");
				$("#pj-"+g_object.mychar.getSide()+" img").prop("src", "game-resources/characters/"+g_object.mychar.getShortname()+"/"+g_object.mychar.getExpression(g_object.mychar.getCurrentExpression())+".png");
				if (g_object.mychar.getMirror()) $("#pj-"+g_object.mychar.getSide()).addClass("mirror");
				else $("#pj-"+g_object.mychar.getSide()).removeClass("mirror");
				$("#text").html($("#textHMessage").val());
				if (g_object.mychar.getSide() == "left") {
					$("#name").removeClass("nright");
					$("#name").addClass("nleft");
				} else {
					$("#name").removeClass("nleft");
					$("#name").addClass("nright");
				}
				$("#text").removeClass($("#text").attr("class"));
				$("#text").addClass(g_object.mychar.getColor());
				$("#name").html(g_object.mychar.getName());
				g_object.historyChat.sendMessage(g_object.mychar, true);
			}
		});
		$("#textHMessage").keypress(function(event) {
			if (event.which == 13) {
				event.preventDefault();
				if ($("#textHMessage").val() != ""){
					$("#pj-"+g_object.mychar.getSide()).css("background-image", "url('game-resources/characters/"+g_object.mychar.getShortname()+"/"+g_object.mychar.getExpression(g_object.mychar.getCurrentExpression())+".png')");
					$("#pj-"+g_object.mychar.getSide()+" img").prop("src", "game-resources/characters/"+g_object.mychar.getShortname()+"/"+g_object.mychar.getExpression(g_object.mychar.getCurrentExpression())+".png");
					if (g_object.mychar.getMirror()) $("#pj-"+g_object.mychar.getSide()).addClass("mirror");
					else $("#pj-"+g_object.mychar.getSide()).removeClass("mirror");
					$("#text").html($("#textHMessage").val());
					if (g_object.mychar.getSide() == "left") {
						$("#name").removeClass("nright");
						$("#name").addClass("nleft");
					} else {
						$("#name").removeClass("nleft");
						$("#name").addClass("nright");
					}
					$("#text").removeClass($("#text").attr("class"));
					$("#text").addClass(g_object.mychar.getColor());
					$("#name").html(g_object.mychar.getName());
					g_object.historyChat.sendMessage(g_object.mychar, true);
				}
			}
		});
		$("#btnSendCMessage").click(function(e){
			g_object.normalChat.sendMessage(g_object.mychar, false);
		});
		$("#textCMessage").keypress(function(event) {
			if (event.which == 13) {
				event.preventDefault();
				g_object.normalChat.sendMessage(g_object.mychar, false);
			}
		});
		$("#toggle-events").click(function(){
			g_object.toogleTab('events');
		});
		$("#toggle-errors").click(function(){
			g_object.toogleTab('errors');
		});
		$("#logout").click(function(){
			localStorage.removeItem("connectionData");
			location.reload();
		});
	}
	initUI(){
		$("#expressionlist").html("");
		for (var i = 0; i < this.mychar.getExpressions().length; i++){
			var selected = "";
			if (i == this.mychar.getCurrentExpression()) selected = 'class="selected"'
			$("#expressionlist").append('<a href="#!" '+selected+' id="mood_'+i+'"><img src="game-resources/characters/'+this.mychar.getShortname()+'/buttons/'+this.mychar.getExpression(i)+'.png" alt="'+this.mychar.getExpression(i)+'" title="'+this.mychar.getExpression(i)+'"/></a>')
		}
		$("#changeSide").html("Izquierda");
		$("#changeOrientation").html("No espejado");
		$("#btnChangeColor").removeClass($("#btnChangeColor").attr("class").split(" ")[1]);
		$("#btnChangeColor").addClass("black");
		$("#selectCharacter").hide();
		$("#game").show();
	}
	hoverCharacter(i){
		$("#pjBanner").html('<img src="game-resources/characters/'+this.charlist[i].shortname+'/'+this.charlist[i].shortname+'_bigart.png"/>');
	}
	selectCharacter(i){
		this.mychar = new Character(this.charlist[i].shortname,this.charlist[i].name, this.charlist[i].expressions);
		this.initUI();
	}
	changeToTab(id){
		$("#tab-content>div").hide();
		$("#"+id).show();
		$("#tabs a").removeClass("active");
		$("#"+id+"-tab").addClass("active");
		$("#"+id+"-content").scrollTop($("#"+id+"-content").prop("scrollHeight")); 
	}
	selectMood(id){
		this.mychar.setCurrentExpression(id);
		$("#mood_"+this.mychar.getPreviousExpression()).removeClass("selected");
		$("#mood_"+this.mychar.getCurrentExpression()).addClass("selected");
	}
	changeColor(color){
		this.mychar.setColor(color);
		$("#btnChangeColor").removeClass($("#btnChangeColor").attr("class").split(" ")[1]);
		$("#btnChangeColor").addClass(color);
	}
	toogleTab(tab){
		if ($("#"+tab+"-tab").css('display') == 'none') {
			$("#toggle-"+tab).html($("#toggle-"+tab).html().replace("Ver", "Ocultar"));
			this.changeToTab(tab);
		} else {
			if ($("#"+tab).css('display') == 'block') this.changeToTab("history");
			$("#toggle-"+tab).html($("#toggle-"+tab).html().replace("Ocultar", "Ver"));
		}
		$("#"+tab+"-tab").toggle();
		
	}
	preloadImage(shortname, expressionList) {
		imagenes = [];
		for (i=0; i< expressionList.length; i++){
			imagenes[i] = new Image();
			imagenes[i].src = "game-resources/characters/"+shortname+"/"+expressionList[i]+".png";
		}
	}
	getMyChar(){
		return this.mychar;
	}
}
