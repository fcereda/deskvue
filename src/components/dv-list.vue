<template>

	<ul 
		class="dv-list"
		:class="listClass"
		:style="listStyle"
	><slot></slot>
	</ul>	

</template>

<script>

import utils from './utils.js'

export default {
	props: {
		border: Boolean,
		rounded: Boolean,
		divider: {
			type: Boolean,
			default: false
		},
		width: String,
	},

	data: function () {
		return {}
	},

	computed: {
		listClass: function () {
			return utils.computeClasses({
				border: this.border,
				rounded: this.rounded,
				divider: this.divider
			},this)
		},

		listStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

ul.dv-list {

	margin: 0;
	overflow: hidden;

	& > li {
		margin: 0;
	}

	&.border {
		border: 1px solid $border-color;
		border-radius: 0;

		& > .dv-list-label:first-child {
			padding-top: 0.5em;
		}	

		&.divider {
			& > .dv-list-item + .dv-list-item {
				border-top: 1px solid $border-color;
			}

			& > .dv-list-item + .dv-list-label {
				border-top: 1px solid $border-color;
			}
		}	
	}
	
	&.rounded {
		border-radius: $border-radius-rounded;
	}	

}

</style>