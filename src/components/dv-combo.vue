<template>

	<div
		class="dv-combo" 
		:class="divClass"
		@focusin="onFocusin"
		@focusout="onFocusout"
	>
	<slot></slot>
	</div>

</template>

<script>

export default {

	data: function () {
		return {
			hasFocus: false
		}
	},

	computed: {

		divClass: function () {
			if (this.hasFocus)
				return 'focus'
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
	//align-items: stretch;
	border: 1px solid $border-color;
	background-color: #fff;
	border-radius: 8px;

	&:focus-within {
		border: 3px solid $focus-color;
	}

	&.focus {
		box-shadow: 0px 0px 1px 1px $focus-color;
	}

	& > * {
		border-color: transparent !important;
		border-radius: 0;
		margin: 0;
	}

	& > .dv-button:not(:active) {
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
		z-index:10;
	}

	& > .material-icons {
		padding-left: 0.125em;
		padding-right: 0.125em;
		font-size: 20px;
		line-height: 160%;
		cursor: default;
		user-select: none;
		opacity: 0.75;
	}

	& > .material-icons:first-child {
		padding-left: 0.25em;
	}

	& > .material-icons:last-child {
		padding-right: 0.1825em;
	}

}




</style>