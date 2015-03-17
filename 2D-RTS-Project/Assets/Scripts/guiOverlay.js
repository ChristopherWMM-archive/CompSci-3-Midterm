
var infoScreenActive:boolean;
var newPiece:boolean;
var newUnit: boolean;
var infoPos:Vector2;
var isViolating:boolean;

var helpScreen:boolean;
var FortLevelHelp:boolean;
var moraleHelp:boolean;
var UnitsStoredHelp:boolean;
var maxUnitsHelp:boolean;
var unitLevelHelp:boolean;
var gameFeedHelp:boolean;
var addUnitHelp:boolean;
var upgradeUnitHelp:boolean;
var violateHelp:boolean;
var surrenderHelp:boolean;
var ducatsHelp:boolean;
var totalTroopsHelp:boolean;
var totalTilesHelp:boolean;
var infoScreenHelp:boolean;
var unitScreenHelp:boolean;
var closeHelp:boolean;
var deselectHelp:boolean;
var endTurnHelp:boolean;
var tileHelp:boolean;
var infoHelp:boolean;

var FortLevel;
var morale;
var UnitsStored;
var maxUnits;

var moraleUnit: float;
var UnitsStoredInUnit : int;

var tile:GameObject;
var unitVar:GameObject;
var lastTile:GameObject;
var tileColor:int;
var unitColor: int;
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
var Ghandi:String;
var openTile;
var lastWin:String;

var gameFeed = Array();
var mostRecentFeed:String;

var BStyle :Texture2D;
var BbuttonStyle :Texture2D;
var BinsetStyle :Texture2D;
var Bhover :Texture2D;
var Rhover :Texture2D;

var RStyle :Texture2D;
var RbuttonStyle :Texture2D;
var RinsetStyle :Texture2D;

var style:GUIStyle;
var buttonStyle:GUIStyle;
var inSetStyle : GUIStyle;

function Start () {
//	gameFeed.length = 4;
//	gameFeed[0] = "hi there";
//	gameFeed[1] = "i am";
//	gameFeed[2] = "aisgoh";
//	gameFeed[3] = "fgnmdf";

	infoScreenActive = false;
	infoPopUp();
	newPiece = true;
	newUnit=true;
	unitVar=null;
	Team1 = PlayerPrefs.GetString("Team1");
	Team2 = PlayerPrefs.GetString("Team2");
	Ghandi = "Ghandi";
	unitLevel = 1;
	openTile = "Unclaimed";
	helpScreen = false;
}

