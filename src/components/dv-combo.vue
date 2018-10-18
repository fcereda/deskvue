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

	props: ['width', 'rounded', 'slim'],

	data: function () {
		return {
			hasFocus: false
		}
	},

	computed: {

		divClass: function () {
			return utils.computeClasses({
				rounded: 'rounded',
				focus: this.hasFocus,
				slim: 'slim'
			}, this)
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
	border-radius: $border-radius;
	vertical-align: text-top;
	position: relative;

	&:hover {
		z-index: 100;
	}	

	& > *.first-child {
		border-left-radius: $border-radius;
	}

	& > *:last-child {
		border-right-radius: $border-radius;
	}

	&.rounded {
		border-radius: $border-radius-rounded;

		& > *:first-child {
			border-top-left-radius: $border-radius-rounded;
			border-bottom-left-radius: $border-radius-rounded;
		}

		& > *:last-child {
			border-top-right-radius: $border-radius-rounded;
			border-bottom-right-radius: $border-radius-rounded;
		}
	}

	&.focus {
		z-index: 100 !important;
		box-shadow: 0px 0px 1px 1px $focus-color;
	}

	& > * {
		border-color: transparent !important;
		border-radius: 0;
		margin: 0;

		&:hover {
			position:relative;
			z-index: 100;
		}	
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

		&:not(:first-child) {
			border-left: $border !important;
		}	

		&:not(:last-child) {
			border-right: $border !important;
		}	
	}

	& > *.border-left {
		border-left: $border !important;
	}

	& > *.border-right {
		border-right: $border !important;
	}

	& > *.border + *.border,
	& > *.border-right + *.border-left,
	& > *.border-right + *.border {
		border-left-width: 0 !important;
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