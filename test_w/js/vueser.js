const NUMBER = 300;

class Check{
	constructor(title, id, checked){
		this.title = title;
		this.id = id;
		this.checked = checked;
	}
}
let arr = [];
for(let i=0; i<NUMBER; i++){
	arr.push(
		new Check(
			'Элемент '+i,
			'check'+i,
			''
		),
	)
}

let start = [
	new Check(
		'Элемент 2',
		'check2',
		'true'
	),
	new Check(
		'Элемент 8',
		'check8',
		'true'
	),
];


let main = new Vue({
	el: "#app",
	data: {
		startState: start,

		isActive: false,

		checkedEl: [],

		checkboxList: arr,
		selectedItems: [],

		search: '',
		select: '',
		checkedLength: 0,
	},
	computed:{
		filteredList: function(){
			//поиск и фильтр
			return this.checkboxList.filter( check => {
				return check.title.toLowerCase().includes(this.search.toLowerCase()) &&
					+check.title.replace(/\D+/g,"") > this.select
			})
		},
	},

	created() {
		//убрать один из 3х выбранных чекбоксов
		//убирается состояние checked
		this.$root.$on('send', (id) => {
			let el = this.checkboxList.find(x => x.id === id);
			el.checked = "";
			main.checkedLength--;
		});

	},

	methods:{
		initForm: function(){
			//начальные состояния
			//отрисовываем галочки, помещаем блоки "Сейчас выбрано"
			this.selectedItems = [];
			this.checkedLength = this.startState.length;

			for(let i=0; i<this.startState.length; i++){
			//	this.selectedItems[i] = this.startState[i];

				for(let j=0; j<this.checkboxList.length; j++) {
					if (this.startState[i].id === this.checkboxList[j].id) {
						this.checkboxList[j].checked = true;
						this.selectedItems.push(this.checkboxList[j])
					}
				}
			}

			this.isActive = true
		},

		removeStartItem: function(item){
			//удаляем один из блоков с начальным состоянием
			let el = this.startState.find(x => x.id === item.id);
			let index = this.startState.indexOf(el);

			for(let j=0; j<this.checkboxList.length; j++) {
				if (this.checkboxList[j].id === this.startState[index].id) {
					this.checkboxList[j].checked = "";
				}
			}

			this.startState.splice(index,1);
		},

		saveForm: function () {
			//сохраняем полученные значения

			this.startState = [];
			for(let i=0; i<this.selectedItems.length; i++){
				this.startState[i] = this.selectedItems[i]
			}

			this.isActive = false;
		},
		cancelForm: function(){
			//при отмене некоторые галочки сохраняются,
			//нужно это исправить
			for(let j=0; j<this.checkboxList.length; j++) {
				this.checkboxList[j].checked = "";
			}

			this.selectedItems = [];

			this.isActive = false;
		},

		removeSelectedItem: function(item){
			//убрать один из 3х выбранных чекбоксов
			this.$root.$emit('send', item.id);

			let el = this.selectedItems.find(x => x.id === item.id);
			let index = this.selectedItems.indexOf(el);
			this.selectedItems.splice(index,1);
		},

		checkNum: function (check) {
			//выбор не более 3х чекбоксов
			if(check.checked === "") {
				main.checkedLength++;
				check.checked = true;
			} else {
				main.checkedLength--;
				check.checked = "";
			}
		},
	}
});

