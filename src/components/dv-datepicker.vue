<template>

<date-picker
	v-bind="pickerProps"
	:input-class="inputClass"
	:value="value"
	@input="onInput"
></date-picker>

</template>

<script>

import datePicker from 'vue2-datepicker'
import utils from './utils.js'


export default {
	
	components: {
		datePicker
	},

	props: {
		value: [Date, String, Array],
		rounded: [Boolean, String],
		type: String,
		range: Boolean,
		format: {
			type: String,
			default: 'MM/DD/YYYY'
		},
		rangeSeparator: {
			type: String,
			default: '-'
		},
		lang: {
			type: [String, Object],
			default: 'en'
		},
		clearable: Boolean,
		confirm: Boolean,
		editable: Boolean,
		disabled: Boolean,
		placeholder: {
			type: String,
			default: ''
		},
		width: {
			type: [String, Number],
			default: 200
		},
		notBefore: [String, Date],
		notAfter: [String, Date],
		disabledDays: [Array, Function],
		shortcuts: [Boolean, Array],
		timePickerOptions: Object,
		minuteStep: Number,
		firstDayOfWeek: Number,
		confirmText: String,
		dateFormat: {
			type: String,
			default: 'hh:mm'
		}
	},

	data: function () {
		return {}
	},

	computed: {
		inputClass: function () {
			let classes = ['dv-datepicker-input']
			if (utils.isPropOn(this.rounded))
				classes.push('rounded')
			return classes
		},  

		pickerProps: function () {
			let props = {}
			for (let prop in this.$props) {
				if (prop != 'value') {
					props[prop] = this.$props[prop]
				}	
			}
			console.log(props)
			return props
		}
	},

	mounted: function () {
		let mxInputAppendElement = this.$el.getElementsByClassName('mx-input-append')
		mxInputAppendElement[0].innerHTML = '<i class="material-icons dv-datepicker-icon">today</i>'
	},

	methods: {
		onInput: function (e) {
			this.$emit('input', e)
		}
	}


}

</script>

<style lang="scss">

@import './base.scss';

.mx-input {
    position: relative;
    display: inline-block;
    width: 210px;
    color: #73879c;
    font-size: $font-size;
}

.dv-datepicker-input {
   display: inline-block;
    width: 100%;
    height: $form-control-height;
    padding: 6px 30px;
    padding-left: 10px;
    font-size: $font-size;
    line-height: 1.4;
    background-color: #fff;
    border: $border;
    border-radius: $border-radius;
}

.dv-datepicker-input.rounded {
	border-radius: $border-radius-rounded;
}

.dv-datepicker-input:focus {
	box-shadow: $box-shadow-focus;
	border-color: $focus-color;
	outline: none;
}

.mx-calendar {
	color: #333;
}

.dv-datepicker-icon {
	font-size: 20px;
	color: #555;
}

</style>