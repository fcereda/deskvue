<template>

<div 
	class="dv-select-container" 
	:class="divClass"
	:style="divStyle">
	<select ref="select" :multiple="multiple">

		<slot></slot>
	
	</select
	></div>	

</template>

<script>

import Choice from 'choices.js'
import utils from './utils.js'

export default {

	props: ['value', 'search', 'multiple', 'placeholder', 'rounded', 'no-border', 'width'],

	data: function () {

		return {
			choice: null
		}

	},

	computed: {

		divClass: function () {
			if (utils.isPropOn(this.noBorder))
				return 'rounded no-border'
			if (utils.isPropOn(this.rounded))
				return 'rounded'
		},

		divStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}

	},

	mounted: function () {
		this.$nextTick(() => this.initializeChoices())
	},

	beforeDestroy: function () {
		console.log('will destroy this.choice')
   		this.choice.destroy()
	},

	methods: {

		initializeChoices: function () {
			let thisElement = this.$el
			let elem = this.$refs.select
			let choice = new Choice(elem, {
				choices: [],
				removeItemButton: true,
		        searchEnabled: utils.isPropOn(this.search),	
        		placeholder: true,
        		placeholderValue: this.placeholder,		        
        		position: 'auto',
		        classNames: {
      				//containerOuter: 'dv-select',
      			},
			}, 'value', 'label', false)
			this.choice = choice
			this.$nextTick(() => {
				if (!utils.isPropOn(this.multiple)) 
					return
				// Customizes the input element for multiple select
				let choicesInner = this.choice.containerInner
				let choicesInput = thisElement.querySelector('input.choices__input')
				choicesInner.classList = choicesInner.classList + ' choices__inner-multiple'
				choicesInput.classList = choicesInput.classList + ' choices__input-multiple'

				// Hack for keep the minimize the width of the input element:
				const resizeInput = () => {
  					choicesInput.style.width = (choicesInput.value.length || 1) + "ch";
				}
				// bind the "resizeInput" callback on "input" event, so the input
				// will be resized every time it
				choicesInput.addEventListener('input', resizeInput); 
				// Also calls resizeInput every time the user selects an item, so
				// as to shrink the input to the minimum size
				elem.addEventListener('choice', (e) => {
					this.$nextTick(resizeInput)
				})		
				// Initializes the input with the minimum size
				resizeInput()  
			})

			elem.addEventListener('showDropdown', e => {
				// Listen to the showDropdown event just to position the
				// dropdown correctly; choice.position: 'auto' is not working
  				const choicesInput = thisElement.querySelector('input.choices__input')
  				const dropdown = thisElement.querySelector('.choices__list--dropdown')

  				const dropdownHeight = dropdown.offsetHeight
  				const inputClientRect = choicesInput.getBoundingClientRect()
  				const inputTop = inputClientRect.top
  				const inputBottom = inputClientRect.bottom
 				const windowHeight = window.outerHeight

 				const positionAtTheTop = () => {
					let containerOuter = choice.containerOuter
  					containerOuter.classList += ' is-flipped'
 				}

  				// Don't do anything if there's room for positioning the dropdown 
  				// below the input
  				if (inputBottom + dropdownHeight <= windowHeight) {
 					return
  				}

  				if (inputTop - dropdownHeight >= 0) {
  					positionAtTheTop()
  				}

  				// If we get here, we don't have enough room in either the top or the
  				// bottom; in this case, we position the dropdown where we have the most room
 				const spaceTop = inputTop
 				const spaceBottom = windowHeight - inputBottom
 				if (spaceBottom > spaceTop) {
 					positionAtTheTop()
 				}

   			})



		}

	}

}

</script>

<style lang="scss">

$choices-button-icon-path: "~choices.js/assets/icons";
@import '~choices.js/assets/styles/scss/choices';

@import './base.scss';

.dv-select-container {
/*
	display:inline-block;
*/	
	width: 25em;
	text-align:left;
}

.choices {
/*
	height: $form-control-height;
*/	
	margin-right:0;	
}

.dv-select-container.no-border > .choices {
	min-height: 1.8em;
}

