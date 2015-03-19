
var grass: Material;
var desert: Material;
var stone: Material;
var snow: Material;
var radioActive : Material;
var border: Material;
var tileType: int;
var moraleBoost:int;
var economicBoost:int;

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
var defenseless:int;
var isNuked :boolean;
var baseTax: float;
//var blueTiles:int;
//var numTiles;
var tileColor:int;
var provinceID:int;

var FortLevel: int;
var UnitsStored :int;
var morale: int;
var maxUnits: int;
var sendUnit: boolean;
var UnitArray;
var addUnits;
var spawnUnit: boolean;
var murderCitizens=false;

var isSurrendered:boolean;
function Start () {
//All this will be pulled from a database later on. 
 thisTile.tag = "test0";
 FortLevel=1;
 UnitsStored=1000;
 morale=10.0;
 isNuked=false;
 //Morale is defunct for now
 maxUnits=1000*FortLevel;
 isSelected=false;
 inYield=false;
 sendUnit=false;
 oneTime = false;
 addUnits = 100;
 spawnUnit=false;
 baseTax=4.0;
 moraleBoost = 2;
 economicBoost = 2;
// redTiles = 0;
// blueTiles = 0;


//	  var rand = Random.Range(0,4);
//	  if(rand < 1)
//      	tileType = 1;
//      else if(rand >= 1 && rand < 2)
//      	tileType = 2;
//      else if(rand >= 2 && rand < 3)
//      	tileType = 3;
//      else if(rand >= 3 && rand < 4)
//      	tileType = 4;
      	 var temp = renderer.materials;
      	 temp[0]=border;
      	if(tileType==1)
      	{
      	
      	temp[1]=grass;
      	baseTax=4.0+economicBoost;
      	
      	}
      		else if(tileType==2)
      	{
      	
      	temp[1]=stone;
      	morale=10+moraleBoost;
      	
      	}
      		else if(tileType==3)
      	{
      	
      	temp[1]=desert;
      	baseTax=4.0-economicBoost;
      	}
      		else if(tileType==4)
      	{
      	
      temp[1]=snow;
      	morale=10-moraleBoost;
      	}
      	
      	renderer.materials=temp;
      	
}

