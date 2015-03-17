
var whichMenu;
var titleWidth;
var titleHeight;
private var Team1:String;
private var Team2:String;
private var lastWin:String;

var style:GUIStyle;
var buttonStyle:GUIStyle;
var inSetStyle:GUIStyle;

function Start () {
	whichMenu = 1;
	Team1 = "Blue Team";
	Team2 = "Red Team";
	if(PlayerPrefs.GetString("LastWin") != null)
		lastWin = PlayerPrefs.GetString("LastWin");
}

function Update () {
	titleWidth = Screen.width/4;
	titleHeight = Screen.height/2;
}
function OnGUI() {

//title Screen GUI, when whichMenu = 1
if(whichMenu == 1)
{
	GUI.BeginGroup(Rect((Screen.width/8)*3,Screen.height/4,titleWidth,titleHeight));
	GUI.Box(Rect(0,(titleHeight/5)*0,titleWidth,titleHeight),"Menu",style);
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*1,titleWidth/2,titleHeight/5),"Start Game",buttonStyle))
	{
		PlayerPrefs.SetString("Team1",Team1);
		PlayerPrefs.SetString("Team2",Team2);
		Application.LoadLevel("Main");
	}
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*2,titleWidth/2,titleHeight/5),"Options",buttonStyle))
		 whichMenu = 2;
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*3,titleWidth/2,titleHeight/5),"Help",buttonStyle))
		whichMenu = 3;
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*4,titleWidth/2,titleHeight/5),"Exit",buttonStyle))
		Application.Quit();
	GUI.EndGroup();
}
//options Menu GUI, when whichMenu = 2
else if(whichMenu == 2)
{
	GUI.BeginGroup(Rect((Screen.width/8)*3,Screen.height/4,titleWidth,titleHeight));
	GUI.Box(Rect(0,(titleHeight/5)*0,titleWidth,titleHeight),"Options",style);
	Team1 = GUI.TextField(Rect(titleWidth/4,(titleHeight/5)*1,titleWidth/2,titleHeight/7),Team1,10,buttonStyle);
	Team2 = GUI.TextField(Rect(titleWidth/4,(titleHeight/5)*2,titleWidth/2,titleHeight/7),Team2,10,buttonStyle);
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*4,titleWidth/2,titleHeight/5),"Back",buttonStyle))
		whichMenu = 1;
	GUI.EndGroup();
}
//instructions Menu GUI, when whichMenu = 3
else if(whichMenu == 3)
{
	GUI.BeginGroup(Rect((Screen.width/8)*3,Screen.height/4,titleWidth,titleHeight));
	GUI.Box(Rect(0,(titleHeight/6)*0,titleWidth,titleHeight+200),"Help",style);
		GUI.Label(Rect(0,(titleHeight/6)*.5,titleWidth,titleHeight/2),
		"WASD or the Arrow Keys to pan the camera \n Scroll Wheel or the + or - Keys to Zoom in or Out \n Left Click to Select \n On the Info Screens click Close close the window but stay selected \n   and click deselect to empty your selection of that unit."
		);
		GUI.Label(Rect(0,(titleHeight/6)*1.5,titleWidth,titleHeight/2),
		"Your Goal is to conquer all of map or eliminate all the other players. \n You do this by adding units to your respective tiles and attacking adjacent tiles to make them your own. \n -and sometimes violating the Geneva Conventions"
		);
		GUI.Label(Rect(0,(titleHeight/6)*2.5,titleWidth,titleHeight/2),
		"Battles are like this: You roll a range that is your current morale-3, \n to your current morale+3, then multiplied by your (currentUnits/1000).\n The defender rolls the same way, the winner loses small amounts of troops and gains small morale, \n while the loser loses morale and troops. The larger the differences the greatreer the effects"
		);
		GUI.Label(Rect(0,(titleHeight/6)*4,titleWidth,titleHeight/2),
		"Desert has a negative bonus to tax. \n Grass has a bonus to tax. \n Stone has a bonus to morale. \n Snow has a negative bonus to morale. \n As a last note, if your HUD disappears simply click on a Tile or Unit. \n Still a work in progress remember :)"
		);
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/6)*5.5,titleWidth/2,titleHeight/5),"Back",buttonStyle))
		whichMenu = 1;
		
	GUI.EndGroup();
}
}