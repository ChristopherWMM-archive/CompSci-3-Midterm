
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
var lastTile:GameObject;
var tileColor:boolean;
var unitColor: boolean;
var unitLevel;
var tilesArray;
var targetTileScript;

var unitsArray;
var unitTargetScript;

var unitScreenActive;
var HUDwidth;
var HUDheight;

var whichTurn;
var gameOver;

var Team1:String;
var Team2:String;
var lastWin:String;

var style:GUIStyle;
var buttonStyle:GUIStyle;
var inSetStyle : GUIStyle;

function Start () {
	infoScreenActive = false;
	infoPopUp();
	newPiece = true;
	newUnit=true;
	unitVar=null;
	Team1 = PlayerPrefs.GetString("Team1");
	Team2 = PlayerPrefs.GetString("Team2");
	unitLevel = 1;
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
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.10,HUDheight+5));
		if(tileColor)
		{
			GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),Team1 + " Tile",style);
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
		}
		else
		{
			GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),Team2 + " Tile",style);
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles,style);
		}
		GUI.Label(Rect(25,(HUDheight/8)*1,(HUDwidth/8)*1.5,30),"Info",inSetStyle);
		GUI.Label(Rect(25,(HUDheight/8)*2,(HUDwidth/8)*1.5,30),"Fort Level = "+FortLevel,inSetStyle);
		GUI.Label(Rect(25,(HUDheight/8)*3,(HUDwidth/8)*1.5,30),"Morale = "+morale,inSetStyle);
		GUI.Label(Rect(25,(HUDheight/8)*4,(HUDwidth/8)*1.5,30),"Units Stored = "+UnitsStored,inSetStyle);
		GUI.Label(Rect(25,(HUDheight/8)*5,(HUDwidth/8)*1.5,30),"Max Units = "+maxUnits,inSetStyle);
		
		if(GUI.Button(Rect(35,(HUDheight/8)*6,((HUDwidth/8)*2.15)/2,25),"Close",buttonStyle))
		{
			infoScreenActive = false;
			wipeTileSelections();
		}
		if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.15)/2,25),"Deselect",buttonStyle))
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
	//unit info display
	if(unitScreenActive)
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		if(unitVar.GetComponent(unit).getUnitColor())
		{
			GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),Team1 + " Unit",style);
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
		}
		else
		{
			GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),Team2 + " Unit",style);
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles);
		}
		GUI.Label(Rect(25,(HUDheight/7)*1,(HUDwidth/8)*1.5,30),"Info",inSetStyle);
		GUI.Label(Rect(25,(HUDheight/7)*2,(HUDwidth/8)*1.5,30),"Level "+unitLevel+" Unit",inSetStyle);
		GUI.Label(Rect(25,(HUDheight/7)*3,(HUDwidth/8)*1.5,30),"Morale = "+moraleUnit,inSetStyle);
		GUI.Label(Rect(25,(HUDheight/7)*4,(HUDwidth/8)*1.5,30),"Number of Units = "+UnitsStoredInUnit,inSetStyle);
		
		if(GUI.Button(Rect(35,(HUDheight/8)*6,((HUDwidth/8)*2.12)/2,25),"Close",buttonStyle))
		{
			unitScreenActive = false;
			wipeTileSelections();
		}
		if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.12)/2,25),"Deselect",buttonStyle))
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
	if(GUI.Button(Rect(0,0,80,30),"End Turn",buttonStyle))
	{
		GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn *= -1;
	}
	GUI.EndGroup();
	//Top HUD Items
	GUI.BeginGroup(Rect((HUDwidth/8)*2,0,HUDwidth,35));
	GUI.Box(Rect(0,0,HUDwidth,35),"",inSetStyle);
	if(GUI.Button(Rect((HUDwidth/5)*0,5,HUDwidth/5,25),"Add Units",buttonStyle))
	{
		if(unitVar!= null)
		{
			unitVar.GetComponent("unit").addUnitsGUI();
			UnitsStored = unitVar.GetComponent(unit).getUnitsStored();
		}
	}
	if(GUI.Button(Rect((HUDwidth/5)*1,5,HUDwidth/5,25),"Upgrade Unit",buttonStyle))
	{
		if(unitVar != null)
		{
		 	unitVar.GetComponent("unit").upgradeUnit();
			unitLevel = unitVar.GetComponent(unit).getUnitLevel();
		}
	}
	if(GUI.Button(Rect((HUDwidth/5)*2,5,HUDwidth/5,25),"Upgrade Fort",buttonStyle))
	{
		if(infoScreenActive)
		{
			lastTile.GetComponent(tileScript).upgradeFort();
			FortLevel = lastTile.GetComponent(tileScript).getFortLevel();
		}
		
	}
	if(GUI.Button(Rect((HUDwidth/5)*3,5,HUDwidth/5,25),"Violate",buttonStyle))
	{
	}
	if(GUI.Button(Rect((HUDwidth/5)*4,5,HUDwidth/5,25),"Surrender",buttonStyle))
	{
		gameOver = true;	
	}
	GUI.EndGroup();
	//Country Display
	var vec2: Vector2;
	if(whichTurn==-1)
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayRedInfo();
	else if(whichTurn==1)
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayBlueInfo();
	GUI.BeginGroup(Rect(0,0,(HUDwidth/8)*2,HUDheight+5));
	if(whichTurn == 1)
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team1,style);
	else
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team2,style);
	GUI.Label(Rect(20,(HUDheight/8)*4,HUDwidth/8*1.5,30),"Total Troops = "+ vec2.x,inSetStyle);
	GUI.Label(Rect(20,(HUDheight/8)*5,HUDwidth/8*1.5,30),"Total Tiles = "+ vec2.y,inSetStyle);
	//flag
	GUI.EndGroup();
	if(gameOver)
	{
		GUI.BeginGroup(Rect(0,0,Screen.Width,Screen.height));
		if(whichTurn == 1)
			GUI.Label(Rect(Screen.width/3,0,(Screen.width/8)*2,30),Team2 + "Wins",style);
		else
			GUI.Label(Rect(Screen.width/3,0,(Screen.width/8)*2,30),Team1 + "Wins",style);
		if(GUI.Button(Rect(Screen.width/3,(Screen.height/3)*1.5,HUDwidth,30),"Back to Menu",buttonStyle))
			Application.LoadLevel("titleScreen");
		if(GUI.Button(Rect((Screen.width/5)*1.85,(Screen.height/3)*1.25,HUDwidth,30),"Restart",buttonStyle))
			Application.LoadLevel("Main");
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
		tileColor = tile.GetComponent(tileScript).getTileColor();
		lastTile = tile;
	}
	newPiece = false;
}


function unitPopUp() {

if(newUnit)
{
	if(unitVar!=null) {
		 moraleUnit = unitVar.GetComponent(unit).getMorale();
		 UnitsStoredInUnit = unitVar.GetComponent(unit).getUnitsStored();
		 unitColor = unitVar.GetComponent(unit).getUnitColor();
		 unitLevel = unitVar.GetComponent(unit).getUnitLevel();
 }
 newUnit = false;

}

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
