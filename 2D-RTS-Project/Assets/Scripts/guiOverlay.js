#pragma strict
var infoScreenActive:boolean;
var newPiece:boolean;
var infoPos:Vector2;
var tile:GameObject;
var FortLevel;
var morale;
var UnitsStored;

function Start () {
	infoScreenActive = false;
}

function Update () {
if(infoScreenActive || newPiece)
	infoPopUp();
}
function OnGUI() {
	if(infoScreenActive)
	{
		GUI.BeginGroup(Rect(Screen.width-150,0,150,Screen.height*2));
		GUI.Box(Rect(0,0,150,240),"Info");
		GUI.Label(Rect(10,50,150,30),"Fort Level = "+FortLevel);
		GUI.Label(Rect(10,100,150,30),"Morale = "+morale);
		GUI.Label(Rect(10,150,150,30),"Units Stored = "+UnitsStored);
		if(GUI.Button(Rect(10,200,80,30),"Close"))
		{
			infoScreenActive = false;
		}
		GUI.EndGroup();
	}
}
function infoPopUp() {
	if(newPiece)
	{
		FortLevel = tile.GetComponent(tileScript).getFortLevel();
		morale = tile.GetComponent(tileScript).getMorale();
		UnitsStored = tile.GetComponent(tileScript).getUnitsStored();
	}
	newPiece = false;
	//infoPos.x = Input.mousePosition.x;
	//infoPos.y = Input.mousePosition.y;
}
function currentTile(tileObj:GameObject) {
	tile = tileObj;
}