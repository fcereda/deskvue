<template>

	<div 
		class="dv-dropdown-container"
		@click="blockClick">
		<dv-combo 
			ref="parent"
			:rounded="rounded"
		>
			<div @click="toggleDisplay"><slot name="head"></slot></div>
			<dv-iconbutton 
				:rotate="display ? 180 : 0"
				@click="toggleDisplay"
			>keyboard_arrow_down</dv-iconbutton>
		</dv-combo>	
		<div 
			ref="popup"
			class="dv-dropdown-pane"
			:style="paneStyle"> 
			<slot name="pane" @close="display=false"></slot>
		</div>
	</div>	

</template>

<script>

import utils from './utils.js'
import dvCombo from './dv-combo.vue'
import dvIconbutton from './dv-iconbutton.vue'
import Popper from 'popper.js'

export default {

	props: ['rounded'],

	components: {
		dvCombo,
		dvIconbutton
	},
	
	data: function () {
		return {
			display: false,
			popper: null,
			windowClickEvent: null
		}
	},

	computed: {
		paneStyle: function () {
			if (this.display) 
				return 'display:inline-block;'
		}
	},

	mounted: function () {
		let {parent, popup} = this.$refs
		parent = parent.$el
		this.popper = new Popper(parent, popup, {
			placement: 'bottom-start',
		})
		this.windowClickEvent = () => {
			this.display = false
		}
		document.addEventListener('click', this.windowClickEvent)
	},

	beforeDestroy: function () {
		document.removeEventListener('click', this.windowClickEvent)
		this.popper = null
	},

	methods: {
		toggleDisplay: function () {
			this.display = !this.display
		},

		blockClick: function (e) {
			e.stopPropagation()
			e.preventDefault
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-dropdown-container {
	display: inline-block;
}

.dv-dropdown-pane {
	display: none;
	border: 1px solid rgba(0,0,0,0.125);
	border-color: $border-color;
	padding: 0.5em;
	background-color: white;
	color: #333;
	z-index:101;
}

</style>