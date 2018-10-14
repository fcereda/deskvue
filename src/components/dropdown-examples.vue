<template>

<div>	

	<h3>A few dropdown examples</h3>

	<dv-button 
		ref="mybutton"
		wide
		:active="showDropdown"
		@mousedown.native="onMousedown"
		@click="onClick"
		@keydown.native="onKeydown"
		style="float:right;"
	>A dropdown button <dv-icon :rotate="showDropdown ? 180 : 0">keyboard_arrow_down</dv-icon></dv-button>

	<dv-dropdown 
		anchor="mybutton"
		:show="showDropdown"
		placement="bottom"
		@close="showDropdown = false"
		@show="onShowHide"
		@hide="onShowHide">
		<dv-pane 
			width="20em"
			height="10em"
			elevation="1"
			border
		>Hello World! This is a dropdown pane<br><dv-iconbutton>save</dv-iconbutton></dv-pane>			
	</dv-dropdown>		

</div>

</template>

<script>

import dvDropdown from './dv-dropdown.vue'
import dvButton from './dv-button.vue'
import dvIcon from './dv-icon.vue'
import dvPane from './dv-pane.vue'
import dvIconbutton from './dv-iconbutton.vue'


export default {
	
	components: {
		dvButton,
		dvDropdown,
		dvIcon,
		dvPane,
		dvIconbutton
	},

	data: function () {
		return {
			showDropdown: false
		}
	},

	methods: {
		onMousedown: function (e) {
			this.showDropdown = !this.showDropdown
		},

		onClick: function (e) {
			if (!e.detail) {
				// this is a keyboard generated click event; 
				// we always toggle showDropdown in this case
				this.showDropdown = !this.showDropdown
			}
			this.blockEvent(e)
		},

		blockEvent: function (e) {
			if (!e) 
				return
			e.stopPropagation()
			e.preventDefault()
		},

		onKeydown: function (e) {
			if (e && e.key == 'Escape') {
				this.showDropdown = false
			}
		},

		onShowHide: function (show) {
			console.log('Entrou em onShowHide, show = ' + show)
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

</style>