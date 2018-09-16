<template>

	<dv-form-field
		:display="display"
		:width="width"
		:label="label"
		:floating="floating"
		:rounded="rounded"
		:color="color"
		:info="info"
		:error="error"
		:is-empty="isEmpty"
		@set-focus="setFocus"
	>

		<input 
			type="text" 
			class="dv-input-text" 
			:class="inputClass"
			:placeholder="placeholder" 
			:value="value"
			ref="input"
			@input="onInput"
		></input>

	</dv-form-field>

</template>

<script>

import dvFormField from './dv-form-field.vue'
import utils from './utils.js'

export default {
	components: {
		dvFormField
	},

	props: ['display', 'width', 'label', 'placeholder', 'floating', 'rounded', 'color', 'mask', 'info', 'error', 'value'],

	computed: {

		isFloating: function () {
			return utils.isPropOn(this.floating)
		},

		isRounded: function () {
			return utils.isPropOn(this.rounded)
		},

		isEmpty: function () {
			return !this.value || !this.value.length
		},

		inputClass: function () {
			let classes = []
			if (this.isFloating)
				classes.push('floating')
			if (this.isRounded)
				classes.push('rounded')
			return classes.join(' ')
		}

	},

	data: function () {
		return {
			hasFocus: false,
			showLabelIcons: false,
			icons: ['help_outline']
		}
	},

	methods: {

		onInput: function (e) {
			let newValue = 	e.target.value
			this.$emit('input', newValue)
		},

		setFocus: function () {
			this.$refs.input.focus()
		}

	}

}

</script>

<style lang="scss">

@import './base.scss';

input.dv-input-text {
	box-sizing:border-box;
    padding-left: 0.4em;
    padding-right: 0.5em;
    background-color: #fff;
    color: #222;
	border: 1px solid $border-color;    
    min-width: 5em;
    width: calc(100% - 0.1em);
    line-height: 150%;
    cursor: pointer;
    user-select: none;
    font-family: inherit;
    font-size: $font-size;
    height: $form-control-height;

}  
  
input.dv-input-text:hover {
    cursor:text;
}  

input.dv-input-text:not(.floating).rounded {
	border-radius: 8px;
}
  
input.dv-input-text:not(.floating):focus {
    outline: 2px solid $focus-color; 
}  
  
input.dv-input-text.floating {
	border: 1px solid transparent;
	/* outline: none; */
}

input.dv-input-text.floating:focus {
    outline: 2px solid transparent; 
}  

input.dv-input-text.rounded {
	border-radius:8px;
}

/* I'm not sure the following style belongs here! */
/*
input.dv-input-text.floating {
	position: relative;
	top: 0;
	left: 0;
	padding-top: 1.125em;
	width: calc(100% - 0.9em);
	border: none;
	background-color: transparent;
	line-height: 125%;
	transition-delay: 0.2s;
	transition-duration: -0.2;
	transition-property: opacity;
}
*/

</style>