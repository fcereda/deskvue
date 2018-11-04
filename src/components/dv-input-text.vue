<template>

	<input 
		:type="inputType" 
		class="__dv-input-text" 
		:class="inputClass"
		:style="inputStyle"
		:placeholder="placeholder"
		:maxlength="maxlength"
		:minlength="minlength" 
		:pattern="pattern"
		:disabled="disabled"
		:value="value"
		ref="input"
		@input="onInput"
	></input>

</template>

<script>

import utils from './utils.js'

export default {
	props: ['width', 'password', 'placeholder', 'disabled', 'rounded', 'noBorder', 'minlength', 'maxlength', 'pattern', 'color', 'mask', 'info', 'error', 'value'],

	data: function () {
		return {}
	},

	computed: {
		inputType: function () {
			return utils.isPropOn(this.password) ? 'password' : 'text'
		},

		inputClass: function () {
			return utils.computeClasses({
				rounded: 'rounded',
				'no-border': 'noBorder',
				password: 'password' 
			}, this)		
		},

		inputStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}
	},

	methods: {
		onInput: function (e) {
			let newValue = 	e.target.value
			this.$emit('input', newValue)
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

input.__dv-input-text {
	display: inline-block;
	position: relative;
	box-sizing:border-box;
    padding-left: 0.4em;
    padding-right: 0.5em;
    background-color: #fff;
    color: $text-color;
	border: 1px solid $border-color;    
	border-radius: $border-radius;
	outline:none;
    line-height: 150%;
    font-family: inherit;
    font-size: $font-size;
    height: $form-control-height;

    &.rounded {
    	border-radius: $border-radius-rounded;
    }

    &.no-border {
    	border: 1px solid transparent;
    }

    &.password {
    	letter-spacing:0.1em;
    }

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

	&:not(.no-border):focus {
		box-shadow: 0px 0px 1px 1px $focus-color;	
	  	z-index:100;
	}	
}  


</style>