
var infoScreenActive:boolean;
var newPiece:boolean;
var newUnit: boolean;
var infoPos:Vector2;

var FortLevel;
var morale;
var UnitsStored;
var maxUnits;

var moraleUnit: float;
var UnitsStoredInUnit : int;

var tile:GameObject;
var unitVar:GameObject;
var redTiles;
var blueTiles;
var tileColor:boolean;
var unitColor: boolean;
var tilesArray;
var targetTileScript;

var unitsArray;
var unitTargetScript;

var unitScreenActive;
var HUDwidth;
var HUDheight;

var whichTurn;
function Start () {
	infoScreenActive = false;
	infoPopUp();
	newPiece = true;
	newUnit=true;
	unitVar=null;
}

function Update () {
	if(infoScreenActive || newPiece)
		infoPopUp();
	if(infoScreenActive && newUnit)
	    unitPopUp();
	    
	    unitsArray = GameObject.FindGameObjectsWithTag("selectedUnit");
	    for(zx=0;zx<unitsArray.length;zx++)
			{
				unitTargetScript=(unitsArray[zx].GetComponent("unit"));
      			if(unitTargetScript.getSelected())
      				currentUnit(unitsArray[zx]);	
			}
	   HUDwidth = (Screen.width/9)*6;
	   HUDheight = (Screen.height/5)*3;
	   whichTurn = GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn;
}
function OnGUI() {
	if(infoScreenActive)
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		if(tileColor)
		{
			GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2.15,HUDheight+5),"Blue Team Tile");
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles);
		}
		else
		{
			GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2.15,HUDheight+5),"Red Team Tile");
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles);
		}
		GUI.Label(Rect(65,(HUDheight/8)*1,(HUDwidth/8)*2.15,30),"Info");
		GUI.Label(Rect(10,(HUDheight/8)*2,(HUDwidth/8)*2.15,30),"Fort Level = "+FortLevel);
		GUI.Label(Rect(10,(HUDheight/8)*3,(HUDwidth/8)*2.15,30),"Morale = "+morale);
		GUI.Label(Rect(10,(HUDheight/8)*4,(HUDwidth/8)*2.15,30),"Units Stored = "+UnitsStored);
		GUI.Label(Rect(10,(HUDheight/8)*5,(HUDwidth/8)*2.15,30),"Max Units = "+maxUnits);
		
		if(GUI.Button(Rect(35,(HUDheight/8)*6,((HUDwidth/8)*2.15)/2,25),"Close"))
		{
			infoScreenActive = false;
			wipeTileSelections();
		}
		if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.15)/2,25),"Deselect"))
		{
			infoScreenActive = false;
			wipeTileSelections();
			var zi = 0;
			for(zi=0;zi<unitsArray.length;zi++)
			{
				unitTargetScript=(unitsArray[zi].GetComponent("unit"));
      			unitTargetScript.setSelected(false);	
			}
		}
		GUI.EndGroup();
	}
	if(unitScreenActive)
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		if(unitVar.GetComponent(unit).getUnitColor())
		{
			GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),"Blue Team Unit");
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles);
		}
		else
		{
			GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),"Red Team Unit");
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles);
		}
		GUI.Label(Rect(65,(HUDheight/8)*1,(HUDwidth/8)*2.15,30),"Info");
		GUI.Label(Rect(10,(HUDheight/6)*2,(HUDwidth/8)*2.15,30),"Morale = "+moraleUnit);
		GUI.Label(Rect(10,(HUDheight/6)*3,(HUDwidth/8)*2.15,30),"Number of Units = "+UnitsStoredInUnit);
		
		if(GUI.Button(Rect(35,(HUDheight/8)*6,((HUDwidth/8)*2.15)/2,25),"Close"))
		{
			unitScreenActive = false;
			wipeTileSelections();
		}
		if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.15)/2,25),"Deselect"))
		{
			unitScreenActive = false;
			wipeTileSelections();
			var zz = 0;
			for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			unitTargetScript.setSelected(false);	
			}
		}
		GUI.EndGroup();
	}
	//End Turn
	GUI.BeginGroup(Rect(Screen.width-80,Screen.height-30,100,50));
	if(GUI.Button(Rect(0,0,80,30),"End Turn"))
	{
		GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn *= -1;
	}
	GUI.EndGroup();
	//Top HUD Items
	GUI.BeginGroup(Rect((HUDwidth/8)*2,0,HUDwidth,35));
	GUI.Box(Rect(0,0,HUDwidth,35),"");
	if(GUI.Button(Rect((HUDwidth/5)*0,5,HUDwidth/5,25),"Add Units"))
	{
	}
	if(GUI.Button(Rect((HUDwidth/5)*1,5,HUDwidth/5,25),"Upgrade Unit"))
	{
	}
	if(GUI.Button(Rect((HUDwidth/5)*2,5,HUDwidth/5,25),"Upgrade Fort"))
	{
	}
	if(GUI.Button(Rect((HUDwidth/5)*3,5,HUDwidth/5,25),"Violate"))
	{
	}
	if(GUI.Button(Rect((HUDwidth/5)*4,5,HUDwidth/5,25),"Surrender"))
	{
	}
	GUI.EndGroup();
	//Country Display
	var vec2: Vector2;
	if(whichTurn==-1)
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayRedInfo();
	else if(whichTurn==1)
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayBlueInfo();
	GUI.BeginGroup(Rect(0,0,150,Screen.height));
	if(whichTurn == 1)
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,Screen.height-150),"Blue Team");
	else
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,Screen.height-150),"Red Team");
	GUI.Label(Rect(10,(HUDheight/8)*4,HUDwidth/8*2,30),"Total Troops = "+ vec2.x);
	GUI.Label(Rect(10,(HUDheight/8)*5,HUDwidth/8*2,30),"Total Tiles = "+ vec2.y);
	//flag
	GUI.EndGroup();
}
function infoPopUp() {
	if(newPiece)
	{
		FortLevel = tile.GetComponent(tileScript).getFortLevel();
		morale = tile.GetComponent(tileScript).getMorale();
		UnitsStored = tile.GetComponent(tileScript).getUnitsStored();
		maxUnits = tile.GetComponent(tileScript).getMaxUnits();
		//redTiles = tile.GetComponent(tileScript).getRedTiles();
		//blueTiles = tile.GetComponent(tileScript).getBlueTiles();
		tileColor = tile.GetComponent(tileScript).getTileColor();
	}
	newPiece = false;
	//infoPos.x = Input.mousePosition.x;
	//infoPos.y = Input.mousePosition.y;
}


function unitPopUp() {

if(newUnit)
{
if(unitVar!=null) {
 moraleUnit = unitVar.GetComponent(unit).getMorale();
 UnitsStoredInUnit = unitVar.GetComponent(unit).getUnitsStored();
 unitColor = unitVar.GetComponent(unit).getUnitColor();
 }

}

}
function updateTilesTaken(){
	//redTiles = tile.GetComponent(tileScript).getRedTiles();
	//blueTiles = tile.GetComponent(tileScript).getBlueTiles();
}
function closeInfo(){
	infoScreenActive = false;
}
function currentTile(tileObj:GameObject) {
	tile = tileObj;
}

function currentUnit(UnitObj:GameObject) {
	unitVar=UnitObj;
}
function wipeTileSelections()
{
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      
     }

}
