
var isSelected=true;
var thisUnit : GameObject;

var tilesArray;
var tileTargetScript;
var HoverOver;
var overrideInfo;
var morale: float;
var UnitsStored : int;
var UnitColor : int;
var addUnits;
var unitLevel;
var inYield=false;
var maxMorale;
var thisSel;

//var aniPlay = GetComponent("aniSprite");
function Start () {
var aniPlay = GetComponent("aniSprite");
isSelected=false;
thisUnit.tag="selectedUnit";
unitLevel = 1;
morale=10.0;
maxMorale=10*unitLevel;
UnitsStored=1000;


addUnits = 100;
//allocateUnits();
//Change color with turn
}

function Update () {
	var aniPlay = GetComponent("aniSprite");
	aniPlay.aniSprite(4,4,0,0,4,8,false);
		maxMorale=10*unitLevel;
     if(!inYield && morale<maxMorale) 
		{
			 addTroops(); 	
			 
		}
	if(isSelected && overrideInfo)
	{ 
		
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).unitScreenActive = true;
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).infoScreenActive = false;
		
		overrideInfo = false;
		
	}
	var UnitArray = GameObject.FindGameObjectsWithTag("selectedUnit");
	
	if(thisSel) {
	for( zi=0;zi<UnitArray.length;zi++)
		{
		 	//targetUnit=UnitArray[zi];
		  targetUnitScript=(UnitArray[zi].GetComponent("unit"));
		   
	      if(targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==1 && targetUnitScript.UnitColor == -1))
	      {	
	      		
	      		 
	      		 
	   
		      
		     
		      
		      
		      if((targetUnitScript.UnitColor == -1) && (UnitColor==1)) 
	      		{
	      		
	      		  print("if statement reached");
	      		var battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		
	      		
	      	
	      		battleMethod.whichTurn*=-1;
	      		battleMethod.wipeUnitSelections();
	      		isSel=false;
	      			battleMethod.battle(UnitArray[zi],thisUnit,false);
	      		
	      		}
		      //sendUnit=false;
	      	
	      	//targetUnitScript.setSelected(false);
	      }
	      
	      
	      
	      
	        if(targetUnitScript.getSelected() && (GameObject.FindWithTag("Master").GetComponent(gameMaster).whichTurn==-1 && targetUnitScript.UnitColor == 1))
	      {	
	      		
	      		 
	      		 
	   
		      
		     
		      
		      
		      if((targetUnitScript.UnitColor == 1) && (UnitColor==-1)) 
	      		{
	      		
	      		  print("if statement reached");
	      		 battleMethod=GameObject.FindWithTag("Master").GetComponent(gameMaster);
	      		
	      		
	      		isSel=false;
	      		battleMethod.whichTurn*=-1;
	      		battleMethod.wipeUnitSelections();
	      		battleMethod.battle(thisUnit,UnitArray[zi],false);
	      		
	      		}
		      //sendUnit=false;
	      	
	      	//targetUnitScript.setSelected(false);
	      }
	      
	      
	      
	      }
	      }
	
	if(isSelected){
		var screenPos = Camera.main.ScreenToWorldPoint (Vector3 (Input.mousePosition.x , Input.mousePosition.y , 0));
			if(screenPos.x > transform.position.x){
				aniPlay.aniSprite(4,4,0,2,4,8,false);
			}
			else if(screenPos.x < transform.position.x){
				aniPlay.aniSprite(4,4,0,1,4,8,false);
			}
			
		}
		
		
	
	
		
 	//aniPlay.aniSprite(4,4,0,2,4,8,false);
 	//aniPlay.aniSprite(8,1,0,0,8,8,false);
 	 
 	
}

function OnMouseDown() {
wipeUnitSelections();
	isSelected=!isSelected;
	wipeSelections();
	
	thisSel=true;
	overrideInfo = true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).currentUnit(this.gameObject);
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).newUnit = true;
}
function OnMouseEnter() 
{
	
	
}
function getSelected() {

	return(isSelected);
}

function setSelected(isSel: boolean)
{
 	isSelected=isSel;
 	
} 

function wipeSelections()
{
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2")
		+GameObject.FindGameObjectsWithTag("test2")+GameObject.FindGameObjectsWithTag("test4");
	
	for(var zi=0;zi<tilesArray.length;zi++)
	{
	 
	  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
      
     
      tileTargetScript.setSend(false);
      
     }

}
function getUnitsStored(){
	return UnitsStored;
}
function getMorale(){
	return morale;
}
function setMorale(mor: float) {
	morale=mor;
}
function getUnitColor(){
	return UnitColor;
}
function getUnitLevel(){
	return unitLevel;
}

function upgradeUnit() {
	unitLevel+=1;
}
function addTroops() {
inYield=true;
yield WaitForSeconds(1);
 morale+=2;
 inYield=false;
}
function allocateUnits() {
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");

	for(var zi=0;zi<unitsArray.length;zi++)
	{
	  var unitTargetScript=(unitsArray[zi].GetComponent("unit"));
	  var rand = Random.Range(0,4);
	  if(rand < 1)
      	unitTargetScript.UnitColor = -1;
      else if(rand >= 1 && rand < 2)
      	unitTargetScript.UnitColor = 0;
      else if(rand >= 2 && rand < 3)
      	unitTargetScript.UnitColor = 1;
      else if(rand >= 3 && rand < 4)
      	unitTargetScript.UnitColor = 2;
    }
}

function wipeUnitSelections()
{
	UnitArray=GameObject.FindGameObjectsWithTag("selectedUnit");
	
	for(var zi=0;zi<UnitArray.length;zi++)
	{
	 
	  unitTargetScript=(UnitArray[zi].GetComponent("unit"));
      
     
      unitTargetScript.isSelected=false;
      
     }

}
