let root = document.documentElement;
let inputColor = document.querySelectorAll('input[type="color"]');
let inputDot = document.querySelector('input[name="rem"]');
let inputStripe = document.querySelector('input[name="sleeve_pattern"]');
let html = document.querySelector('html');

window.addEventListener('load', loadElements, false);
function loadElements(){
	let val;
	inputColor.forEach(function(item){
		val = getComputedStyle(root).getPropertyValue(`--${item.name}`);
		item.value = val.replace(' ','');
	})
}

inputColor.forEach(function(item){
	item.addEventListener('change',function(){
		root.style.setProperty(`--${item.name}`, item.value);
	}, false)
})


inputDot.addEventListener('input',function(){
	html.style.fontSize = this.value + 'px';
})

inputStripe.addEventListener('input',function(){
	let id = inputStripe.getAttribute('name');
	let el = document.getElementById(id);

	el.setAttribute(inputStripe.id, inputStripe.value + '%');
}, false)

