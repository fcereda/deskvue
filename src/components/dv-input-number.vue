<template>

	<dv-combo
		class="dv-input-number"
		:class="comboClass"
		:width="width"
	>

		<dv-input-text
			class="dv-input-text dv-input-number-text"
			no-border
			:value="strValue"
			:rounded="rounded"
			@keydown.native="onKeydown"
			@input="onInput"
		></dv-input-text>
		<dv-iconbutton flat @click="addToValue(-step)">remove</dv-iconbutton>
		<dv-iconbutton flat @click="addToValue(step)">add</dv-iconbutton>

	</dv-combo>

</template>

<script>

import dvCombo from './dv-combo.vue'
import dvIconbutton from './dv-iconbutton.vue'
import dvInputText from './dv-input-text.vue'
import utils from './utils.js'

function validateNumberProp (propValue) {
	return utils.isNumeric(propValue)
}

export default {

	components: {
		dvCombo,
		dvIconbutton,
		dvInputText
	},

	props: {
		placeholder: {
			type: String,
			default: null
		}, 
		rounded: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: ''
		},
		min: {
			type: [String, Number],
			default: -Infinity,
			validator: validateNumberProp
		},
		max: {
			type: Number,
			default: Infinity
		},
		step: {
			type: Number,
			default: 1
		},
		value: {
			type: Number,
			default: null
		}
	},

	data: function () {
		return {
			strValue: this.valueToStr,
			isError: false,
			setErrorHandler: null
		}
	},

	computed:{
		comboClass: function () {
			if (this.isError) {
				// This should be replaced with :color="error" in the dv-combo declaration
				return 'dv-input-number-error'
			}		 
			return ''
		},

		valueToStr: function () {
			if (!this.value)
				return ''
			return this.value.toString()
		},

		nMin: function () {
			return Number(this.min)
		},

		nMax: function () {
			return Number(this.max)
		},

		nStep: function () {
			return Number(this.step)
		}
	},

	methods: {
		onKeydown: function (e) {
			if (e.keyCode < 45)  // keyCode 45 == '0'
				return 
			if (e.key.match(/[\de\+\-\.\,]/))
				return
			e.preventDefault()
		},

		onInput: function (e) {
			if (!e) {
				this.$emit('input', null)
				return
			}
			let newValue = e
			this.strValue = newValue
			let isError = !utils.isNumeric(newValue)  
			if (isError) {
				this.$emit('input', NaN)
				this.setError(isError)
				return
			}
			newValue = parseFloat(newValue)
			if (newValue < Number(this.min)) {
				newValue = null
			}
			else if (newValue > Number(this.max)) {
				newValue = null
			}
			if (newValue === null) {
				isError = true
			}
			this.$emit('input', newValue)
			this.setError(isError)
		},

		addToValue: function (delta) {
			let newValue = this.value
			let _delta = Number(delta)
			let min = Number(this.min)
			let max = Number(this.max) 

			if (!newValue) {
				if (_delta > 0) {
					newValue = min
				}
				else {
					newValue = max
				}
			}
			else {
				newValue += _delta
				if (newValue < this.min) {
					newValue = this.min
				}
				else if (newValue > this.max) {
					newValue = this.max
				}
			}	
			this.isError = false
			this.strValue = newValue.toString()
			this.$emit('input', newValue)
		},

		setError: function (error) {
			const ERROR_WAIT = 1000
			if (this.setErrorHandler)
				clearTimeout(this.setErrorHandler)
			if (!error) {
				this.isError = false
				return
			}
			this.setErrorHandler = setTimeout(() => {
				this.isError = true
				this.$emit('error')
			}, ERROR_WAIT)
		}

	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-input-number > .__dv_input_text:focus {
	border-color: transparent !important;
}
/*
.dv-input-number-text:focus {
	box-shadow: 0px 0px 1px 1px transparent !important;
}
*/
.dv-input-number.focus > .dv-input-number-text {
	outline-color: transparent;
}

.dv-input-number-error {
	border-color: $color-error;
} 

.focus.dv-input-number-error {
	box-shadow: 0px 0px 1px 1px $color-error;
}


</style> 
