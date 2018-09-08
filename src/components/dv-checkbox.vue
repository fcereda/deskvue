<template>
<span tabindex="0" class="dv-checkbox" :class="displayClass" @click="onClick" @keydown="onKeydown">
	<label :class="labelClass">
		<span class="icon-container" :class="iconContainerClass">
<!--
		<input class="input-control" type="checkbox" :value="id" @change="onChange" @input="onChange" :checked="value" ref="inputControl"></input>
-->		
		<i class="material-icons" :class="iconClass">{{ icon }}</i></span>
		<span class="checkbox-label"><slot></slot></span>
	</label>
</span>
</template>

<script>

import utils from './utils.js'

const icons = {
	'checkbox': {
		0    : 'check_box_outline_blank',
		1    : 'check_box',
		'-1' : 'indeterminate_check_box'
	},
	'radio': {
		0: 'radio_button_unchecked',
		1: 'radio_button_checked'
	},
	'toggle': {
		0: 'toggle_off',
		1: 'toggle_on'
	}
}

let id = 1

export default {

	props: ['type', 'align', 'display', 'value', 'disabled', 'color'],

	data: function () {
		id += 1
		return {
			id 
		}
	},

	computed: {

		icon: function () {
			let value = Number(this.value || 0)
			let type = this.type || 'checkbox'
			return icons[type][value]
		},

		displayClass: function () {
			if (this.display == 'block')
				return 'block'
		},

		labelClass: function () {
			let classes = []				
			if (utils.isPropOn(this.disabled))
				classes.push('color-disabled')
			if (this.align)
				classes.push(this.align)
			return classes.join(' ')
		},

		iconClass: function () {

			if (utils.isPropOn(this.disabled))
				return 'color-disabled'
			if (this.value != 0) {
				let color = this.color || 'primary'
				return 'color-' + color
			}

		},

		iconContainerClass: function () {
			let classes = []
			if (this.type == 'toggle') {
				classes.push('toggle')
			}
			if (this.align == 'right') {
				classes.push('right')
			}
			return classes.join(' ')
		}	

	},

	methods: {

		onClick: function () {
			let newValue = !this.value
			this.$emit('input', newValue)
/*
			let newValue = this.value
			if (utils.isPropOn(this.allowIndeterminate))
				newValue = [0, 1, -1][newValue+1]
			else
				newValue = !newValue
			this.$emit('input', newValue)
*/			
		},

		onKeydown: function (e) {
			if (e.key == ' ' || e.key == 'Enter') {
				e.preventDefault()
				this.onClick();
				return
				let inputControl = this.$refs.inputControl
				inputControl.checked = !inputControl.checked
				this.$emit('input', inputControl.checked)
			}
		},

		onChange: function (e) {
			let newValue = e.target.checked
			this.$emit('input', newValue)
		},

	}

}

</script>

<style lang="scss">

@import './base.scss';

$icon-scale: 0.85;
$border-color: #aaa;

.dv-checkbox {
	display: inline-block;
	box-sizing: border-box;
	text-align: left;
}

.dv-checkbox.block {
	display: block;
}

.dv-checkbox > label {
	display:flex;
	flex-direction:row;
}

.dv-checkbox > label.right {
	flex-direction: row-reverse;
}

.dv-checkbox > label.center {
	flex-direction: column;
}

.dv-checkbox > label:hover {
	//text-decoration: underline;
	cursor: pointer;
	user-select: none;
}

.dv-checkbox:focus {
	outline: none;
	//text-decoration: underline;
}

.input-control {
	display: none;
}

.dv-checkbox > label > .icon-container {
	display:inline-block;
	transform: scale($icon-scale, $icon-scale);
	position: relative;
	margin-right:0.25em;
	text-align:center;
}

.dv-checkbox > label > .icon-container > i {
	border-radius: 4px;
	border: 2px solid transparent;
}

.dv-checkbox:focus > label > .icon-container > i {
	border-color: $border-color;
}

$toggle-scale: 1.5;
$toggle-border-width: 1.333px;

.dv-checkbox > label > .icon-container.toggle > i {
	border-width: $toggle-border-width;
}

.dv-checkbox > label > i.material-icons {
}

.dv-checkbox > label > .icon-container.toggle {
	transform: scale($toggle-scale, $toggle-scale) !important;
	margin-right:0.5em;
	top:-0.0625em;
	color: #777;
}

.dv-checkbox > label > .icon-container.toggle.right {
	margin-right:0;
	margin-left:0.75em;
}

.dv-checkbox > label:not(.center) > span.checkbox-label {
	margin-bottom:0.25em;
	position: relative;
	top:0.25em;
}

.dv-checkbox > label.center > span.checkbox-label {
	margin-left: 0.25em;
	margin-right: 0.75em;
}

</style>