function Update () {

	if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1)
	{
	style.normal.background=BStyle;
	buttonStyle.normal.background=BbuttonStyle;
	buttonStyle.hover.background=Bhover;
	inSetStyle.normal.background=BinsetStyle;


	}
	if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1)
	{
	style.normal.background=RStyle;
	buttonStyle.hover.background=Rhover;
	buttonStyle.normal.background=RbuttonStyle;
	inSetStyle.normal.background=RinsetStyle;


	}

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
	if(infoScreenActive || (helpScreen && infoScreenHelp))
	{
	///////////////////// where i left off
			GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.10,HUDheight+55));
			if(helpScreen)
			{
				if(GUI.Button(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),"InfoScreen",buttonStyle))
					infoHelp = true;
				if(GUI.Button(Rect(3,(HUDheight/8)*1,(HUDwidth/8)*2.068,HUDheight+5),"Tile",buttonStyle))
					tileHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*2,(HUDwidth/8)*1.5,30),"Info",buttonStyle))
					infoHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*3,(HUDwidth/8)*1.5,30),"Fort Level = "+FortLevel,buttonStyle))
					FortLevelHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*4,(HUDwidth/8)*1.5,30),"Morale = "+morale,buttonStyle))
					moraleHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*5,(HUDwidth/8)*1.5,30),"Units Stored = "+UnitsStored,buttonStyle))
					UnitsStoredHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*6,(HUDwidth/8)*1.5,30),"Max Units = "+maxUnits,buttonStyle))
					maxUnitsHelp = true;
				if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.15)/2,25),"Close",buttonStyle))
					closeHelp = true;
				if(GUI.Button(Rect(35,(HUDheight/8)*8,((HUDwidth/8)*2.15)/2,25),"Deselect",buttonStyle))
					deselectHelp = true;
				if(GUI.Button(Rect(25,(HUDheight/8)*6,(HUDwidth/8)*1.5,30),"Switch Screen"+maxUnits,buttonStyle))
					maxUnitsHelp = true;
			}
			else
			{
				if(tileColor==1)
				{
					GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),Team1 + " Tile",style);
				//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
				}
				if(tileColor==-1)
				{
					GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),Team2 + " Tile",style);
				//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+redTiles,style);
				}
				if(tileColor==0)
				{
					GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),Ghandi + " Tile",style);
				//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
				}
				if(tileColor==2)
				{
					GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+5),openTile + " Tile",style);
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
			}
		
		GUI.EndGroup();
	}
	//unit info display
	if(unitScreenActive && !helpScreen)
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		if(unitVar.GetComponent(unit).getUnitColor() == 2)
		{
			GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),Team1 + " Unit",style);
		//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
		}
		else if(unitVar.GetComponent(unit).getUnitColor() == 1)
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
	//Unit and Info Help Screens
	if(helpScreen)
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),"",style);
		if(GUI.Button(Rect(25,(HUDheight/7)*3,(HUDwidth/8)*1.5,30),"Info Screen Help",buttonStyle))
		{
			//Info Screen Help Info
				GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
				GUI.Box(Rect(Screen.width/3,(Screen.height/3),(Screen.width/8)*3,Screen.height/2),"",style);
				GUI.Label(Rect(Screen.width/3,(Screen.height/3)*1.05,(Screen.width/8)*3,20),"Select the item you would like to learn more about",style);
				if(GUI.Button(Rect((Screen.width/3)*1.37,(Screen.height/3)*1.25,(Screen.width/8)*1,30),"Go Back",buttonStyle))
				{
					helpScreen = false;
				}
				GUI.EndGroup();
		}
		if(GUI.Button(Rect(25,(HUDheight/7)*4,(HUDwidth/8)*1.5,30),"Unit Screen Help",buttonStyle))
		{
		}
		GUI.EndGroup();
	}
	//End Turn and Help Button
	GUI.BeginGroup(Rect(Screen.width-115,Screen.height-30,115,50));
	if(GUI.Button(Rect(0,0,30,30),"",buttonStyle))
		helpScreen = true;
		
	GUI.Label(Rect(13,5,5,5),"?",style);
	if(GUI.Button(Rect(35,0,80,30),"End Turn",buttonStyle))
	{
		GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn *= -1;
		GameObject.FindWithTag("Master").GetComponent(gameMaster).wipeSelections();
		var battleMethod = GameObject.FindWithTag("Master").GetComponent(gameMaster);
		battleMethod.calculateFinances();
		battleMethod.calculateFinances();
		if(whichTurn == 1)
			newFeedItem(Team2+"'s Turn!");
		else if(whichTurn == -1)
			newFeedItem(Team1+"'s Turn!");
	}
	GUI.EndGroup();
	//Top HUD Items
	GUI.BeginGroup(Rect((HUDwidth/8)*2,0,HUDwidth,35));
	GUI.Box(Rect(0,0,HUDwidth,35),"",inSetStyle);
	if(GUI.Button(Rect((HUDwidth/5)*0,5,HUDwidth/5,25),"Add Units",buttonStyle))
	{
		if(whichTurn == tileColor)
		{
			if(infoScreenActive)
			{
				var tilesArrayZ=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
					+GameObject.FindGameObjectsWithTag("test3")+GameObject.FindGameObjectsWithTag("test4");
				var tileTarg;
			
				for(var zt=0;zt<tilesArrayZ.length;zt++)
				{
				 
				   var tileTargetScriptZ=(tilesArrayZ[zt].GetComponent("tileScript"));
			       if(tileTargetScriptZ.spawnUnit) 
			       {
			     		tileTarg=tilesArrayZ[zt];
			      		tileTargetScriptZ.spawnUnit=false;
			      	}
			     }
			
			
				var unitScript=GameObject.FindWithTag("Master").GetComponent("gameMaster");
				 
					
				if(unitScript.whichTurn==1 && unitScript.blueBank>9) 
				{
					unitScript.blueBank-=10;
					unitScript.addUnitsGUI(tileTarg);
					newFeedItem(Team1+ " added a unit!");
					//tileTargetScriptZ.spawnUnit=false;
					
				}
				else if(unitScript.whichTurn==-1 && unitScript.redBank>9)
				{
					unitScript.redBank-=10;
					unitScript.addUnitsGUI(tileTarg);
					newFeedItem(Team2+ " added a unit!");
					//tileTargetScriptZ.spawnUnit=false;
				}
			}
		}
				
	}
	if(GUI.Button(Rect((HUDwidth/5)*1,5,HUDwidth/5,25),"Upgrade Unit",buttonStyle))
	{
		if(whichTurn == unitColor)
		{
			if(unitVar != null)
			{
			 	unitVar.GetComponent("unit").upgradeUnit();
				unitLevel = unitVar.GetComponent(unit).getUnitLevel();
				if(whichTurn == 1)
					newFeedItem(Team1+" unit upgraded to lvl " + unitLevel + "!");
				else if(whichTurn == -1)
					newFeedItem(Team2+" unit upgraded to lvl " + unitLevel + "!");
			}
		}
	}
	if(GUI.Button(Rect((HUDwidth/5)*2,5,HUDwidth/5,25),"Upgrade Fort",buttonStyle))
	{
		if(whichTurn == tileColor)
		{
			if(infoScreenActive)
			{
				lastTile.GetComponent(tileScript).upgradeFort();
				FortLevel = lastTile.GetComponent(tileScript).getFortLevel();
				maxUnits = lastTile.GetComponent(tileScript).getMaxUnits();
				if(whichTurn == 1)
					newFeedItem(Team1+" fort upgraded to lvl " + FortLevel + "!");
				else if(whichTurn == -1)
					newFeedItem(Team2+" fort upgraded to lvl " + FortLevel + "!");
			}
		}
		
	}
	if(GUI.Button(Rect((HUDwidth/5)*3,5,HUDwidth/5,25),"Violate",buttonStyle))
	{
		isViolating = true;
		GameObject.FindWithTag("Master").GetComponent("gameMaster").wipeSelections2();
		
	}
		
	if(GUI.Button(Rect((HUDwidth/5)*4,5,HUDwidth/5,25),"Surrender",buttonStyle))
	{
		gameOver = true;	
		if(whichTurn == 1)
			newFeedItem(Team2+" surrendered! " + Team1 + " Wins!");
		else if(whichTurn == -1)
			newFeedItem(Team1+" surrendered! " + Team2 + " Wins!");
	}
	GUI.EndGroup();
	//Country Display
	var vec2: Vector2;
	var bankInfo;
	
	if(whichTurn==-1) {
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayRedInfo();
		bankInfo=GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank;
		}
	else{
		vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayBlueInfo();
		bankInfo=GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank;
		}
	GUI.BeginGroup(Rect(0,0,(HUDwidth/8)*2,HUDheight+5));
	
	if(whichTurn == 1) 
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team1,style);
		
	else
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team2,style);
		
	GUI.Label(Rect(20,(HUDheight/8)*3,HUDwidth/8*1.5,30),"Ducats: "+ bankInfo,inSetStyle);
	GUI.Label(Rect(20,(HUDheight/8)*4,HUDwidth/8*1.5,30),"Total Troops = "+ vec2.x,inSetStyle);
	GUI.Label(Rect(20,(HUDheight/8)*5,HUDwidth/8*1.5,30),"Total Tiles = "+ vec2.y,inSetStyle);
	//flag
	GUI.EndGroup();
	
	//Game Feed
	GUI.BeginGroup(Rect(0,(HUDheight/8)*9.5,(HUDwidth/8)*3.25,HUDheight));
	//GUI.Box(Rect(0,0,(HUDwidth/8)*4,(HUDheight/2)),"",buttonStyle);
	GUI.Label(Rect(0,5,(HUDwidth/10)*4,(HUDheight/2)),"Game Feed",buttonStyle);
	var zy = 1;
	for(var zj=gameFeed.length-1;zj>=0;zj--)
	{
		var feed = gameFeed[zj];
		var spacing = ((((HUDheight/8)*3)/9)*(zy))+10;
		GUI.Label(Rect((HUDwidth/8)*0.2,spacing,(HUDwidth/8)*2.75,10),feed,inSetStyle);
		zy++;
	}
	
	
	GUI.EndGroup();
	//Initial Help Screen
	if(helpScreen)
	{
		GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
		GUI.Box(Rect(Screen.width/3,(Screen.height/3),(Screen.width/8)*3,100),"",style);
		GUI.Label(Rect(Screen.width/3,(Screen.height/3)*1.05,(Screen.width/8)*3,20),"Select the item you would like to learn more about",style);
		if(GUI.Button(Rect((Screen.width/3)*1.37,(Screen.height/3)*1.25,(Screen.width/8)*1,30),"Go Back",buttonStyle))
		{
			helpScreen = false;
		}
		GUI.EndGroup();
	}
	if(gameOver)
	{
		GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
		if(whichTurn == 1)
			GUI.Label(Rect(Screen.width/3,(Screen.height/3),(Screen.width/8)*2,30),Team2 + "Wins",inSetStyle);
		else
			GUI.Label(Rect(Screen.width/3,(Screen.height/3),(Screen.width/8)*2,30),Team1 + " Wins",inSetStyle);
		if(GUI.Button(Rect(Screen.width/3,(Screen.height/3)*1.2,(Screen.width/8)*2,30),"Back to Menu",buttonStyle))
			Application.LoadLevel("titleScreen");
		if(GUI.Button(Rect(Screen.width/3,(Screen.height/3)*1.4,(Screen.width/8)*2,30),"Restart",buttonStyle))
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
		tileColor = tile.GetComponent(tileScript).whichTeam;
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
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
	+GameObject.FindGameObjectsWithTag("test3")+GameObject.FindGameObjectsWithTag("test4");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      
     }

}
function newFeedItem(feedItem:String){
	if(gameFeed.length<9)
	{
		gameFeed.length++;
		for(var zi=0;zi<gameFeed.length;zi++)
		{
			if(gameFeed[zi] == null)
			{
				gameFeed[zi] = feedItem;
			}
		}
		mostRecentFeed = feedItem;
	}
	else if(gameFeed.length >= 9)
	{
		for(var zj=0;zj<gameFeed.length-1;zj++)
		{
			gameFeed[zj] = gameFeed[zj+1];
		}
		gameFeed[8] = feedItem;
		mostRecentFeed = feedItem;
	}
}
