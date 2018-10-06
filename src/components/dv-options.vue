<template>

<div 
	class="dv-options" 
	:class="divClass" 
	:style="divStyle"
	tabindex="0" 
	@keydown="onKeydown" 
	@focus="onFocus" 
	@blur="onBlur"
>
	<div 
		class="dv-option" 
		:class="optionClass(index)"
		:style="optionStyle(index)"
		v-for="(option, index) in thisOptions"
		@mouseover="onMouseOver(index)"
		@mouseout="onMouseOut(index)"
		@click="onClick(index)"
		v-html="option.html"
	></div>
</div>	

</template>

<script>

import utils from './utils.js'

export default {
	props: ['options', 'type', 'rounded', 'vertical', 'width', 'full-width', 'option-width', 'equal-width', 'stacked', 'slim', 'no-border', 'value'],

	computed: {

		divClass: function () {
			return utils.getComponentClasses(this, ['rounded', 'fullWidth', 'stacked', 'vertical', 'slim', 'noBorder'])
		},

		divStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		},

	},

	data: function () {
		let lastId = 0
		let indexActive = -1
		let optionsAreSelected = []
		if (!this.type == 'radio') {
			if (typeof(this.value) == 'number') {
				optionsAreSelected[this.value] = true
			}
		}
		else if (this.value != undefined) {
			indexActive = this.value
		}

		let options = []
		if (typeof(this.options) == 'object') {
			// this.options is either an array or an object
			if (!Array.isArray(this.options)) {
				// this.options is an object
				options = Object.keys(this.options).map(key => {
					let option = this.options[key]
					if (typeof(option) == 'object') {
						// this.options[key] is an object 
						option.id = key
						return option
					}
					else {
						// this.options[key] is a string or number
						return {
							id: key,
							text: option
						}
					}	
				})
			}
			else {
				// this.options is an array
				options = this.options
			}
		}
		else {
			console.error('dv-options warning: options prop must be an array or object, converting to single button')
			options = [this.options]
		}

		return {
			thisOptions: options.map((option, index) => {
				if (typeof(option) == 'string') {
					return {
						html: option,
						id: index
					}
				}
				let html = []
				let separator = '&nbsp;'
				let id = index				

				if (option.icon)
					html.push(`<i class="material-icons">${option.icon}</i>`)
				if (option.text)
					html.push(`<span class="dv-option-text">${option.text}</span>`)
				if (utils.isPropOn(this.stacked))
					separator = '<br>'
				else
					console.log('separator = ' + separator)
				if (option.id) 
					id = option.id
				return {
					html: html.join(separator),
					color: option.color,
					id: id
				}	
			}),
			numOptions: options.length,
			optionsAreSelected,
			hasFocus: false,
			indexActive,
			lastIndexActive: -1,
		}
	},

	watch: {

		value: function () {
			let selectedIds = []
			if (this.type == 'radio') 
				// type == 'radio'
				selectedIds = [this.value]
			else
				// type == 'checkbutton'
				selectedIds = this.value
			this.thisOptions.forEach((option, index) => {
				this.$set(this.optionsAreSelected, index, selectedIds.indexOf(option.id) >= 0)
			})
		}

	},

	methods: {

		optionClass: function (index) {
			let classes = []
			if (this.optionWidth)
				classes.push('no-padding')
			if (index == this.indexActive)
				classes.push('hover')
			if (this.optionsAreSelected[index])
				classes.push('selected')
			return classes.join(' ')
		},

		optionStyle: function (index) {
			if (utils.isPropOn(this.equalWidth) && !utils.isPropOn(this.vertical)) {
				const numOptions = this.numOptions || 1
				const width = 100 / numOptions
				return `min-width:${width}%;`
			}
			if (this.optionWidth) {
				return `width:${this.optionWidth};`
			}
		},

		onKeydown: function (e) {
			console.log(e.key)
			switch (e.key) {
				case 'ArrowUp':
				case 'ArrowLeft':
					this.indexActive -= 1
					if (this.indexActive < 0) {
						this.indexActive = this.numOptions - 1
					}
					break
				case 'ArrowDown':
				case 'ArrowRight':
					this.indexActive += 1
					this.indexActive = this.indexActive % this.numOptions
					break
				case ' ':
				case 'Enter':
					this.toggleOption(this.indexActive)	
					break
				default:
					return
			}
			e.preventDefault()
		},

		onFocus: function (e) {
			this.hasFocus = true
			if (this.indexActive < 0)
				this.indexActive = this.lastIndexActive
			if (this.indexActive < 0)
				this.indexActive = 0
		},

		onBlur: function () {
			this.hasFocus = false
			this.lastIndexActive = this.indexActive
			this.indexActive = -1
		},

		onMouseOver: function (index) {
			this.indexActive = index
		},

		onMouseOut: function (index) {
			if (!this.hasFocus) {
				this.indexActive = -1
			}
		},

		onClick: function (index) {
			this.indexActive = index
			this.toggleOption(index)
		},

		toggleOption: function (index) {
			console.log('onClick')
			let newValue = !this.optionsAreSelected[index]
			if (newValue && this.type == 'radio') {
				for (let i=0; i<this.optionsAreSelected.length; i++) {
					if (i == index)
						continue
					if (this.optionsAreSelected[i]) {
						this.$set(this.optionsAreSelected, i, false)
					}
				}
			}
			if (this.type == 'radio') {
				let selectedId = null
				if (newValue) {
					selectedId =  this.thisOptions[index].id
				}
				this.$emit('input', selectedId)
			}
			else {
				// If we get here, option.type == 'checkbutton'
				this.$set(this.optionsAreSelected, index, newValue)
				this.$emit('input', this.optionsAreSelected.reduce((selectedIds, optionIsSelected, index) => {
					if (optionIsSelected)
						selectedIds.push(this.thisOptions[index].id)
					return selectedIds
				}, []))
			}
		},

	}
}

