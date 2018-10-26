<template>

	<div class="dv-accordion" 
		:class="divClass"
		@keydown="onKeydown"
	>
		<slot></slot>
	</div>

</template>

<script>

import utils from './utils.js'

export default {

	props: ['rounded'],

	data: function () {
	    return {
	    	panes: [],
	    	indexOpenPane: -1
	    }
	},

	computed: {
		divClass: function () {
			if (utils.isPropOn(this.rounded))
				return 'rounded'
			return ''
		}
	},

	mounted: function (e) {
		this.$children.forEach(pane => {
			this._addPane(pane)
		})
		return
	},

	methods: {
		addPane: function (pane) {
			console.log('Bogus addpane')
		},

		_addPane: function (pane) {
			this.panes.push(pane)
			pane.closePane()
			pane.setRounded(this.rounded)
			pane.$on('open', (openedPane) => {
				this.panes.forEach((pane, index) => {
					if (pane == openedPane) {
						pane.openPane()
						this.indexOpenPane = index
					}
					else {
						pane.closePane()
					}
				})
			})
			pane.$on('close', (closedPane) => {
				closedPane.closePane()
			})
		},

		onKeydown: function (e) {
			console.log(e)
			const indexFocusedElement = this.panes.map(pane => pane.$el).indexOf(e.srcElement)
			let index = indexFocusedElement
			switch (e.key) {
				case 'ArrowUp':
					index -= 1
					break;
				case 'ArrowDown':
					index += 1
					break
				case 'Home':
					index = 0
					break
				case 'End':
					index = this.panes.length - 1
					break
				default:
					return	
			}
			if (index < 0) {				
				index = this.panes.length - 1
			}	
			else if (index >= this.panes.length) {
				index = 0
			}
			this.panes[index].focus()

			e.stopPropagation()
			e.preventDefault()
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