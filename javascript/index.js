function addEvent(element,type,method) {
	// body...
	if (element.addEventListener) {
		element.addEventListener(type,method,false);
	}else{
		element["on" + type] = method;
	}
}
function removeEvent(element,type,method) {
	// body...
	if (element.removeEventListener) {
		element.removeEventListener(type,method,false);
	}else{
		element["on" + type] = null;
	}
}
function elementLeft(element) {
	// body...
	var left = element.offsetLeft;
	var newElement = element.offsetParent;

	while(newElement != null){
		left += newElement.offsetLeft;
		newElement = newElement.offsetParent;
	}
	return left;
}
function selectedArrowNodes(element,arrow) {
	// body...
	var arrowElements = [];
	if (arrow == 1) {
		var arrowElement = element.previousSibling;
		while(arrowElement != element.parentNode.firstChild){
			if (arrowElement.nodeType == 1) {
				arrowElements.push(arrowElement);
			}
			arrowElement = arrowElement.previousSibling;
		}
		return arrowElements;
	}else if (arrow == 0) {
		var arrowElement = element.nextSibling;
		while(arrowElement != element.parentNode.lastChild){
			if (arrowElement.nodeType == 1) {
				arrowElements.push(arrowElement);
			}
			arrowElement = arrowElement.nextSibling;
		}
		return arrowElements;
	}
}