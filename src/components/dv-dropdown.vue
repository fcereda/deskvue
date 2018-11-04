<template>

	<div 
		class="dv-dropdown"
		:style="paneStyle"
		@click="blockEvent"
		@keydown="onKeydown"> 
		<slot></slot>
	</div>

</template>

<script>

import utils from './utils.js'
import Popper from 'popper.js'

export default {

	props: {
		anchorRef: String,
		anchorId: String,
		anchorName: String,
		placement: String,
		show: Boolean,
		closeOnEsc: Boolean,
		closeOnClick: {
			type: Boolean,
			default: true
		},
		offsetX: {
			type: [String, Number]
		},
		offsetY: {
			type: [String, Number],
		}
	},

	data: function () {
		return {
			popper: null,
			windowClickEvent: null
		}
	},

	computed: {
		paneStyle: function () {
			let styles = []
			if (this.show) {
				if (this.popper)
					this.popper.update()
				styles.push('display:inline-block;')
			}
			if (this.offsetX) {
				if (parseInt(this.offsetX) > 0)
					styles.push(`margin-left:${this.offsetX};`)
				else {
					styles.push(`margin-left:${this.offsetX};`)
					styles.push(`margin-right:${-parseInt(this.offsetX)}px;`)
				}
			}
			if (this.offsetY) {
				styles.push(`margin-top:${this.offsetY};`)
				if (parseInt(this.offsetY) > 0)
					styles.push(`margin-top:${this.offsetY};`)
				else {
					styles.push(`margin-top:${this.offsetY};`)
					styles.push(`margin-bottom:${-parseInt(this.offsetY)}px;`)
				}
			}
			return styles.join('')
		}
	},

	watch: {
		show: function (e) {
			const show = !!this.show
			this.$emit(show ? 'show' : 'hide', show)
		},

		anchor: function () {
			this.popper.destroy()
			this.popper = null
			this.createPopper()
		}
	},

	mounted: function () {
		setTimeout(() => {
			this.popper = this.createPopper()
			this.windowClickEvent = () => {
				if (!this.closeOnClick) {
					return
				}
				if (this.show) {
					this.$emit('close')
				}				
			}
			document.addEventListener('click', this.windowClickEvent)
		})
	},

	beforeDestroy: function () {
		document.removeEventListener('click', this.windowClickEvent)
		this.popper.destroy
		this.popper = null
	},

	methods: {
		blockEvent: function (e) {
			if (!e) 
				return
			e.stopPropagation()
			e.preventDefault()
		},

		onKeydown: function (e) {
			// NOT WORKING!!
			if (!utils.isPropOn(this.closeOnEsc))
				return
			if (e && e.key == 'Escape') {
				this.$emit('close')
				this.blockEvent(e)
			}	
		},

		createPopper: function () {
			let anchor = this.getAnchorElement()
			let popup = this.$el
			if (!anchor) {
				throw 'Error in dv-dropdown: anchor prop is not valid'
			}	
			this.popper = new Popper(anchor, popup, {
				placement: this.placement || 'bottom-start',
			})
			return this.popper
		},

		getAnchorElement: function () {
			let anchor = null
			let parent = this.$parent
			let parentEl = parent.$el ? parent.$el : parent
			if (this.anchorRef)	{
				anchor = parent.$refs[this.anchorRef]
				if (anchor)
					return anchor
			}	
			if (this.anchorId) {
				anchor = parentEl.getElementById(this.anchorId)
				if (anchor)
					return anchor
			}
			if (this.anchorName) {
				anchor = parentEl.querySelectorAll(`[data-name='${this.anchorName}']`)
				if (anchor) {
					if (anchor[0])
						return anchor[0]
					return anchor
				}	
			}

			return null
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-dropdown {
	display: none;
	background-color:white;
	z-index:110;
}

</style>