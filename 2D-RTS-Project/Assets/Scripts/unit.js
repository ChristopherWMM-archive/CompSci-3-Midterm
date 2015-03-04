
var isSelected=true;
var thisUnit : GameObject;
var tilesArray;
var tileTargetScript;
var HoverOver;
//var aniPlay = GetComponent("aniSprite");
function Start () {
var aniPlay = GetComponent("aniSprite");
isSelected=false;
thisUnit.tag="selectedUnit";
aniPlay.aniSprite(4,4,0,1,1,12,false);
}

function Update () {
	if(isSelected)
		GameObject.FindWithTag("hud").GetComponent(guiOverlay).infoScreen = true;

	var aniPlay = GetComponent("aniSprite");
 	aniPlay.aniSprite(4,4,0,2,4,8,false);
 	
 	
}

function OnMouseDown() {
	isSelected=!isSelected;
	
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
	tilesArray=GameObject.FindGameObjectsWithTag("test1");
	
	for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		  tileTargetScript=(tilesArray[zi].GetComponent("tile"));
	      
	     
	      tileTargetScript.setSend(false);
	      
	     }

}