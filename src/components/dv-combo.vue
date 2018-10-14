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
	position: relative;

	&.focus {
		z-index: 100 !important;
		box-shadow: 0px 0px 1px 1px $focus-color;
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
		min-height: 31px;
	}

	& > input {
		flex-grow: 2;
	}

	& > .dv-button {
		align-self: stretch;
		height: auto;
		min-width: inherit;
		flex-grow: 1;
	}		

	& > *.border {
		border-left: 1px solid $border-color !important;
		border-right: 1px solid $border-color !important;
	}

	& > *.border-left {
		border-left: 1px solid $border-color !important;
	}

	& > *.border-right {
		border-right: 1px solid $border-color !important;
	}

	& > *.border + *.border,
	& > *.border-right + *.border-left {
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

	& > .dv-iconbutton {
		min-width: 1.825em;
		padding-left: 0.125em;
		padding-right: 0.125em;
	}

	& > *:first-child {
		&.dv-icon,
		&.dv-iconbutton,
		&.material-icons:first-child {
			padding-left: 0.25em;
		}
	}

	& > *:last-child {
		&.dv-icon,
		&.dv-iconbutton,
		&.material-icons:last-child {
			padding-right: 0.1825em;
		}
	}

}




</style>