
var isSelected=true;
var thisUnit : GameObject;
var tilesArray;
var tileTargetScript;
var HoverOver;
var overrideInfo;
var morale: float;
var UnitsStored : int;
var UnitColor : boolean;
var addUnits;
var unitLevel;

//var aniPlay = GetComponent("aniSprite");
function Start () {
var aniPlay = GetComponent("aniSprite");
isSelected=false;
thisUnit.tag="selectedUnit";

morale=10.0;
UnitsStored=1000;
UnitColor=true;
unitLevel = 1;
addUnits = 100;
//Change color with turn
}

function Update () {
	var aniPlay = GetComponent("aniSprite");
	aniPlay.aniSprite(4,4,0,0,4,8,false);

	if(isSelected && overrideInfo)
	{ 
		
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).unitScreenActive = true;
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).infoScreenActive = false;
		
		overrideInfo = false;
		
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
	isSelected=!isSelected;
	overrideInfo = true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).currentUnit(this.gameObject);
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).newUnit = true;
}
function OnMouseEnter() 
{
	wipeSelections();
	
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
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	
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
function addUnitsGUI() {
	UnitsStored += addUnits;
}
function upgradeUnit() {
	unitLevel+=1;
}
