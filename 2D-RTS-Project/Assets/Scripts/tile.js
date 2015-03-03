

var team1Mat: Material;

var whichTeam: int;
var thisTile: GameObject;

// Team 1=1
// Team 2=-1;
function Start () {
whichTeam=1;
}

function Update () {
if(whichTeam==1)
	thisTile.renderer.material.color=Color.blue;
	
if(whichTeam==-1)
		thisTile.renderer.material.color=Color.red;

}


function OnMouseDown()
{
	whichTeam*=-1;
	
}