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

	<br><br>

	Changing the anchor of a dropdown:

	<div 
		ref="anchorleft"
		@click="setAnchorAndShow('anchorleft')"
		style="padding-left:40px;float:left"
	>First anchor</div>
	<div 
		ref="anchorright"
		@click="setAnchorAndShow('anchorright')"
		style="margin-right:40px;float:right"
	>Second anchor</div>

	<dv-dropdown
		:anchor="linkAnchor"
		:show="showDropdown2"
		@close="showDropdown2 = false"
	>
		<dv-pane 
			width="10em"
			height="5em"
			elevation="1"
			border
			style="padding:10px;"
		>Movable dropdown</dv-pane>
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
			showDropdown: false,
			showDropdown2: false,
			linkAnchor: 'anchorleft'
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
		},

		setAnchorAndShow: function (anchor) {
			this.$nextTick(() => {
				this.linkAnchor = anchor
				this.showDropdown2 = true
			})
		}
	}

}

</script>

<style lang="scss">

@import './base.scss';

</style>