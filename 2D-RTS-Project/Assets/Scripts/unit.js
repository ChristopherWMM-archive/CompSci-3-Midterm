
var isSelected=true;
var thisUnit : GameObject;
var tilesArray;
var tileTargetScript;
var HoverOver;
function Start () {
isSelected=false;
thisUnit.tag="selectedUnit";

}

function Update () {


 	
 	
 	
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
	
	for(  var zi=0;zi<tilesArray.length;zi++)
		{
		 
		  tileTargetScript=(tilesArray[zi].GetComponent("tile"));
		   
	      
	     
	      tileTargetScript.setSend(false);
	      
	     }

}