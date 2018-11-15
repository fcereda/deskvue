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
		:is-empty="isEmpty"
		@set-focus="setFocus"
	>

		<dv-input-text 
			type="text" 
			:class="inputClass"
			:placeholder="placeholder" 
			:disabled="disabled"
			:color="color"
			:no-border="floating"
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
import props from './props.js'

export default {
	components: {
		dvFormField,
		dvInputText
	},

	props: {
		...props.fieldProps,

		placeholder: {
			type: String,
			required: false
		},

		value: {
			type: String,
			required: true
		}
	},

	computed: {

		isEmpty: function () {
			return !this.value || !this.value.length
		},

		inputClass: function () {
			let classes = ['transparent']
			if (this.floating)
				classes.push('floating')
			if (this.rounded)
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
			let newValue = 	e
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

</style>