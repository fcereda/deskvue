<template>

<div class="dv-select-container">
	<select ref="select" :multiple="multiple">

		<slot></slot>
	
	</select
	></div>	

</template>

<script>

import Choice from 'choices.js'
import utils from './utils.js'

export default {

	props: ['value', 'search', 'multiple', 'placeholder'],

	data: function () {

		return {
			choice: null
		}

	},

	mounted: function () {
		this.$nextTick(() => this.initializeChoices())
	},

	methods: {

		initializeChoices: function () {
			let elem = this.$refs.select
			this.choice = new Choice(elem, {
				choices: [],
				removeItemButton: true,
		        searchEnabled: utils.isPropOn(this.search),	
        		placeholder: true,
        		placeholderValue: this.placeholder,		        
		        classNames: {
      				//containerOuter: 'dv-select',
      			}	

			}, 'value', 'label', false)
		}

	}

}

</script>

<style lang="scss">

$choices-button-icon-path: "~choices.js/assets/icons";
@import '~choices.js/assets/styles/scss/choices';

@import './base.scss';

.dv-select-container {
	display:inline-block;
	width: 25em;
}

.choices {
	height: 2.25em;
	margin-right:0;	
}

.choices__inner {
	min-height: inherit;
	padding-left: 0.4em;
	padding-right: 0;
	
	background-color: inherit;
	box-sizing: border-box;
	border-radius: 8px;
}

/* border-color: transparent should me added to .choices__inner for the floating control */

.choices.is-open > .choices__inner {
	border-radius: 8px;

}

.choices.is-focused > .choices__inner {
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
	background-color: transparent;
}


.choices__list--multiple.choices__item {
	margin-bottom: 0;
}

/*
.choices__item.choices__item--selectable {
	margin-bottom:0;
	padding:0;
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