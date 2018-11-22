<template>

	<select 
		class="dv-select"
		:class="selectClass"
		:style="selectStyle"
		:disabled="disabled"
		@input="onInput"
		:value="value"
	><slot></slot>
	</select>
	
</template>

<script>

import props from './props.js'
import utils from './utils.js'

export default {

	props: {
		...props.selectProps,

		value: {
			type: [Array, Object, String],
			required: false
		}
	}, 

	data: function () {
	    return {}
	},

	computed: {
		selectClass: function () {
			if (utils.isPropOn(this.rounded))
				return 'rounded'
			return ''
		},

		selectStyle: function () {
			let styles = utils.computeColorStyle(this.color)
			if (this.width)
				styles = styles + `width:${this.width};`
			return styles
		},

	},

	methods: {
		onInput: function (e) {
			this.$emit('input', e.target.value)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

select.dv-select {
	box-sizing:border-box;
    padding-left: 0.4em;
    padding-right: 0.5em;
    color: #222;
	border: $border;    
	border-radius: $border-radius;
	box-shadow: $box-shadow;
    line-height: 150%;
    cursor: pointer;
    user-select: none;
    font-family: inherit;
    font-size: $font-size;
    height: $form-control-height;
    position: relative;

    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z' fill='#555'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E") no-repeat right;
    -webkit-appearance: none;
    background-color: white;    

    &:focus {
    	outline: none;
    	border: $border-focus;
    	box-shadow: $box-shadow-focus;
    	z-index: 100;
    }	

    &.rounded {
    	border-radius: 8px;
    }
}

</style>