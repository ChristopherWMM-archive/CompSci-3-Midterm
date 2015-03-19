


var AudioViolate: AudioClip;
var Regular: AudioClip;
var playV: boolean;
function Start () {

}

function Update () {
if(playV)
{

audio.clip=AudioViolate;
audio.Play();

}
}