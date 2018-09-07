<template>

<dv-checkbox 
	type="radio"
	:align="align"
	:color="color"
	:disabled="disabled"
	:value="value"
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

	props: [ 'id', 'align', 'color', 'disabled', 'value' ],

	data: function () {
		return {}
	},

	mounted: function () {
		const parent = this.$parent
		if (parent.addRadio) {
			parent.addRadio(this)
		}
	},

	methods: {
		onInput: function (e) {
			this.$emit('input', e)
		},
	}

}

</script>