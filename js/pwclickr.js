x=document.getElementsByClassName("flip-container");
z=document.getElementsByClassName("flipper");
for(i=0;i<x.length;i++) {
x[i].addEventListener("click", y);
}
function y() {
	this.childNodes[1].classList.toggle("clickr");
	};