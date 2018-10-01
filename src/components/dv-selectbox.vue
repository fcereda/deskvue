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

		<dv-input-select 
			:multiple="multiple" 
			:search="search"
			:rounded="rounded"
			:no-border="isFloating"
			class="dv-input-select" 
			:placeholder="placeholder" 
			:value="value"
			ref="input"
			@input="onInput"
		><slot></slot>
		</dv-input-select>

	</dv-form-field>

</template>

<script>

import dvFormField from './dv-form-field.vue'
import dvInputSelect from './dv-input-select.vue'
import utils from './utils.js'

export default {
	components: {
		dvFormField,
		dvInputSelect
	},

	props: ['display', 'width', 'label', 'placeholder', 'floating', 'rounded', 'color', 'info', 'error', 'multiple', 'search', 'value'],

	computed: {

		isFloating: function () {
			return utils.isPropOn(this.floating)
		},

		isRounded: function () {
			return utils.isPropOn(this.rounded)
		},

		isEmpty: function () {
			if (!this.value)
				return false
			if (typeof this.value == 'object' && !this.value.length)
				return false
			return true
		},

/*
		inputClass: function () {
			let classes = []
			if (this.isFloating)
				classes.push('floating')
			if (this.isRounded)
				classes.push('rounded')
			return classes.join(' ')
		}
*/

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


$input-select-height: $form-control-height - 0.075em;


.dv-input-select {
	font-size: $font-size;
	min-height: $input-select-height;	
}

.dv-input-select {
	background-color: transparent;
}

/*
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
	background-color: transparent;
}

*/

input.dv-input-select.floating:focus {
    outline: 2px solid transparent; 
}  

input.dv-input-text.rounded {
	border-radius:8px;
}



</style>