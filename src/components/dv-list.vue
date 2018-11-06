<template>

	<ul 
		class="dv-list"
		:class="listClass"
		:style="listStyle"
		tabindex="0"
		@focus="onFocus"
		@blur="onBlur"
		@mouseover="onMouseover"
		@mouseleave="onMouseleave"
		@keydown="onKeydown"
		@click="onClick"
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
		return {
			listItems: [],
			focusedItem: null,
			hasFocus: false
		}
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
	},

	watch: {

	}, 

	mounted: function () {
		this.computeListItems()
	},

	methods: {
		computeListItems: function () {
			this.listItems = this.$children.filter(component => component.$el.classList.contains('dv-list-item') && !component.disabled)
		},

		getTargetItem: function (e) {
			let targetElement = e.path.find(element => element.classList.contains('dv-list-item'))
			let targetItem = this.listItems.find(item => item.$el == targetElement)
			return targetItem
		},

		scrollItemIntoView (item) {
			let itemRect = item.$el.getBoundingClientRect()
			let itemTop = itemRect.top
			let itemBottom = itemTop + itemRect.height
			while (item.$parent) {
				let parent = item.$parent.$el
				let parentRect = parent.getBoundingClientRect()
				let parentTop = parentRect.top
				let parentBottom = parentTop + parentRect.height
				if (itemTop < parentTop) {
					let delta = parentTop - itemTop
					parent.scrollTop = parent.scrollTop - delta
				}
				else if (itemBottom > parentBottom) {
					let delta = itemBottom - parentBottom
					parent.scrollTop = parent.scrollTop + delta
				}
				item = item.$parent
			}

		},

		setFocusOnItem: function (item) {
			this.clearFocus(false)
			item.$el.classList.add('focus')
			this.focusedItem = item
		},

		clearFocus: function (clearFocusedItem) {
			if (this.focusedItem) {
				this.focusedItem.$el.classList.remove('focus')
				if (clearFocusedItem) {
					this.focusedItem = null
				}
			}
		},

		onFocus: function (e) {
			setTimeout(() => {
				if (!this.focusedItem) {
					if (this.listItems.length) {
						this.setFocusOnItem(this.listItems[0])
						this.hasFocus = true
					}
					else {
						return
					}
				}
			}, 50)
		},

		onBlur: function (e) {
			this.clearFocus(false)
			this.hasFocus = false
		},

		onMouseover: function (e) {
			let targetItem = this.getTargetItem(e)
			if (targetItem) {
				this.setFocusOnItem(targetItem)
			} 
		},

		onMouseleave: function (e) {
			// Mouseleave does not bubble; it is only triggered 
			// when the mouse leaves this.$el
			if (e.target != this.$el) {
				// Just making sure we're not doing anything silly...	
				return
			}	
			if (!this.hasFocus) {
				this.onBlur()
			}
		}, 

		onKeydown: function (e) {
			if (!['ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter', ' '].includes(e.key))
				return
			let indexFocusedItem = this.listItems.indexOf(this.focusedItem)
			switch (e.key) {
				case 'ArrowUp':
					indexFocusedItem -= 1
					break
				case 'ArrowDown':
					indexFocusedItem += 1
					break
				case 'Home':
					indexFocusedItem = 0
					break
				case 'End':
					indexFocusedItem = this.listItems.length - 1
					break;
				case 'Enter':
				case ' ':
					this.$emit('click', this.focusedItem)
					e.preventDefaut()
				default:
					return			
			}
			if (indexFocusedItem < 0) {
				indexFocusedItem = this.listItems.length - 1
			}
			else if (indexFocusedItem >= this.listItems.length) {
				indexFocusedItem= 0
			}
			let newFocusedItem = this.listItems[indexFocusedItem]
			this.setFocusOnItem(newFocusedItem)
			this.scrollItemIntoView(newFocusedItem)
			e.preventDefault()
		},

		onClick: function (e) {
			let clickedItem = this.getTargetItem(e) 
			this.$emit('click', clickedItem)
			if (clickedItem) {
				this.setFocusOnItem(clickedItem)
				this.hasFocus = true
			}
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

	& > .dv-list-label:first-child {
		padding-top: 0.5em;
	}	

	&.border {
		border: 1px solid $border-color;
		border-radius: 0;
	}

	&.divider {
		& > .dv-list-item + .dv-list-item {
			border-top: 1px solid $border-color;
		}

		& > .dv-list-item + .dv-list-label {
			border-top: 1px solid $border-color;
		}
	}	
	
	&.rounded {
		border-radius: $border-radius-rounded;
	}	

}

</style>