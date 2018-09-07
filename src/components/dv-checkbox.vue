<template>
<span tabindex="0" class="dv-checkbox" @click="onClick" @keydown="onKeydown">
	<label :class="labelClass" style="margin-top:-0.25em;display:flex;flex-direction:row;">
		<span class="icon-container" :class="iconContainerClass">
		<input class="input-control" :type="type == 'radio' ? 'radio': 'checkbox'" :name="name" :value="id" @change="onChange" @input="onChange" @click="newOnClick" :checked="value" ref="inputControl"></input>
		<i class="material-icons" :class="iconClass">{{ icon }}</i></span>
		<span><slot></slot></span>
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

	props: ['type', 'name', 'value', 'disabled', 'color', 'allow-indeterminate'],

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

		labelClass: function () {
			if (utils.isPropOn(this.disabled))
				return 'color-disabled'
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
			if (this.type == 'toggle') {
				return 'toggle'
			}
		}	

	},

	methods: {

		onClick: function () {
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
				let inputControl = this.$refs.inputControl
				inputControl.checked = !inputControl.checked
				this.$emit('input', inputControl.checked)
			}
		},

		onChange: function (e) {
			console.log('entrou em onChange, id = ' + e.target.value)
			let newValue = e.target.checked
			if (this.type == 'radio') {
				let selectedId = e.target.value
				newValue = this.id == selectedId
			}
			console.log('newValue = ' + newValue)
			this.$emit('input', newValue)
		},

		newOnClick: function (e) {
			console.log('newOnClick fired for id = ' + e.target.value)
		}

	}

}

</script>

<style>

@import './base.scss';

.dv-checkbox {
	display: inline-block;
	box-sizing: border-box;
	text-align: left;
	//transform: translateY(-0.325em);
}

.dv-checkbox > label:hover {
	text-decoration: underline;
	cursor: pointer;
	user-select: none;
}

.dv-checkbox:focus {
	outline: none;
	text-decoration: underline;
}

.input-control {
	display: none;
}

.dv-checkbox > label > .icon-container {
	display:inline-block;
	transform: scale(0.85, 0.85);
	position: relative;
	//top: 0.325em;
	top:-0.25em;
	margin-right:0.25em;
}

.dv-checkbox > label > .icon-container > i {
	border-radius: 4px;
	border: 2px solid transparent;
}

.dv-checkbox:focus > label > .icon-container > i {
	border: 2px solid #aaa;
}


.dv-checkbox > label > i.material-icons {
}

.dv-checkbox > label > .icon-container.toggle {
	transform: scale(1.5, 1.5) !important;
	margin-right:0.75em;
	//top: 0.5em;
	top:-0.25em;
	color: #555555;
}

	/* translateY(0.325em); */

</style>
