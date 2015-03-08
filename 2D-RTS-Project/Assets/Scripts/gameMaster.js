
var whichTurn:int;

function Start () {
	whichTurn = 1;
	
	
}

function Update () {

}
function battle (attk: GameObject, def: GameObject,defIsTile: boolean)
{

print("function Called");
var baseEffective=1000;
var attkScript;
var DefScript;

	

attkScript=	attk.GetComponent(unit);
if(defIsTile)
		DefScript=def.GetComponent(tileScript);
else 
	DefScript=def.GetComponent("unit");

var battleOn=true;
while(battleOn)
{
	//Defender Vars
	var defEffective=DefScript.UnitsStored/baseEffective; 
	//var defUp=DefScript.getRollUp;
	//var defDown=DefScript.getRollDown;
	var defRoll=(Random.Range(DefScript.morale-3,DefScript.morale+3)*defEffective);
	//Attacker Vars
	var attkEffective=attkScript.UnitsStored/baseEffective;
	//var attkUp=attkScript.getRollUp;
	//var attkDown=attkScript.getRollDown;
	var attkRoll=Random.Range(attkScript.morale-3,attkScript.morale+3)*attkEffective;
	
	var totalRoll=defRoll-attkRoll;
	
	
	if	(totalRoll<1 && totalRoll>-1)
	{
	DefScript.UnitsStored-=100;
	attkScript.UnitsStored-=100;
	 
	}
		if (totalRoll<2 && totalRoll>=1)
		{
		
		DefScript.morale+=0.5;
		DefScript.UnitsStored-=50;
		
		attkScript.morale-=1;
		attkScript.UnitsStored-=200;
		
		}
			if (totalRoll>-2 && totalRoll<=-1)
			{
			
			attkScript.morale+=0.5;
			attkScript.UnitsStored-=50;
			
			DefScript.morale-=1;
			DefScript.UnitsStored-=200;
			
				}
		if (totalRoll<3 && totalRoll>=2)
		{
		
		DefScript.morale+=0.75;
		DefScript.UnitsStored-=25;
		
		attkScript.morale-=2;
		attkScript.UnitsStored-=250;
		
		}
			if (totalRoll>-3 && totalRoll<=-2)
				{
				
				attkScript.morale+=0.75;
				attkScript.UnitsStored-=25;
				
				DefScript.morale-=2;
				DefScript.UnitsStored-=250;
				
				}
						
		if (totalRoll<4 && totalRoll>=3)
		{
		
		DefScript.morale+=1;
		DefScript.UnitsStored-=25;
		
		attkScript.morale-=3;
		attkScript.UnitsStored-=300;
		
		}
			if (totalRoll>-4 && totalRoll<-3)
				{
				
				attkScript.morale+=1;
				attkScript.UnitsStored-=25;
				
				DefScript.morale-=3;
				DefScript.UnitsStored-=300;
				
				}
		if (totalRoll>=4)
		{
		
		DefScript.morale+=1.5;
		DefScript.UnitsStored-=25;
		
		attkScript.morale-=4;
		attkScript.UnitsStored-=400;
		
		}
			if (totalRoll<=-4)
				{
				
				attkScript.morale+=1.5;
				attkScript.UnitsStored-=25;
				
				DefScript.morale-=4;
				DefScript.UnitsStored-=400;
				
				}
				
				
	///////////////////////////////////////////////////////////////	
		if(DefScript.morale<=0)
		{
		
			battleOn=false;
			if(defIsTile)
				DefScript.whichTeam*=-1;
			//else
				//attach retreat code here
		}
			if(DefScript.UnitsStored<=0)
				{
					battleOn=false;
					if(defIsTile) {
						DefScript.whichTeam*=-1;
						DefScript.UnitsStored=200;
						}
					else
						Destroy(def);
						
						
				}
			
		if(attkScript.morale<=0)
		{
		
			battleOn=false;
			attkScript.morale=0;
				//attach retreat code here
		}
		if(attkScript.UnitsStored<=0)
			{
				battleOn=false;
				Destroy(attk);
				
				//else
					//attach retreat code here
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