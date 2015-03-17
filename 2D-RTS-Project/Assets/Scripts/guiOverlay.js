
var infoScreenActive:boolean;
var newPiece:boolean;
var newUnit: boolean;
var infoPos:Vector2;
var isViolating:boolean;

//help feature variables.. heh.. there's a lot :P
private var helpScreen:boolean;
private var FortLevelHelp:boolean;
private var moraleHelp:boolean;
private var UnitsStoredHelp:boolean;
private var maxUnitsHelp:boolean;
private var unitLevelHelp:boolean;
private var gameFeedHelp:boolean;
private var addUnitHelp:boolean;
private var upgradeUnitHelp:boolean;
private var violateHelp:boolean;
private var surrenderHelp:boolean;
private var ducatsHelp:boolean;
private var totalTroopsHelp:boolean;
private var totalTilesHelp:boolean;
private var infoScreenHelp:boolean;
private var unitScreenHelp:boolean;
private var closeHelp:boolean;
private var deselectHelp:boolean;
private var endTurnHelp:boolean;
private var tileHelp:boolean;
private var infoHelp:boolean;
private var unitHelp:boolean;
private var helpActive:boolean;
private var upgradeFortHelp:boolean;
private var countryScreenHelp:boolean;
private var countryTotalTroopsHelp:boolean;
private var countryTotalTilesHelp:boolean;

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
//var buttonStyleNOHOVER : GUIStyle;

