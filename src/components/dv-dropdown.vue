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
		anchor: String,
		placement: String,
		show: Boolean,
		closeOnEsc: Boolean,
		closeOnClick: {
			type: Boolean,
			default: true
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
			if (this.show) {
				this.popper.update()
				return 'display:inline-block;'
			}
			return ''
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
			if (!this.anchor)
				return null
			let anchor = this.$parent.$refs[this.anchor]
			if (anchor.$el) {
				anchor = anchor.$el // We want the element, not the Vue component
			}
			return anchor
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