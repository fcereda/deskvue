<template>

<div style="display:inline-block;">
	<div 
		class="textbox floating"
		:class="containerClass"
	>
		<input 
			type="text" 
			class="dv-input-text" 
			:placeholder="placeholder" 
			:value="value"
			ref="input"
			@focus="hasFocus=true" 
			@blur="hasFocus=false"
			@input="onInput"
		></input>
		<label class="dv-input-label" :class="labelClass" @click="setFocus">{{ label }}</label>
	</div>
</div>

</template>

<script>

export default {
	props: ['label', 'color', 'placeholder', 'mask', 'info', 'error', 'value'],

	computed: {

		containerClass: function () {
			if (this.hasFocus)
				return 'focus'
			if (this.currentValue.length)
				return ''
			return 'empty'
		},

		labelClass: function () {
			return this.hasFocus ? 'focus' : ''
		}
	},

	data: function () {
		return {
			currentValue: this.value,
			hasFocus: false
		}
	},

	methods: {

		setFocus: function () {
			this.hasFocus = true
			this.$nextTick(() => this.$refs.input.focus())
		},

		onInput: function (e) {
			let newValue = 	e.target.value
			this.currentValue = newValue
			this.$emit('input', newValue)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

$focus-color: #1867c0;

.textbox {
	display: flex;
	flex-direction: column-reverse;
	margin-bottom:1em;
	font-size:14px;
}

.textbox > .dv-input-label {
	font-size: 0.9em;
	font-weight: 600;
	padding-left:0.125em;
	padding-bottom:0.125em;
}

.textbox > .dv-input-label.focus {
	color: $focus-color;
}

input.dv-input-text {
    padding-left: 0.4em;
    padding-right: 0.5em;
    background-color: #fff;
    color: #222;
    border: 1px solid rgba(0, 0, 0, 0.15);
    min-width: 5em;
    line-height: 150%;
    cursor: pointer;
    user-select: none;
    font-family: inherit;
    font-size:14px;
    height: 2.25em;
}  
  
input.dv-input-text:hover {
    cursor:text;
}  
  
.textbox:not(.floating) > input.dv-input-text:focus {
    outline: 2px solid $focus-color; 
}  
  
/*

.textbox.floating {
	//display: inline-block;
	position: relative;
	border: 1px solid #aaa;
}

.textbox.floating > .dv-input-label {
	position: relative;	
	top: 0.5em;
	left: 0.5em;
}

.textbox.floating > input {
	position: relative;
	top: 0.25em;
	//left: 0.135em;
	left: 0;
	//width:100%;
	width: calc(100% - 0.9em);
	border: none;
	background-color: transparent;
}

*/

.textbox.floating {
	//display: inline-block;
	position: relative;
	border: 1px solid #aaa;
}

.textbox.floating > .dv-input-label {
	position: relative;	
	top: 0em;
	left: 0em;
	padding-left: 0.5em;
	padding-top: 0.75em;
	font-size:0.8em;
	line-height:80%;
}


.textbox.floating.focus {
	outline:2px solid $focus-color;
}


.textbox.floating.focus > input.dv-input-text:focus {
    outline: 2px solid transparent; 
}  


.textbox.floating.empty > .dv-input-label {
	top: 0.25em;
	left: 0em;
	bottom: 0em;
	right: 0em;
	font-size: 1em;
	line-height: 150%;

	padding-bottom: 1.5em;
	font-weight: 400;
	cursor: text;	
	transition: 0.25s all;
}

.textbox.floating > input {
	position: relative;
	top: 0;
	left: 0;
	width: calc(100% - 0.9em);
	border: none;
	background-color: transparent;
	line-height: 125%;
}

.textbox.floating.empty > input {
	height:0em;
	opacity:0.0;
	transition: 0.25s all;

}

</style>