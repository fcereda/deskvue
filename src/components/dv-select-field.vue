<template>

	<dv-form-field
		:display="display"
		:width="width"
		:label="label"
		:message="message"
		:floating="floating"
		:rounded="rounded"
		:color="color"
		:is-empty="isEmpty"
		:disabled="disabled"
		:required="required"
		@set-focus="setFocus"
	>

		<dv-input-select 
			:multiple="multiple" 
			:search="search"
			:rounded="rounded"
			:no-border="floating"
			class="dv-input-select" 
			:placeholder="placeholder"
			:disabled="disabled" 
			:value="value"
			ref="input"
			@input="onInput"
		><slot></slot>
		</dv-input-select>

	</dv-form-field>

</template>

<script>

import dvFormField from './dv-form-field.vue'
import dvInputSelect from './dv-input-select.vue'

import utils from './utils.js'
import props from './props.js'

export default {
	components: {
		dvFormField,
		dvInputSelect
	},

	props: {
		...props.fieldProps,

		multiple: {
			type: Boolean,
			default: false
		},

		search: {
			type: Boolean,
			default: false
		},

		value: {
			type: [Array, Object, String],
		}
	},	

	computed: {
		isEmpty: function () {
			if (!this.value)
				return false
			if (typeof this.value == 'object' && !this.value.length)
				return false
			return true
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
			let newValue = 	e.target.value
			this.$emit('input', newValue)
		},

		setFocus: function () {
			this.$refs.input.$el.focus()
		}

	},

	mounted: function () {
		console.log(this)
	}

}

</script>

<style lang="scss">

@import './base.scss';


$input-select-height: $form-control-height - 0.075em - 0.032em;


.dv-input-select {
	font-size: $font-size;
	min-height: $input-select-height;	
}

.dv-input-select {
	background-color: transparent;
}

input.dv-input-select.floating:focus {
    outline: 2px solid transparent; 
}  

input.dv-input-text.rounded {
	border-radius:8px;
}



</style>