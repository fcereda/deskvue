<template>

<dv-checkbox 
	type="radio"
	:align="align"
	:display="display"
	:color="color"
	:disabled="disabled"
	:value="thisValue"
	@input="onInput">
	<slot></slot>
</dv-checkbox>	

</template>

<script>

import dvCheckbox from './dv-checkbox.vue'

export default {

	components: {
		dvCheckbox
	},

	props: [ 'id', 'align', 'display', 'color', 'disabled', 'value' ],

	data: function () {
		return {
			thisValue: this.value || false,
			thisId: this.id,
			parent: null,
		}
	},

	watch: {
		value: function () {
			this.thisValue = this.value
		}
	},

	mounted: function () {
		if (this.$parent.addRadio) {
			this.parent = this.$parent
			this.parent.addRadio(this)
		}
	},

	beforeDestroy: function () {
		if (this.parent) {
			this.parent.removeRadio(this)
		}
	},

	methods: {
		onInput: function (e) {
			this.$emit('input', e)
		},

		setValue: function (newValue) {
			this.thisValue = newValue
		},

		setId: function (id) {
			this.thisId = id
		}
	}

}

</script>