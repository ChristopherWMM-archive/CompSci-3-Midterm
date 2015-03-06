#pragma strict
function Start () {
}
function Update () {

	if(Input.GetAxis("Mouse ScrollWheel") < 0 && Camera.main.orthographicSize<=10)
 	{
     Camera.main.orthographicSize+=0.2;
 	}
 	else if(Input.GetAxis("Mouse ScrollWheel") > 0 && Camera.main.orthographicSize>=4)
 	{
     Camera.main.orthographicSize-=0.2;
 	}
}