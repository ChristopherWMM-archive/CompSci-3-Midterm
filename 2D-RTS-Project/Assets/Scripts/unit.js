#pragma strict
var isSelected=true;
var thisUnit : GameObject;
function Start () {
isSelected=false;
thisUnit.tag="selectedUnit";
}

function Update () {

 
 	
 	
 	
}

function OnMouseDown() {
isSelected=!isSelected;

}

function getSelected() {

return(isSelected);
}
function setSelected(isSel: boolean)
{

 isSelected=isSel;
} 