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

	props: ['anchor', 'placement', 'show', 'closeOnEsc'],

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
		}
	},

	mounted: function () {
		let anchor = this.$parent.$refs[this.anchor].$el
		let popup = this.$el
		this.popper = new Popper(anchor, popup, {
			placement: this.placement || 'bottom-start',
		})
		this.windowClickEvent = () => {
			if (this.show) {
				this.$emit('close')
			}				
		}
		document.addEventListener('click', this.windowClickEvent)
	},

	beforeDestroy: function () {
		document.removeEventListener('click', this.windowClickEvent)
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