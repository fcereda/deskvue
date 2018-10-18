<template>

<date-picker
	v-model="value"

	:range="range"
	format="DD/MM/YYYY"
	lang="en"
	placeholder=""
	input-class="dv-datepicker-input"
></date-picker>

</template>

<script>

import datePicker from 'vue2-datepicker'

export default {
	
	components: {
		datePicker
	},

	props: ['range', 'value'],

	data: function () {
		return {}
	},

	mounted: function () {
		let mxInputAppendElement = this.$el.getElementsByClassName('mx-input-append')
		mxInputAppendElement[0].innerHTML = '<i class="material-icons dv-datepicker-icon">today</i>'
		return


		let iconElement = this.$el.getElementsByClassName('mx-calendar-icon')
		console.log(iconElement[0])
		//return
		icon
		iconElement[0].innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>'
		console.log(iconElement[0])
	},

	methods: {
		onInput: function (e) {
			console.log(e)
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
    /* color: #555; */
    background-color: #fff;
    border: $border;
    border-radius: $border-radius-rounded;
/*    
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
*/    
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
	font-size:20px;
	color: #555;
}

</style>