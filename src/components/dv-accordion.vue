<template>

	<div class="dv-accordion" :class="divClass">
		<slot></slot>
	</div>

</template>

<script>

import utils from './utils.js'

export default {

	props: ['rounded'],

	data: function () {
	    return {
	    	panes: []
	    }
	},

	computed: {
		divClass: function () {
			return utils.computeClasses({
				rounded: 'rounded'
			}, this)
		}
	},

	mounted: function (e) {
		this.$el.addEventListener('addpane', (e) => {
			console.log('added pane')
			console.log(e)
			console.log(e.title)
		})
	},

	methods: {
		addPane: function (pane) {
			this.panes.push(pane)
			pane.open = false
			pane.rounded = this.rounded
			pane.$on('open', (openPane) => {
				console.log('open collapsible pane event')
				this.panes.forEach(pane => {
					pane.open = (pane == openPane)
				})
			})
		}
	}
}	

</script>

<style lang="scss">

@import './base.scss';

.dv-accordion {

	& > .dv-collapsible-pane:not(:first-child) {
		border-top: 0px solid transparent;
	}	

	&.rounded {

		& > .dv-collapsible-pane:not(:first-child) {
			border-top-left-radius: 0px;
			border-top-right-radius: 0px;

			& > div > div.dv-collapsible-pane-head {
				border-top-left-radius: 0px;
				border-top-right-radius: 0px;
			}
		}	

		& > .dv-collapsible-pane:not(:last-child) {
			border-bottom-left-radius: 0px;
			border-bottom-right-radius: 0px;

		}	

	}
}

</style>