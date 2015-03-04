#pragma strict
var infoScreenActive:boolean;
var infoScreen:boolean;
var infoPos:Vector2;
var tile:GameObject;

function Start () {
	infoScreen = false;
}

function Update () {
	if(infoScreen)
		infoPopUp();
}
function OnGUI() {
	if(infoScreenActive)
	{
		GUI.BeginGroup(Rect(Screen.width-100,0,100,Screen.height*2));
		GUI.Box(Rect(0,0,100,175),"Info");
		if(GUI.Button(Rect(10,80,80,30),"Close"))
		{
			infoScreenActive = false;
		}
		GUI.Box(Rect(0,0,100,175),"Fort Level");
		GUI.Box(Rect(0,0,100,175),"Morale");
		GUI.Box(Rect(0,0,100,175),"Units Stored");
		GUI.EndGroup();
	}
}
function infoPopUp() {
	infoScreen = false;
	infoScreenActive = true;
	//infoPos.x = Input.mousePosition.x;
	//infoPos.y = Input.mousePosition.y;
}
function currentTile(tileObj:GameObject) {
	tile = tileObj;
}