<template>

	<div
		class="dv-combo" 
		:class="divClass"
		:style="divStyle"
		@focusin="onFocusin"
		@focusout="onFocusout"
	>
	<slot></slot>
	</div>

</template>

<script>

import utils from './utils.js'

export default {

	props: ['width', 'slim'],

	data: function () {
		return {
			hasFocus: false
		}
	},

	computed: {

		divClass: function () {
			return utils.computeClasses({
				focus: this.hasFocus,
				slim: utils.isPropOn(this.slim)
			}	)
		},

		divStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}

	},

	methods: {
		onFocusin: function (e) {
			if (e.srcElement.nodeName == 'INPUT') {
				this.hasFocus = true
			}	
		},

		onFocusout: function () {
			this.hasFocus = false
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-combo {
	display: inline-flex;
	align-items: center;
	border: 1px solid $border-color;
	background-color: #fff;
	border-radius: 8px;
	vertical-align: text-top;

	&.focus {
		box-shadow: 0px 0px 1px 1px $focus-color;
		z-index: 100;
	}

	& > * {
		border-color: transparent !important;
		border-radius: 0;
		margin: 0;
	}

	&.slim > * {
		height: auto !important;
	}

	&:not(.slim) > .dv-button:not(:active) {
		height: 31px;
	}

	& > *.border {
		border-left-color: $border-color !important;
		border-right-color: $border-color !important;
	}

	& > *.border + *.border {
		border-left-width: 0;
	}

	& > *:focus {
		z-index:100;
	}

	& > .dv-iconbutton {
		border-radius: 0px;
	}

	&.slim > .dv-iconbutton {
		min-height: 0;
		line-height:100%;
	}

	& > *:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		border-left-width: 0;
	}

	& > *:last-child {
		border-top-right-radius: 8px !important;
		border-bottom-right-radius: 8px !important;
		border-right-width: 0;
	}

	& > input:focus {
		outline: none !important;
	}

	& > .dv-icon,
	& > .material-icons {
		padding-left: 0.125em;
		padding-right: 0.125em;
		font-size: 20px;
		cursor: default;
		user-select: none;
		opacity: 0.75;
	}

	& > .dv-icon,
	& > .material-icons:first-child {
		padding-left: 0.25em;
	}

	& > .dv-icon,
	& > .material-icons:last-child {
		padding-right: 0.1825em;
	}


}




</style>