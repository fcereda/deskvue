<template>

	<dv-form-field
		:display="display"
		:width="width"
		:label="label"
		:floating="floating"
		:rounded="rounded"
		:no-border="noBorder"
		:disabled="disabled"
		:color="color"
		:info="info"
		:error="error"
		:is-empty="isEmpty"
		@set-focus="setFocus"
	>

		<dv-input-text 
			type="text" 
			:class="inputClass"
			:placeholder="placeholder" 
			:disabled="disabled"
			:color="color"
			:no-border="isFloating"
			width="100%"
			:value="value"
			ref="input"
			@input="onInput"
		></dv-input-text>

	</dv-form-field>

</template>

<script>

import dvFormField from './dv-form-field.vue'
import dvInputText from './dv-input-text.vue'
import utils from './utils.js'

export default {
	components: {
		dvFormField,
		dvInputText
	},

	props: ['display', 'width', 'label', 'placeholder', 'disabled', 'floating', 'rounded', 'no-border', 'color', 'mask', 'info', 'error', 'value'],

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

		isDisabled: function () {
			return !!utils.isPropOn(this.disabled)
		},			

		inputClass: function () {
			let classes = ['trasparent']
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

input.transparent {
	background-color: transparent;
}

/*
input.dv-input-text {
	box-sizing:border-box;
    padding-left: 0.4em;
    padding-right: 0.5em;
    background-color: #fff;
    color: #222;
	border: 1px solid var(--border-color);    
	border-radius: var (--border-radius);
    min-width: 5em;
    width: calc(100% - 0.1em);
    line-height: 150%;
    cursor: pointer;
    user-select: none;
    font-family: inherit;
    font-size: var(--font-size);
    height: var(--form-control-height);

    &:disabled {
    	opacity: 0.75;
    	color: #606060;
    }

    &:hover:not(:disabled) {
    	cursor:text;
	}  

	&:hover:disabled {
		cursor: no-drop;
	}		

}  
*/
  
/*
input.dv-input-text:not(.floating).rounded {
	border-radius: $border-radius-rounded;
}
  
input.dv-input-text:not(.floating):focus {
    outline: 2px solid $focus-color; 
}  
  
input.dv-input-text.floating {
	border: 1px solid transparent;
	background-color: transparent;
}

input.dv-input-text.floating:focus {
    outline: 2px solid transparent; 
}  

input.dv-input-text.rounded {
	border-radius:8px;
}
*/



</style>