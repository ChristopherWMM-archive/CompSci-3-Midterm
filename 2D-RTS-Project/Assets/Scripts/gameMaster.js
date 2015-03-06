
var whichTurn:int;

function Start () {
	whichTurn = 1;
	
	
}

function Update () {

}
function battle (attk: GameObject, def: GameObject,defIsTile: boolean)
{

print("function Called");
var attkScript;
var DefScript;
attkScript=	attk.GetComponent(unit);
if(defIsTile)
		DefScript=def.GetComponent(tileScript);
else 
	DefScript=def.GetComponent("unit");
	
var noVictory=true;
while(noVictory)
{
	//Add tile effects here
	var roll = Random.Range(1,7);
	
	if(roll<4.0)
		attkScript.morale-= 1;
		
		
	else
		DefScript.morale-= 1;
if(DefScript.morale<=0)
	{
	
	DefScript.whichTeam*=-1;
	noVictory=false;
	break;
	}
if(attkScript.morale<=0)
	{
	
	attkScript.UnitsStored-=500;
	noVictory=false;
	break;
	
	}


  
  	

}

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