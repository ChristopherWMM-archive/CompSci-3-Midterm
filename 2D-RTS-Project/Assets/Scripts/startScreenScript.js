
var whichMenu;
var titleWidth;
var titleHeight;
private var Team1:String;
private var Team2:String;
private var lastWin:String;

var style:GUIStyle;
var buttonStyle:GUIStyle;

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
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*3,titleWidth/2,titleHeight/5),"Instructions",buttonStyle))
		whichMenu = 3;
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*4,titleWidth/2,titleHeight/5),"Exit",buttonStyle))
		Application.Quit();
	GUI.EndGroup();
}
//options Menu GUI, when whichMenu = 2
else if(whichMenu == 2)
{
	GUI.BeginGroup(Rect((Screen.width/8)*3,Screen.height/4,titleWidth,titleHeight));
	GUI.Box(Rect(0,(titleHeight/5)*0,titleWidth,titleHeight),"Menu",style);
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
	GUI.Box(Rect(0,(titleHeight/5)*0,titleWidth,titleHeight),"Menu",style);
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*1,titleWidth/2,titleHeight/5)," ",buttonStyle))
		Application.LoadLevel("titleScreen");
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*2,titleWidth/2,titleHeight/5)," ",buttonStyle))
		 whichMenu = 2;
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*3,titleWidth/2,titleHeight/5)," ",buttonStyle))
		whichMenu = 3;
	if(GUI.Button(Rect(titleWidth/4,(titleHeight/5)*4,titleWidth/2,titleHeight/5),"Back",buttonStyle))
		whichMenu = 1;
	GUI.EndGroup();
}
}