function Update () {

	if(isSurrendered)
	{
		wipeSelections();
		sendUnit=false;
		spawnUnit=false;
		murderCitizens=false;
	}



// Lol I'll look at the project I have that we made for this feature...later
// if(Time.timeSinceLevelLoad % 60==59)
var temp2 = renderer.materials;
      	 
 var guiP=GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating;
 var bankR=GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank;
 var bankB=GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank;
 if(guiP && murderCitizens && !isSurrendered)
 {
	 if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1 && bankB>49) {
	 isNuked=true;
	 GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating = false;
	 murderCitizens=false;
	GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank-=50;
	 }
	 
	 
	 if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1 && bankR>49) {
	 isNuked=true;
	 GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating=false;
	 murderCitizens=false;
	 GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank-=50;
	 }
 
 }
 else if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1 && bankB<50 && !isSurrendered)
	 {
	 
	 GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating=false;
	 murderCitizens=false;
	 }
	 
	 else if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1 && bankR<50)
	 {
	 
	 GameObject.FindWithTag("hud").GetComponent(guiOverlay).isViolating=false;
	 murderCitizens=false;
	 }
 
 if(isNuked)
 {
 baseTax=0;
 maxUnits=0;
 UnitsStored=0;
 morale=0;
 temp2[1].mainTexture=radioActive.mainTexture;
 thisTile.renderer.material.color=Color.black;
 tileType=235;
 whichTeam=69;
 GameObject.FindWithTag("MainCamera").GetComponent(audioSwitch).playV=true;
 }
 
	UnitArray = GameObject.FindGameObjectsWithTag("selectedUnit");
	if(tileColor != 2)
 		maxUnits=1000*FortLevel;
	if(!inYield && UnitsStored<maxUnits) 
		{
			 addTroops(); 	 
	}
	if(isSelected && !isSurrendered)
	{
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).currentTile(this.gameObject);
		
		for( zi=0;zi<UnitArray.length;zi++)
		{
		 	targetUnit=UnitArray[zi];
		  targetUnitScript=(UnitArray[zi].GetComponent("unit"));
		   
	      if(!isNuked && sendUnit && targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1 && targetUnitScript.UnitColor == 1) && !isSurrendered)
	      {	
	      		
	      		 print(" 1 if statement reached");
	      		 
	      if(((thisTile.transform.position.x-targetUnit.transform.position.x)<3 && (thisTile.transform.position.x-targetUnit.transform.position.x)>-3) && (thisTile.transform.position.z-targetUnit.transform.position.z)<3 && (thisTile.transform.position.z-targetUnit.transform.position.z)>-3 )
	      {
	      		  if((targetUnitScript.UnitColor == 1) && !(whichTeam==1) && !isSurrendered) 
	      		{
	      		
	      		  print("if statement reached");
	      		var battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		targetUnitScript.setSelected(false);
	      		battleMethod.calculateFinances();
	      		battleMethod.calculateFinances();
	      		battleMethod.battle(UnitArray[zi],thisTile,true);
	      		battleMethod.wipeUnitSelections3();
	      		battleMethod.whichTurn*=-1;
	      		
	      		
	      		
	      		}
	      		else if(!isSurrendered){
		      		targetUnit.transform.position= Vector3(thisTile.transform.position.x,targetUnit.transform.position.y,thisTile.transform.position.z);
					
		   			}
		      }
		      
		     
		      
		      
		    
		      //sendUnit=false;
	      	
	      	//targetUnitScript.setSelected(false);
	      }
	      
	       if(!isNuked && sendUnit && targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1 && targetUnitScript.UnitColor==-1) && !isSurrendered)
	      {
	       print(" 1 if statement reached");
	      		 
	      if(((thisTile.transform.position.x-targetUnit.transform.position.x)<3 && (thisTile.transform.position.x-targetUnit.transform.position.x)>-3) && (thisTile.transform.position.z-targetUnit.transform.position.z)<3 && (thisTile.transform.position.z-targetUnit.transform.position.z)>-3 ) 
	      		{
	      		if(((targetUnitScript.UnitColor == -1) && !(whichTeam==-1)) && !isSurrendered)
	      		{
	      		
	      		  print("if statement reached");
	      		 battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		 targetUnitScript.setSelected(false);
	      		battleMethod.battle(UnitArray[zi],thisTile,true);
	      		
	      		
	      		battleMethod.calculateFinances();
	      		battleMethod.calculateFinances();
	      		battleMethod.battle(UnitArray[zi],thisTile,true);
	      		battleMethod.wipeUnitSelections3();
	      		battleMethod.whichTurn*=-1;
	      		
	      		
	      		}
	      		else if(!isSurrendered){
		      		targetUnit.transform.position= Vector3(thisTile.transform.position.x,targetUnit.transform.position.y,thisTile.transform.position.z);
		      		
		      		}
		      		
		      		
		      }
		      
		     
		      
		      
		      
		      //sendUnit=false;
	      	
	      	//targetUnitScript.setSelected(false);
	      
	      
	      }
	     
	      
	      
	      }
	     }
	     
	
	//else
	//	GameObject.FindWithTag("hud").GetComponent(guiOverlay).closeInfo();
		
	if(whichTeam==1)
	 {
		thisTile.renderer.material.color=Color.blue;
		thisTile.tag="test1";
		tileColor = 1;
	 }
	
	if(whichTeam==-1) 
	{
		thisTile.renderer.material.color=Color.red;
		thisTile.tag="test2";
		tileColor = -1;
	}
	if(whichTeam == 0)
	{
		thisTile.renderer.material.color=Color.yellow;
		thisTile.tag="test3";
		tileColor = 0;
	}
	if(whichTeam == 2)
	{
		thisTile.renderer.material.color=Color.grey;
		thisTile.tag="test4";
		
		UnitsStored = 0;
		
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
	wipeSelections();
	sendUnit=true;
	spawnUnit=true;
	murderCitizens=true;
	
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
	if(tileColor != 2)
		maxUnits = 1000 * FortLevel;
	return maxUnits;
}

function getTileColor(){
	return tileColor;
}
function upgradeFort() {
if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1)
{
 if(GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank>(20*(FortLevel+1)))
 	{
 	FortLevel+=1;
 	GameObject.FindWithTag("Master").GetComponent(gameMaster).blueBank-=(FortLevel*20);
 	}
}

if(GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1)
{
 if(GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank>(20*(FortLevel+1)))
 	{
 	FortLevel+=1;
 	GameObject.FindWithTag("Master").GetComponent(gameMaster).redBank-=(FortLevel*20);
 	}
}
	
}
function addUnitsGUI() {
	UnitsStored += addUnits;
}

function wipeSelections()
{
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
		+GameObject.FindGameObjectsWithTag("test3")+GameObject.FindGameObjectsWithTag("test4");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      tileTargetScript.spawnUnit=false;
      tileTargetScript.murderCitizens=false;
      
     }

}
function setIsSurrendered(isSurr:boolean){
	isSurrendered = isSurr;

}