
var whichTurn:int;

function Start () {
	whichTurn = 1;
	
	
}

function Update () {

}
function battle (attk: GameObject, def: GameObject,defIsTile: boolean)
{
var attkScript;
var DefScript;
attkScript=	attk.GetComponent("unit");
if(defIsTile)
		DefScript=def.GetComponent("tileScript");
else 
	DefScript=def.GetComponent("unit");
	
//var noVictory=true;
//while(victory)
//{
	



//}

}
function displayRedInfo()
	{	
	var  numTiles :int;
var numUnits : int;
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		var  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==-1)
	      {
	      
	       numTiles++;
	      } 
	      
	    }
	    
		 
	for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			   if(unitTargetScript.UnitColor)
				      {
				      
				       numUnits++;
				      } 
			}
	      
	
	  var TilesAndUnits= new Vector2(numUnits,numTiles);
	  return(TilesAndUnits);

	}
function displayBlueInfo()
{

var  numTiles :int;
var numUnits : int;
	tilesArray=GameObject.FindGameObjectsWithTag("test1")+GameObject.FindGameObjectsWithTag("test2");
	unitsArray=GameObject.FindGameObjectsWithTag("selectedUnit");
		for(var zi=0;zi<tilesArray.length;zi++)
		{
		 
		var  tileTargetScript=(tilesArray[zi].GetComponent("tileScript"));
	      if(tileTargetScript.whichTeam==1)
	      {
	      
	       numTiles++;
	      } 
	      
	    }
	    
		 
	for(zz=0;zz<unitsArray.length;zz++)
			{
				unitTargetScript=(unitsArray[zz].GetComponent("unit"));
      			   if(unitTargetScript.UnitColor)
				      {
				      
				       numUnits++;
				      } 
			}
	      
	
	  var TilesAndUnits= new Vector2(numUnits,numTiles);
	  return(TilesAndUnits);

}