#pragma strict
var infoScreenActive:boolean;
var newPiece:boolean;
var infoPos:Vector2;
var tile:GameObject;
var FortLevel;
var morale;
var UnitsStored;
var maxUnits;
var redTiles;
var blueTiles;
var tileColor:boolean;

function Start () {
	infoScreenActive = false;
	infoPopUp();
	newPiece = true;
}

function Update () {
if(infoScreenActive || newPiece)
	infoPopUp();
}
function OnGUI() {
	if(infoScreenActive)
	{
		GUI.BeginGroup(Rect(Screen.width-150,0,150,Screen.height*2));
		if(tileColor)
		{
			GUI.Box(Rect(0,0,150,240),"Blue Team Tile");
			GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles);
		}
		else
		{
			GUI.Box(Rect(0,0,150,240),"Red Team Tile");
			GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles);
		}
		GUI.Label(Rect(65,25,150,30),"Info");
		GUI.Label(Rect(10,80,150,30),"Fort Level = "+FortLevel);
		GUI.Label(Rect(10,110,150,30),"Morale = "+morale);
		GUI.Label(Rect(10,140,150,30),"Units Stored = "+UnitsStored);
		GUI.Label(Rect(10,170,150,30),"Max Units = "+maxUnits);
		
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
		maxUnits = tile.GetComponent(tileScript).getMaxUnits();
		redTiles = tile.GetComponent(tileScript).getRedTiles();
		blueTiles = tile.GetComponent(tileScript).getBlueTiles();
		tileColor = tile.GetComponent(tileScript).getTileColor();
	}
	newPiece = false;
	//infoPos.x = Input.mousePosition.x;
	//infoPos.y = Input.mousePosition.y;
}
function updateTilesTaken(){
	redTiles = tile.GetComponent(tileScript).getRedTiles();
	blueTiles = tile.GetComponent(tileScript).getBlueTiles();
}
function closeInfo(){
	infoScreenActive = false;
}
function currentTile(tileObj:GameObject) {
	tile = tileObj;
}