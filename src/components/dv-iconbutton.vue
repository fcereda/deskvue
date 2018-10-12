<template>

	<button 
		class="dv-iconbutton" 
		:class="buttonClass"
	><i class="material-icons"><slot></slot></i></button>

</template>

<script>

import utils from './utils.js'

export default {

	props: ['disabled', 'slim', 'flat', 'link'],

	data: function () {
		return {
			
		}
	},

	computed: {
		buttonClass: function () {
			return utils.computeClasses({
				slim: 'slim',
				flat: 'flat',
				link: 'link'
			}, this)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

$icon-size: 20px;
$button-height: 2.25em;

$icon-color: #2c3e50;

$button-active-shadow: inset 0px 1px 1px 1px rgba(64, 64, 64, 0.5);
$button-active-transform: translateY(1px);

.dv-iconbutton {
	display: inline-block;
	font-size: $font-size;
	background-color: transparent;
	border:1px solid transparent;
	border-radius:50%;
	min-width: $form-control-height;
	min-height: $form-control-height;
	line-height: $form-control-height - 0.0625em;
	text-align: center;
	vertical-align: center;
	user-select: none;
	cursor: pointer;
	color: $icon-color;
	padding: 0;

	&.slim {
		min-width: 26px;
		min-height: 26px;
		line-height: 24px;
	}

	& > .material-icons {
		font-size: $icon-size;
		display: inline-block;
		vertical-align: middle;
	}			

	&:hover {
		box-shadow: 0px 1px 1px 1px rgba(64, 64, 64, 0.5);
		z-index:101;
	}

	&.flat:hover {
		box-shadow: none;
		background-color: #eee;
	}

	&.link:hover {
		box-shadow: none;
	}

	&:focus {
		outline: none;
		box-shadow: 0px 0px 1px 2px rgba(64, 64, 64, 0.25);
		z-index:100;
	}

	&.link:focus {
		box-shadow: none;
		color: $color-primary;		
	}		

	&:active {
		box-shadow: $button-active-shadow;
		transform: $button-active-transform;
	}

	&.flat:active {
		background-color: #ccc;
	}

	&.link:active {
		box-shadow: none;
	}

}

</style>