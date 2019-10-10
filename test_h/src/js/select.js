(function(){

	//сделать dropdown из select
	let mainElem = document.getElementById('someLevels');

	let optionsList = mainElem.querySelectorAll('option');
	let optionsArr = [];
	let selectedOptions = '';

	for (let i = 0; i < optionsList.length; ++i) {
		let optionData = optionsList[i].dataset.type;
		let optionValue = optionsList[i].dataset.id;
		let optionText = optionsList[i].text;

		let optionDataSelected = '';
		if(optionsList[i].getAttribute('selected') !== null ){
			optionDataSelected += 'selected';
			selectedOptions += '<span class="itemList" data-id="'+optionValue+'">'+optionText +'</span>'
		}

		let optionPriority = 1;
		if(optionsList[i].getAttribute('data-priority') !== null){
			optionPriority = 0
		}

		optionsArr.push([
			optionData,
			optionPriority,
			optionText,
			optionDataSelected,
			optionValue])
	}

	optionsArr.sort();

	mainElem.insertAdjacentHTML('afterend',
		'<div class="dropdown">' +
			'<button class="dropdown-btn">' +
				'<div class="dropdown-title" ' + 'data-placeholder="' + mainElem.dataset.placeholder + '">' +
					selectedOptions +
				'</div>' +
			'</button>' +
			'<div class="dropdown-wrap">' +
				'<div id="dropdown-list" class="dropdown-list"></div>' +
			'</div>' +
			'<button class="dropdown-shadow"></button>' +
		'</div>'
	);

	mainElem.classList.add('hide');


	let prevItem ="", dropItem ="";
	let dropCategory;
	let parent = document.getElementById('dropdown-list');

	for(let i=0; i<optionsArr.length; i++){

		if(optionsArr[i][0] !== prevItem){
			dropCategory = '<div class="dropdown-category">' + optionsArr[i][0] + '</div>';
		} else {
			dropCategory = ""
		}
		parent.insertAdjacentHTML('beforeend',dropCategory)

		dropItem =
			'<button data-id="'+optionsArr[i][4]+'" class="dropdown-link '+ optionsArr[i][3] +' ">' +
				'<span class="check">' +
					optionsArr[i][2] +
				'</span>' +
			'</button>';

		parent.insertAdjacentHTML('beforeend',dropItem)
		prevItem = optionsArr[i][0];
	}



	//открыть-закрыть дроп
	let dropBtn = document.querySelectorAll('.dropdown-btn, .dropdown-shadow');

	for (let i = 0; i < dropBtn.length; i++) {
		dropBtn[i].addEventListener('click', function () {
			this.closest('.dropdown').classList.toggle('active')
		})
	}


	//отметить галочки
	let dropLink = document.querySelectorAll('.dropdown-link');

	for (let i = 0; i < dropLink.length; i++) {
		dropLink[i].addEventListener('click', function () {
			let dataId = this.dataset.id;

			if (this.classList.contains('selected')) {
				this.classList.remove('selected')

				this.closest('.dropdown')
					.querySelector('.dropdown-title')
					.querySelector('[data-id="' + dataId + '"]')
					.remove()

				mainElem.querySelector('[data-id = "'+dataId+'"]')
					.removeAttribute('selected','');

			} else {
				this.classList.add('selected');

				this.closest('.dropdown')
					.querySelector('.dropdown-title')
					.insertAdjacentHTML('beforeend',
						'<span class="itemList" data-id="' + dataId + '">' +
							this.textContent +
						'</span>'
					);

				mainElem.querySelector('[data-id = "'+dataId+'"]')
					.setAttribute('selected','');
			}
		})
	}

})()