var mouse : Vector2;
var w : int = 32;
var h : int = 32;
var cursor : Texture2D;
var cursorRed : Texture2D;
var cursorBlue : Texture2D;

var violate : Texture2D;
function Start(){
     Screen.showCursor = false;
}
     
function Update(){
     mouse = new Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y);
     
}
     
function OnGUI(){
	if(GetComponent(gameMaster) != null){
		var turn : int = GetComponent(gameMaster).whichTurn;
	
	//if(GameObject.FindWithTag("hud").GetComponent(guiOverlay) != null)
		var isViolating : boolean = GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating;
		
		if(isViolating)
	    	GUI.DrawTexture(new Rect(mouse.x - (w / 2), mouse.y - (h / 2), w, h), violate);
		else if(turn == -1)
	     	GUI.DrawTexture(new Rect(mouse.x - (w / 2), mouse.y - (h / 2), w, h), cursorRed);
	    else if(turn == 1)
	    	GUI.DrawTexture(new Rect(mouse.x - (w / 2), mouse.y - (h / 2), w, h), cursorBlue);
	    }
    
    else
    	GUI.DrawTexture(new Rect(mouse.x - (w / 2), mouse.y - (h / 2), w, h), cursor);
}