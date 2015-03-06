
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
function Start () {
//All this will be pulled from a database later on. 
 whichTeam=1;
 FortLevel=1;
 UnitsStored=1000;
 //morale=10.0;
 //Morale is defunct for now
 maxUnits=1000*FortLevel;
 isSelected=false;
 inYield=false;
 sendUnit=false;
 oneTime = false;
// redTiles = 0;
// blueTiles = 0;
}

function Update () {
// Lol I'll look at the project I have that we made for this feature...later
// if(Time.timeSinceLevelLoad % 60==59)

UnitArray = GameObject.FindGameObjectsWithTag("selectedUnit");
 
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
			whichTeam=-whichTeam;
			GameObject.FindWithTag("hud").GetComponent(guiOverlay).updateTilesTaken();
		}
		for( zi=0;zi<UnitArray.length;zi++)
		{
		 	targetUnit=UnitArray[zi];
		  targetUnitScript=(UnitArray[zi].GetComponent("unit"));
		   
	      if(sendUnit && targetUnitScript.getSelected())
	      {
		      targetUnit.transform.position= Vector3(thisTile.transform.position.x,targetUnit.transform.position.y,thisTile.transform.position.z);
		      sendUnit=false;
	      	
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

function setSend(isSel: boolean)
{
 	sendUnit=isSel;
} 
function getFortLevel(){
	return FortLevel;
}
function getUnitsStored(){
	return UnitsStored;
}
function getMorale(){
	return morale;
}
function getMaxUnits(){
	return maxUnits;
}

function getTileColor(){
	return tileColor;
}