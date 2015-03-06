#pragma strict
var panSpeed : float = 0.2;
var zoomSpeed : float = 0.2;
function Start () {
}
function Update () {

	if(Input.GetAxis("Mouse ScrollWheel") < 0 && Camera.main.orthographicSize<=10){
     Camera.main.orthographicSize+=zoomSpeed;
 	}
 	else if(Input.GetAxis("Mouse ScrollWheel") > 0 && Camera.main.orthographicSize>=4){
     Camera.main.orthographicSize-=zoomSpeed;
 	}
 	
 	if(Input.GetKey(KeyCode.A)){
 		Camera.main.transform.Translate(-panSpeed,0,0);
 	}
 	if(Input.GetKey(KeyCode.D)){
 		Camera.main.transform.Translate(panSpeed,0,0);
 	}
 	if(Input.GetKey(KeyCode.W)){
 		Camera.main.transform.Translate(0,panSpeed,0);
 	}
 	if(Input.GetKey(KeyCode.S)){
 		Camera.main.transform.Translate(0,-panSpeed,0);
 	}
}