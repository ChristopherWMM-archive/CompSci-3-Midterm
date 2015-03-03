

var team1Mat: Material;
var mapType: Material;
var whichTeam: int;
var thisTile: GameObject;
//We'll think of some fancy way to ID teams, 
// Team 1=1
// Team 2=-1;
var isSelected: boolean;

var FortLevel: int;
var UnitsStored :int;
var morale: int;
function Start () {
//All this will be pulled from a database later on. 
 whichTeam=1;
 FortLevel=1;
 UnitsStored=1000;
 morale=10.0;
 maxUnits=1000*FortLevel;
 isSelected=false;
}

function Update () {
// Lol I'll look at the project I have that we made for this feature...later
// if(Time.timeSinceLevelLoad % 60==59)
 // addTroops();
  
	if(isSelected)
	{
	
		if(Input.GetKeyDown(KeyCode.F))
		{
		   morale=morale-0.5;
		   UnitsStored=UnitsStored-50;
		
		}
	
	}
	
	if(whichTeam==1)
	 {
		thisTile.renderer.material.color=Color.blue;
		thisTile.tag="test1";
		
		
	 }
	
	if(whichTeam==-1) 
	{
			thisTile.renderer.material.color=Color.red;
			thisTile.tag="test2";
		 	
	}
	
	 	
}

function addTroops() {
yield WaitForSeconds(5);
 UnitsStored+=10;
}

function OnMouseDown()
{
	whichTeam*=-1;
	//No If tests in this function
	
	
}
function OnMouseEnter()
{

isSelected=true;
}
function OnMouseExit()
{

isSelected=false;

}

