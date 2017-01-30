class Character {
    constructor(shortname, name, expressions) {
        this.shortname = shortname;
        this.namer = name;
        this.expressions = expressions;
		this.currentExpression = 0;
		this.previousExpression = "";
		this.side = "left";
		this.mirrored = false;
		this.color = "black";
    }
	changeSide(){
		if (this.side == "left") this.side = "right";
		else this.side = "left";
	}
	changeMirror(){
		if (this.mirrored == false) this.mirrored = true;
		else this.mirrored = false;
	}
	setColor(color){
		this.color = color;
	}
	setCurrentExpression(expr_id){
		this.previousExpression = this.currentExpression;
		this.currentExpression = expr_id;
	}
	getExpression(id){
		return this.expressions[id];
	}
	getPreviousExpression(){
		return this.previousExpression;
	}
	getCurrentExpression(){
		return this.currentExpression;
	}
	getExpressions(){
		return this.expressions;
	}
    getShortname() {
        return this.shortname;
    }
	getName() {
		return this.namer;
	}
	getSide(){
		return this.side;
	}
	getMirror(){
		return this.mirrored;
	}
	getColor(){
		return this.color;
	}
}