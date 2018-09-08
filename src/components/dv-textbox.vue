<template>

	<div class="textbox">
		<label class="dv-input-label" :class="labelClass">{{ label }}</label>
		<input 
			type="text" 
			class="dv-input-text" 
			:placeholder="placeholder" 
			:value="value"
			@focus="hasFocus=true" 
			@blur="hasFocus=false"
			@input="onInput"
		></input>
	</div>

</template>

<script>

export default {
	props: ['label', 'color', 'placeholder', 'mask', 'info', 'error', 'value'],

	computed: {
		labelClass: function () {
			return this.hasFocus ? 'focus' : ''
		}
	},

	data: function () {
		return {
			hasFocus: false
		}
	},

	methods: {
		onInput: function (e) {
			this.$emit('input', e.target.value)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.textbox {
	display: flex;
	flex-direction: column;
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
	color: $color-primary;
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
  
input.dv-input-text:focus {
    outline: 2px solid #1867c0;
}  
  
</style>