</script>

<style lang="scss">

@import './base.scss';

$slim-margin: 0.25em;
$slim-height: $form-control-height - ($slim-margin * 2);

.dv-options {
	box-sizing: border-box;
	font-size: $font-size;
	display: inline-flex;
	flex-direction: row;
	border: 1px solid $border-color;
	border-radius: 2px;

	min-height: $form-control-height;
	background-color: transparent;
	user-select: none;
	cursor: pointer;
}

.dv-options:not(.stacked):not(.vertical) {
	height: $form-control-height;	
}

.dv-options:not(.stacked):not(.vertical).slim {
	min-height: $slim-height;
	height: $slim-height;
}

.dv-options.no-border {
	border-color: transparent;
}

.dv-options.rounded {
	border-radius: 8px;
}

.dv-options.vertical {
	flex-direction: column;
}

.dv-options.full-width {
	width:100%; 
}

.dv-options:focus {
	outline: none;
}

.dv-option {
	position: relative;		
	/* position:relative and z-index:2 on .hover are necessary to make sure the outline is displayed correctly */
	display:inline-block;
	box-sizing: border-box;
	padding-left: 1em;
	padding-right: 1em;
	height: 100%; 
	line-height: $form-control-height;
	overflow-x: hidden;
	flex-grow:1;
}

.dv-options.slim > .dv-option {
	line-height: $slim-height;
}

.dv-options:not(.stacked):not(.vertical) > .dv-option {
	overflow-y: hidden;
}

.dv-option.no-padding {
	padding-left: 0;
	padding-right: 0;
}

.dv-options:not(.vertical) > .dv-option:nth-child(1n+2) {
	border-left: 1px solid $border-color;
}

.dv-options.vertical > .dv-option:nth-child(1n+2) {
	border-top: 1px solid $border-color;
}

/*
.dv-options.no-border > .dv-option {
	border-color: transparent !important;
}
*/

.dv-options:not(.vertical) > .dv-option:nth-child(1) {
	border-top-left-radius: $border-radius-rounded;
	border-bottom-left-radius: $border-radius-rounded;
}

.dv-options:not(.vertical) > .dv-option:last-child {
	border-top-right-radius: $border-radius-rounded;
	border-bottom-right-radius: $border-radius-rounded;
}

.dv-options.vertical > .dv-option:nth-child(1) {
	border-top-left-radius: $border-radius-rounded;
	border-top-right-radius: $border-radius-rounded;
}

.dv-options.vertical > .dv-option:last-child {
	border-bottom-left-radius: $border-radius-rounded;
	border-bottom-right-radius: $border-radius-rounded;
}

.dv-options:not(.vertical):not(.rounded) > .dv-option:nth-child(1) {
	border-top-left-radius: $border-radius;
	border-bottom-left-radius: $border-radius;
}

.dv-options:not(.vertical):not(.rounded) > .dv-option:last-child {
	border-top-right-radius: $border-radius;
	border-bottom-right-radius: $border-radius;
}

.dv-options.vertical:not(.rounded) > .dv-option:nth-child(1) {
	border-top-left-radius: $border-radius;
	border-top-right-radius: $border-radius;
}

.dv-options.vertical:not(.rounded) > .dv-option:last-child {
	border-bottom-left-radius: $border-radius;
	border-bottom-right-radius: $border-radius;
}


.dv-option.hover {
	z-index:2;
	box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.25); 
}


.dv-option.selected {
	background-color: $color-primary;
	color: white;
}

.dv-option > i.material-icons {
	vertical-align: text-bottom;	
	opacity: 0.9;
}

.dv-options:not(.slim) > .dv-option > i.material-icons {
	transform: translateY(0.125em); 
}

.dv-options.stacked > .dv-option > i.material-icons {	
	transform: translateY(0.325em);
}

.dv-options.stacked > .dv-option > .dv-option-text {
	display:inline-block;
	line-height: 125%;
}

.dv-options.slim > .dv-option > .dv-option-text {
	transform: translateY(-0.125em);
	vertical-align:text-bottom;
}

.dv-option.selected > i.material-icons {
	opacity: 1.0;
}

</style>