function Start () {
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
//	buttonStyleNOHOVER.normal.background = BbuttonStyle;

	}
	if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1)
	{
	style.normal.background=RStyle;
	buttonStyle.hover.background=Rhover;
	buttonStyle.normal.background=RbuttonStyle;
	inSetStyle.normal.background=RinsetStyle;
//	buttonStyleNOHOVER.normal.background = RbuttonStyle;

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OnGUI() {
	//Tile Info Display
	if(infoScreenActive || (helpScreen && infoScreenHelp))
	{
			GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.10,HUDheight+105));
			if(helpScreen)
			{
				GUI.Box(Rect(3,(HUDheight/8)*0,(HUDwidth/8)*2.068,HUDheight+105),"Info",style);
					
				if(GUI.Button(Rect(25,(HUDheight/8)*1,(HUDwidth/8)*1.5,30),"Info Screen",buttonStyle)){
					newHelp();
					helpActive = true;
					infoHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*2,(HUDwidth/8)*1.5,30),"Tile",buttonStyle)){
					newHelp();
					helpActive = true;
					tileHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*3,(HUDwidth/8)*1.5,30),"Fort Level",buttonStyle)){
					newHelp();
					helpActive = true;
					FortLevelHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*4,(HUDwidth/8)*1.5,30),"Morale",buttonStyle)){
					newHelp();
					helpActive = true;
					moraleHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*5,(HUDwidth/8)*1.5,30),"Units Stored",buttonStyle)){
					newHelp();
					helpActive = true;
					UnitsStoredHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*6,(HUDwidth/8)*1.5,30),"Max Units",buttonStyle)){
					newHelp();
					helpActive = true;
					maxUnitsHelp = true;
				}if(GUI.Button(Rect(35,(HUDheight/8)*7,((HUDwidth/8)*2.15)/2,25),"Close",buttonStyle)){
					newHelp();
					helpActive = true;
					closeHelp = true;
				}if(GUI.Button(Rect(35,(HUDheight/8)*8,((HUDwidth/8)*2.15)/2,25),"Deselect",buttonStyle)){
					newHelp();
					helpActive = true;
					deselectHelp = true;
				}if(GUI.Button(Rect(25,(HUDheight/8)*9,(HUDwidth/8)*1.5,30),"Switch Screen",buttonStyle))
				{
					infoScreenHelp = false;
					unitScreenHelp = true;
				}
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//unit info display
	else if(unitScreenActive  || (helpScreen && unitScreenHelp))
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+65));
		if(helpScreen)
		{
			GUI.Box(Rect(0,(HUDheight/7)*0,(HUDwidth/8)*2.15,HUDheight+65),"Unit",style);
			
			if(GUI.Button(Rect(25,(HUDheight/7)*1,(HUDwidth/8)*1.5,30),"Unit Screen",buttonStyle)){
				newHelp();
				helpActive = true;
				unitHelp = true;
			}if(GUI.Button(Rect(25,(HUDheight/7)*2,(HUDwidth/8)*1.5,30),"Unit Level",buttonStyle)){
				newHelp();
				helpActive = true;
				unitLevelHelp = true;
			}if(GUI.Button(Rect(25,(HUDheight/7)*3,(HUDwidth/8)*1.5,30),"Morale",buttonStyle)){
				newHelp();
				helpActive = true;
				moraleHelp = true;
			}if(GUI.Button(Rect(25,(HUDheight/7)*4,(HUDwidth/8)*1.5,30),"Number of Units",buttonStyle)){
				newHelp();
				helpActive = true;
				UnitsStoredHelp = true;
			}if(GUI.Button(Rect(35,(HUDheight/7)*5,((HUDwidth/8)*2.12)/2,25),"Close",buttonStyle)){
				newHelp();
				helpActive = true;
				closeHelp = true;
			}if(GUI.Button(Rect(35,(HUDheight/7)*6,((HUDwidth/8)*2.12)/2,25),"Deselect",buttonStyle)){
				newHelp();
				helpActive = true;
				deselectHelp = true;
			}if(GUI.Button(Rect(25,(HUDheight/7)*7,(HUDwidth/8)*1.5,30),"Switch Screen",buttonStyle))
			{
				unitScreenHelp = false;
				infoScreenHelp = true;
			}
		}
		else
		{
			if(unitVar.GetComponent(unit).getUnitColor() == 1)
			{
				GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),Team1 + " Unit",style);
			//	GUI.Label(Rect(10,50,150,30),"Tiles Taken = "+blueTiles,style);
			}
			else if(unitVar.GetComponent(unit).getUnitColor() == -1)
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
		}
		GUI.EndGroup();
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Unit and Info Help Screens
	if(helpScreen && (!infoScreenHelp && !unitScreenHelp))
	{
		GUI.BeginGroup(Rect(HUDwidth+((Screen.width/9)*1.48),0,(HUDwidth/8)*2.15,HUDheight+5));
		GUI.Box(Rect(0,(HUDheight/6)*0,(HUDwidth/8)*2.15,HUDheight+5),"",style);
		if(GUI.Button(Rect(25,(HUDheight/7)*3,(HUDwidth/8)*1.5,30),"Info Screen Help",buttonStyle))
		{
			infoScreenHelp = true;
		}
		if(GUI.Button(Rect(25,(HUDheight/7)*4,(HUDwidth/8)*1.5,30),"Unit Screen Help",buttonStyle))
		{
			unitScreenHelp = true;
		}
		GUI.EndGroup();
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//End Turn and Help Button
	GUI.BeginGroup(Rect(Screen.width-115,Screen.height-30,115,50));
	if(GUI.Button(Rect(0,0,30,30),"",buttonStyle))
	{
		helpScreen = true;	
		helpActive = false;
		infoScreenHelp = false;
		unitScreenHelp = false;
	}
	GUI.Label(Rect(13,5,5,5),"?",style);
	
	if(GUI.Button(Rect(35,0,80,30),"End Turn",buttonStyle))
	{
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			endTurnHelp = true;
		}
		else
		{
			GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn *= -1;
			GameObject.FindWithTag("Master").GetComponent(gameMaster).wipeSelections();
			GameObject.FindWithTag("Master").GetComponent(gameMaster).wipeUnitSelections3();
			var battleMethod = GameObject.FindWithTag("Master").GetComponent(gameMaster);
			battleMethod.calculateFinances();
			battleMethod.calculateFinances();
			if(whichTurn == 1)
				newFeedItem(Team2+"'s Turn!");
			else if(whichTurn == -1)
				newFeedItem(Team1+"'s Turn!");
		}
	}
	GUI.EndGroup();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Top HUD Items
	GUI.BeginGroup(Rect((HUDwidth/8)*2,0,HUDwidth,35));
	GUI.Box(Rect(0,0,HUDwidth,35),"",inSetStyle);
	if(GUI.Button(Rect((HUDwidth/5)*0,5,HUDwidth/5,25),"Add Units",buttonStyle))
	{
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			addUnitHelp = true;
		}
		else if((whichTurn == tileColor) && !helpScreen)
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
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			upgradeUnitHelp = true;
		}
		else if((whichTurn == unitColor) && !helpScreen)
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
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			upgradeFortHelp = true;
		}
		else if((whichTurn == tileColor) && !helpScreen)
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
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			violateHelp = true;
		}
		else
		{
			newHelp();
			isViolating = true;
			GameObject.FindWithTag("Master").GetComponent("gameMaster").wipeSelections2();
		}
		
	}
		
	if(GUI.Button(Rect((HUDwidth/5)*4,5,HUDwidth/5,25),"Surrender",buttonStyle))
	{
		if(helpScreen)
		{
			newHelp();
			helpActive = true;
			surrenderHelp = true;
		}
		else
		{
			gameOver = true;	
			if(whichTurn == 1)
				newFeedItem(Team2+" surrendered! " + Team1 + " Wins!");
			else if(whichTurn == -1)
				newFeedItem(Team1+" surrendered! " + Team2 + " Wins!");
		}
	}
	GUI.EndGroup();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Country Display
	var vec2: Vector2;
	var bankInfo;
	GUI.BeginGroup(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5));
	if(helpScreen)
	{
		GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),"Country Name",style);
		if(GUI.Button(Rect(20,(HUDheight/8)*1,HUDwidth/8*1.5,30),"Country Screen",buttonStyle)){
			newHelp();
			helpActive = true;
			countryScreenHelp = true;
		}if(GUI.Button(Rect(20,(HUDheight/8)*3,HUDwidth/8*1.5,30),"Ducats",buttonStyle)){
			newHelp();
			helpActive = true;
			ducatsHelp = true;
		}if(GUI.Button(Rect(20,(HUDheight/8)*4,HUDwidth/8*1.5,30),"Total Troops",buttonStyle)){
			newHelp();
			helpActive = true;
			countryTotalTroopsHelp = true;
		}if(GUI.Button(Rect(20,(HUDheight/8)*5,HUDwidth/8*1.5,30),"Total Tiles",buttonStyle)){
			newHelp();
			helpActive = true;
			countryTotalTilesHelp = true;
		}
	}
	else
	{
		if(whichTurn==-1) {
			vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayRedInfo();
			bankInfo=GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank;
			}
		else{
			vec2=GameObject.FindWithTag("Master").GetComponent(gameMaster).displayBlueInfo();
			bankInfo=GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank;
			}
		
		
		if(whichTurn == 1) 
			GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team1,style);
			
		else
			GUI.Box(Rect(0,(HUDheight/8)*0,(HUDwidth/8)*2,HUDheight+5),Team2,style);
			
		GUI.Label(Rect(20,(HUDheight/8)*3,HUDwidth/8*1.5,30),"Ducats: "+ bankInfo,inSetStyle);
		GUI.Label(Rect(20,(HUDheight/8)*4,HUDwidth/8*1.5,30),"Total Troops = "+ vec2.x,inSetStyle);
		GUI.Label(Rect(20,(HUDheight/8)*5,HUDwidth/8*1.5,30),"Total Tiles = "+ vec2.y,inSetStyle);
	}
	//flag
	GUI.EndGroup();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Game Feed
	GUI.BeginGroup(Rect(0,(HUDheight/8)*9.5,(HUDwidth/8)*3.25,HUDheight));
	//GUI.Box(Rect(0,0,(HUDwidth/8)*4,(HUDheight/2)),"",buttonStyle);
	if(helpScreen)
	{
		if(GUI.Button(Rect(0,5,(HUDwidth/10)*4,(HUDheight/2)),"Game Feed",buttonStyle))
		{
			helpActive = true;
			gameFeedHelp = true;
		}
	}
	else
	{
		GUI.Label(Rect(0,5,(HUDwidth/10)*4,(HUDheight/2)),"Game Feed",buttonStyle);
		var zy = 1;
		for(var zj=gameFeed.length-1;zj>=0;zj--)
		{
			var feed = gameFeed[zj];
			var spacing = ((((HUDheight/8)*3)/9)*(zy))+10;
			GUI.Label(Rect((HUDwidth/8)*0.2,spacing,(HUDwidth/8)*2.75,10),feed,inSetStyle);
			zy++;
		}
	}
	GUI.EndGroup();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Initial Help Screen
	if(helpScreen && !helpActive)
	{
		GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
		GUI.Box(Rect(Screen.width/3,(Screen.height/3),(Screen.width/8)*3,100),"",style);
		GUI.Label(Rect((Screen.width/3)*1.2,(Screen.height/3)*1.05,(Screen.width/8)*2,20),"Select the item you would like to learn more about",style);
		if(GUI.Button(Rect((Screen.width/3)*1.37,(Screen.height/3)*1.25,(Screen.width/8)*1,30),"Go Back",buttonStyle))
		{
			helpScreen = false;
		}
		GUI.EndGroup();
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Game Over Menu
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//Help Screens
	if(helpScreen && helpActive)
	{
		GUI.BeginGroup(Rect(0,0,Screen.width,Screen.height));
		GUI.Box(Rect((Screen.width/3)*1,(Screen.height/3)*.95,(Screen.width/8)*2.5,Screen.height/3),"",style);
		if(helpScreen && FortLevelHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"The level of your fort determines the \n max amount of troops you can hold and your \n morale"
			,style);
		}
		else if(helpScreen && moraleHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"The effectiveness of your unit  in battle"
			,style);
		}
		else if(helpScreen && UnitsStoredHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"The amount of troops currently stored in \n a unit or tile"
			,style);
		}
		else if(helpScreen && maxUnitsHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"The total amount of units you can \n currently hold in a unit or tile"
			,style);
		}
		else if(helpScreen && unitLevelHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"Your unit level determines the amount of units stored or morale"
			,style);
		}
		else if(helpScreen && gameFeedHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"An active list of currently occuring events"
			,style);
		}
		else if(helpScreen && addUnitHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"If you have 10 ducats you can click on a \n tile you control followed by the button"
			,style);
		}
		else if(helpScreen && upgradeUnitHelp)
		{
		//
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"If you have 20 ducats multiplied by the \n next level of your unit you can upgrade it for \n that cost"
			,style);
		}
		else if(helpScreen && violateHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This allows you to obliterate a tile. \n It costs 50 ducats, you click on the button, then \n on the tile. You may violate yourself :)"
			,style);
		}
		else if(helpScreen && surrenderHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"If you feel like you're really bad \n you can jsut give up :)"
			,style);
		}
		else if(helpScreen && ducatsHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"You gain 10% of the base tax of the \n tiles you own, your costs are your unit and fort levels \n divided by 50. Both occur twice a turn."
			,style);
		}
		else if(helpScreen && infoScreenHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This info screen is used to conveniently \n display useful information about the currently \n selected tile"
			,style);
		}
		else if(helpScreen && unitScreenHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This unit screen is used to conveniently \n display useful information about the currently \n selected unit"
			,style);
		}
		else if(helpScreen && closeHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This button closes the info screen \n but leaves the tile or unit still selected"
			,style);
		}
		else if(helpScreen && deselectHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This button closes the info screen \n and deselects the unit or tile in addition"
			,style);
		}
		else if(helpScreen && endTurnHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This button is used to manually conclude \n your turn, if you attack a unit or a tile it \n will be done so automatically. However you may \n freely move your units as much as you please \n before attacking without ending your turn!"
			,style);
		}
		else if(helpScreen && tileHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"A tile is piece of the map, you use it \n to store troops, gain money, and essentially \n conquer the map"
			,style);
		}
		else if(helpScreen && infoHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This info screen is used to conveniently \n display useful information about the currently \n selected tile"
			,style);
		}
		else if(helpScreen && unitHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"This unit screen is used to conveniently \n display useful information about the currently \n selected unit"
			,style);
		}
		else if(helpScreen && upgradeFortHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"If you have 20 ducats multiplied by the \n next level of your fort you can upgrade it for \n that cost. Just click on the fort \n followed by the button."
			,style);
		}
		else if(helpScreen && countryScreenHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"Displays useful info about your country"
			,style);
		}
		else if(helpScreen && countryTotalTroopsHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"Total amount of troops your country owns"
			,style);
		}
		else if(helpScreen && countryTotalTilesHelp)
		{
			GUI.Label(Rect((Screen.width/3)*1,(Screen.height/3)*1.1,(Screen.width/8)*2.5,40),
			"The amount of tiles your country owns"
			,style);
		}
		if(GUI.Button(Rect((Screen.width/3)*1.3,(Screen.height/3)*1.5,(Screen.width/8)*1,20),"Go Back",buttonStyle))
		{
			helpScreen = false;
		}
	GUI.EndGroup();
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
function newHelp(){
	FortLevelHelp = false;
	moraleHelp = false;
	UnitsStoredHelp = false;
	maxUnitsHelp = false;
	unitLevelHelp = false;
	gameFeedHelp = false;
	addUnitHelp = false;
	upgradeUnitHelp = false;
	violateHelp = false;
	surrenderHelp = false;
	ducatsHelp = false;
	totalTroopsHelp = false;
	totalTilesHelp = false;
	closeHelp = false;
	deselectHelp = false;
	endTurnHelp = false;
	tileHelp = false;
	infoHelp = false;
	unitHelp = false;
	upgradeFortHelp = false;
	countryScreenHelp = false;
	countryTotalTroopsHelp = false;
	countryTotalTilesHelp = false;
}