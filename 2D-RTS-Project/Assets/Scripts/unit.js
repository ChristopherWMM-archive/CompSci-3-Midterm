
var isSelected=true;
var thisUnit : GameObject;
var tilesArray;
var tileTargetScript;
var HoverOver;
var overrideInfo;
var morale: float;
var UnitsStored : int;
var UnitColor : boolean;

//var aniPlay = GetComponent("aniSprite");
function Start () {
var aniPlay = GetComponent("aniSprite");
isSelected=false;
thisUnit.tag="selectedUnit";
aniPlay.aniSprite(4,4,0,1,1,12,false);
morale=10.0;
UnitsStored=1000;
UnitColor=true;
//Change color with turn
}

function Update () {


	if(isSelected && overrideInfo)
	{
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).unitScreenActive = true;
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).infoScreenActive = false;
		overrideInfo = false;
	}
	

	var aniPlay = GetComponent("aniSprite");
 	aniPlay.aniSprite(4,4,0,2,4,8,false);
 	
 	
}

function OnMouseDown() {
	isSelected=!isSelected;
	overrideInfo = true;
	GameObject.FindWithTag("hud").GetComponent(guiOverlay).newPiece = true;
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
function getUnitColor(){
	return UnitColor;
}