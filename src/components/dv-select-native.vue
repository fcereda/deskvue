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

import utils from './utils.js'

export default {

	props: ['disabled', 'rounded', 'width', 'value'],

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
			if (this.width)
				return `width:${this.width};`
			return ''
		},

	},

	methods: {
		onInput: function (e) {
			console.log('entrou em onInput')
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
    background-color: #fff;
    color: #222;
	border: 1px solid $border-color;    
	border-radius: $border-radius;
    line-height: 150%;
    cursor: pointer;
    user-select: none;
    font-family: inherit;
    font-size: $font-size;
    height: $form-control-height;
    position: relative;

    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z' fill='#555'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E") no-repeat right;
    -webkit-appearance: none;

    &:focus {
    	outline: none;
    	box-shadow: 0px 0px 1px 1px $color-primary;
    	z-index: 100;
    }	

    &.rounded {
    	border-radius: 8px;
    }
}

</style>