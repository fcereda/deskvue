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

import props from './props.js'
import utils from './utils.js'

export default {
	props: {
		...props.inputProps,

		password: {
			type: Boolean,
			default: false
		}, 
		minlength: {
			type: [String, Number],
			required: false
		},
		maxlength: {
			type: [String, Number],
			required: false
		},
		pattern: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: true
		}
	},	

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
		focus: function () {
			this.$el.focus()
		},
		
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
	width: 10em;
    padding-left: 0.4em;
    padding-right: 0.5em;
    color: $text-color;
    background-color: transparent;

	border: $border;    
	border-radius: $border-radius;
	box-shadow: $box-shadow;
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
    	box-shadow: none;
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
		border: $border-focus;
		box-shadow: $box-shadow-focus;
	  	z-index:100;
	}	
}  


</style>