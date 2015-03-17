#pragma strict
var panSpeed : float = 1;
var zoomSpeed : float = 1;
function Start () {
}
function Update () {

	if(((Input.GetAxis("Mouse ScrollWheel") < 0) || Input.GetKey(KeyCode.Minus)) && Camera.main.orthographicSize<=30){
     Camera.main.orthographicSize+=zoomSpeed;
 	}
 	else if((Input.GetAxis("Mouse ScrollWheel") > 0  || Input.GetKey(KeyCode.Equals))&& Camera.main.orthographicSize>=4){
     Camera.main.orthographicSize-=zoomSpeed;
 	}
 	
 	if(Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)){
 		Camera.main.transform.Translate(-panSpeed,0,0);
 	}
 	if(Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)){
 		Camera.main.transform.Translate(panSpeed,0,0);
 	}
 	if(Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.UpArrow)){
 		Camera.main.transform.Translate(0,panSpeed,0);
 	}
 	if(Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.DownArrow)){
 		Camera.main.transform.Translate(0,-panSpeed,0);
 	}
}