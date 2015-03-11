
var team1Mat: Material;
var mapType: Material;
var whichTeam: int;
var thisTile: GameObject;
var inYield : boolean;
var targetUnit: GameObject;
var targetUnitScript;
//We'll think of some fancy way to ID teams, 
// Team 1=1
// Team 2=-1;
var isSelected: boolean;
var oneTime:boolean;
var redTiles:int;

var baseTax: float;
//var blueTiles:int;
//var numTiles;
var tileColor:boolean;
var provinceID:int;

var FortLevel: int;
var UnitsStored :int;
var morale: int;
var maxUnits: int;
var sendUnit: boolean;
var UnitArray;
var addUnits;
var spawnUnit: boolean;

function Start () {
//All this will be pulled from a database later on. 
 thisTile.tag = "test0";
 FortLevel=1;
 UnitsStored=1000;
 morale=10.0;
 //Morale is defunct for now
 maxUnits=1000*FortLevel;
 isSelected=false;
 inYield=false;
 sendUnit=false;
 oneTime = false;
 addUnits = 100;
 spawnUnit=false;
 baseTax=4.0;
 allocateTiles();
// redTiles = 0;
// blueTiles = 0;
}

function Update () {
	
// Lol I'll look at the project I have that we made for this feature...later
// if(Time.timeSinceLevelLoad % 60==59)

	UnitArray = GameObject.FindGameObjectsWithTag("selectedUnit");
 	maxUnits=1000*FortLevel;
	if(!inYield && UnitsStored<maxUnits) 
		{
			 addTroops(); 	 
	}
	if(isSelected)
	{
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).currentTile(this.gameObject);
		if(Input.GetKeyDown(KeyCode.F))
		{
		  // morale=morale-0.5;
		  //Morale is defunct for now
		   UnitsStored=UnitsStored-50;
		
		}
		if(Input.GetKeyDown(KeyCode.G))
		{
			if(whichTeam == 1)
				whichTeam = 2;
			if(whichTeam == 2)
				whichTeam = 1;
			
			//GameObject.FindWithTag("hud").GetComponent(guiOverlay).updateTilesTaken();
		}
		for( zi=0;zi<UnitArray.length;zi++)
		{
		 	targetUnit=UnitArray[zi];
		  targetUnitScript=(UnitArray[zi].GetComponent("unit"));
		   
	      if(sendUnit && targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1 && targetUnitScript.UnitColor == 1))
	      {	
	      		
	      		 print(" 1 if statement reached");
	      		 
	      if(((thisTile.transform.position.x-targetUnit.transform.position.x)<3 && (thisTile.transform.position.x-targetUnit.transform.position.x)>-3) && (thisTile.transform.position.z-targetUnit.transform.position.z)<3 && (thisTile.transform.position.z-targetUnit.transform.position.z)>-3 && (whichTeam==1) )
	      {
	      		
	      		
	      		
		      targetUnit.transform.position= Vector3(thisTile.transform.position.x,targetUnit.transform.position.y,thisTile.transform.position.z);
		      }
		      
		     
		      
		      
		      if((targetUnitScript.UnitColor == 1) && !(whichTeam==1)) 
	      		{
	      		
	      		  print("if statement reached");
	      		var battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		targetUnitScript.setSelected(false);
	      		battleMethod.battle(UnitArray[zi],thisTile,true);
	      		
	      		
	      		}
		      //sendUnit=false;
	      	
	      	targetUnitScript.setSelected(false);
	      }
	      
	       if(sendUnit && targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1 && targetUnitScript.UnitColor==-1))
	      {
	       print(" 1 if statement reached");
	      		 
	      if(((thisTile.transform.position.x-targetUnit.transform.position.x)<3 && (thisTile.transform.position.x-targetUnit.transform.position.x)>-3) && (thisTile.transform.position.z-targetUnit.transform.position.z)<3 && (thisTile.transform.position.z-targetUnit.transform.position.z)>-3 && (whichTeam==-1) ) 
	      		{
	      		
		      		targetUnit.transform.position= Vector3(thisTile.transform.position.x,targetUnit.transform.position.y,thisTile.transform.position.z);
		      }
		      
		     
		      
		      
		      if(((targetUnitScript.UnitColor == -1) && !(whichTeam==-1)) )
	      		{
	      		
	      		  print("if statement reached");
	      		 battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		 targetUnitScript.setSelected(false);
	      		battleMethod.battle(UnitArray[zi],thisTile,true);
	      		
	      		}
		      //sendUnit=false;
	      	
	      	targetUnitScript.setSelected(false);
	      
	      
	      }
	     
	      
	      
	      }
	     }
	     
	
	//else
	//	GameObject.FindWithTag("hud").GetComponent(guiOverlay).closeInfo();
		
	if(whichTeam==1)
	 {
		thisTile.renderer.material.color=Color.blue;
		thisTile.tag="test1";
		tileColor = true;
	 }
	
	if(whichTeam==-1) 
	{
		thisTile.renderer.material.color=Color.red;
		thisTile.tag="test2";
		tileColor = false;
	}
	if(whichTeam == 0)
	{
		thisTile.renderer.material.color=Color.yellow;
		thisTile.tag="test3";
		tileColor = false;
	}
	if(whichTeam == 2)
	{
		thisTile.renderer.material.color=Color.grey;
		thisTile.tag="test4";
		tileColor = false;
	}
	
}

function addTroops() {
inYield=true;
yield WaitForSeconds(3);
 UnitsStored+=10;
 inYield=false;
}

function OnMouseDown()
{
	sendUnit=true;
	spawnUnit=true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).newPiece = true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).infoScreenActive = true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).unitScreenActive = false;
	//No "If" tests in this function
	
}
function OnMouseEnter()
{
	isSelected=true;
}
function OnMouseExit()
{
	isSelected=false;
}

function setSend(isSel: boolean) {
 	sendUnit=isSel;
} 
function getFortLevel() {
	return FortLevel;
}
function getUnitsStored() {
	return UnitsStored;
}
function getMorale() {
	return morale;
}
function getMaxUnits() {
	maxUnits = 1000 * FortLevel;
	return maxUnits;
}

function getTileColor(){
	return tileColor;
}
function upgradeFort() {
	FortLevel+=1;
}
function addUnitsGUI() {
	UnitsStored += addUnits;
}
function allocateTiles() {
	tilesArray=GameObject.FindGameObjectsWithTag("test0");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	  var rand = Random.Range(0,4);
	  if(rand < 1)
      	tileTargetScript.whichTeam = -1;
      else if(rand >= 1 && rand < 2)
      	tileTargetScript.whichTeam = 0;
      else if(rand >= 2 && rand < 3)
      	tileTargetScript.whichTeam = 1;
      else if(rand >= 3 && rand < 4)
      	tileTargetScript.whichTeam = 2;
    }
}