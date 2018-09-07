<template>
<span tabindex="0" class="dv-checkbox" @click="onClick">
	<label :class="labelClass" style="display:inline-block;text-align:left;height:auto;margin:0;padding:0;">
		<i class="material-icons" :class="iconClass">{{ icon }}</i>
		<slot></slot>
	</label>
</span>
</template>

<script>

import utils from './utils.js'

export default {

	props: ['value', 'disabled', 'color', 'allow-indeterminate'],

	data: function () {
		return {}
	},

	computed: {

		icon: function () {
			if (this.value > 0)
				return 'check_box'
			if (this.value < 0)
				return 'indeterminate_check_box'
			return 'check_box_outline_blank'
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
		}

	},

	methods: {

		onClick: function () {
			let newValue = this.value
			if (utils.isPropOn(this.allowIndeterminate))
				newValue = [0, 1, -1][newValue+1]
			else
				newValue = !newValue
			this.$emit('input', newValue)
		}

	}

}

</script>

<style>

@import './base.scss';

.dv-checkbox {
	//display: inline-block;
	text-align: left;
	background-color: yellow;
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

.dv-checkbox > label > i.material-icons {
	transform: scale(0.85, 0.85) translateY(0.325em);
	padding-right:0.25em;
}

</style>