.choices__inner {
	min-height: inherit;
	padding-left: 0.4em;
	padding-right: 0;
	
	background-color: transparent;
	box-sizing: border-box;
	border-color: $border-color;

	display: block;

	padding: 7.5px 5.5px 3.75px;
	padding-bottom: 5.0px !important;
	overflow: inherit;
}

.choices__inner:not(.choices__inner-multiple) {
	height: $form-control-height;
}

.choices__inner.choices__inner-multiple {
	min-height: $form-control-height;
	padding-bottom: 0px !important;
}

.dv-select-container.no-border > .choices > .choices__inner {
	border: none;
}

.dv-select-container.rounded > .choices > .choices__inner {
	border-radius: 8px;	
}

/* border-color: transparent should me added to .choices__inner for the floating control */

.dv-select-container.rounded > .choices.is-open > .choices__inner {
	border-radius: 8px;
}

.dv-select-container:not(.no-border) > .choices.is-focused > .choices__inner {
	border-color: $focus-color;
	box-shadow: 0px 0px 2px 0px $focus-color;	
}

/* 
.choices.is-open > ch
*/

.choices__list--single {
	padding: 0 0 0 0;
}

.choices__item--choice {
	text-align: left;
}

.choices__input {
	margin-bottom: 0;
	padding-top: 0px;
	padding-bottom:4px;
	background-color: yellow;
	max-width: unset;
}


.choices__inner-multiple {
	padding-top:4px;
	padding-bottom:0px; 
	min-height: 32px;
}

.choices__input-multiple {
	background-color: transparent;
	padding-top: 4px;
	padding-bottom:2px; 
}

.choices__list--multiple.choices__item {
	margin-bottom: 0;
}

.choices__list--multiple .choices__item {
	background-color: #999;
	border-width: 0;
	border-radius: 6px;
	vertical-align: top;
	font-size: 1em;
	padding-top: 2.5px;
	padding-bottom: 2.5px;
}


.choices[data-type*="select-one"] .choices__button {
	height: unset;
	top: calc(50% + 1px);
	opacity: 0.75;
}

.choices[data-type*="select-multiple"] .choices__button {
    position: relative;
    display: inline-block;
    margin-top: 0;
    margin-right: 0px;
    margin-bottom: 0;
    margin-left: 8px;
    padding-left: 0px;
    padding-right:0px;
    border-left: 1px solid transparent;
    background-image: url(/img/cross.26f0a45f.svg);
    background-size: 8px;
    width: 16px;
    line-height: 1;
    opacity: .75;
}

.choices[data-type*="select-multiple"] .choices__button:focus {
	background-color: $focus-color;
	color: white;
	border-radius: 16px;
}

.choices__list--dropdown {
	top: inherit;
}

.choices[data-type*="select-one"]:after {
    content: "";
    height: 0;
    width: 0;
    border-style: solid;
    border-color: #333333 transparent transparent transparent;
    border-width: 5px;
    position: absolute;
    right: 11.5px;
    top: calc(50% - 1px);
    margin-top: -2.5px;
    pointer-events: none;

    opacity: 0.75;
}

.choices[data-type*="select-one"].is-open:after {
	opacity: 1.0;
}

.choices[data-type*="select-one"]:hover:after {
	opacity: 1.0;
}

/*
.choices__item.choices__item--selectable {
	margin-bottom:0;
	padding:0;.choices__list--multiple.choices__item {
	background-color: firebrick;
	margin-bottom: 0;
	border-width: 0;
	vertical-align: top;
}
}
*/
.dv-select {
	
    padding-left: 0.4em;
    padding-right: 0.5em;
    background-color: #fff;
    color: #222;
    border: 1px solid rgba(0, 0, 0, 0.15);
    outline: 1px transparent;
    min-width: 5em;
    line-height: 150%;
    cursor: default;
    user-select: none;
    font-family: inherit;
    height: 2.25em;

    width: 15em;
}  
  
.dv-select:hover {
    cursor: pointer;
}  
  
.dv-select:focus {
    outline: 2px solid #1867c0;
}    

</style>