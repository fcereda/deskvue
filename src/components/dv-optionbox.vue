<template>

	<dv-form-field
		:display="display"
		:width="width"
		:label="label"
		:floating="floating"
		:rounded="rounded"
		:color="color"
		:info="info"
		:error="error"
		:is-empty="false"
		@set-focus="setFocus"
	>

		<dv-options
			:options="options"
			:type="type"
			:stacked="stacked"
			:option-width="optionWidth"
			full-width
			slim
			:rounded="isRounded"
			:no-border="isFloating"
			class="dv-optionbox-dv-options" 
			ref="input"
			:value="value"
			@input="onInput"
		><slot></slot>
		</dv-options>

	</dv-form-field>

</template>

<script>

import dvFormField from './dv-form-field.vue'
import dvOptions from './dv-options.vue'
import utils from './utils.js'

export default {
	components: {
		dvFormField,
		dvOptions
	},

	props: ['options', 'display', 'width', 'label', 'floating', 'rounded', 'color', 'info', 'error', 'type', 'stacked', 'optionWidth', 'value'],

	computed: {

		isFloating: function () {
			return utils.isPropOn(this.floating)
		},

		isRounded: function () {
			return utils.isPropOn(this.rounded)
		},

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

$margin: 0.25em;

.dv-optionbox-dv-options {
	box-sizing: border-box;
	padding-left: $margin;
	padding-right: $margin;
	min-height: $form-control-height - 0.5em;
}

</style>