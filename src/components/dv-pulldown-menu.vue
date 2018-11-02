<template>

	<ul class="dv-pulldown-menu">
		<li 
			v-for="item in items"
			class="dv-pulldown-menu-item"
			:class="menuItemClass(item)"
			:style="menuItemStyle(item)"
			:key="item.text"
			:data-name="item.text"
			@click="onClickMenuItem(item, $event)"
			@keydown="onKeydown"
		>
			<span v-if="item.iconBefore" class="dv-icon-before"><dv-icon>{{ item.iconBefore }}</dv-icon></span>
			<span v-html="item.text"></span>
			<span v-if="item.iconAfter" class="dv-icon-after"><dv-icon>{{ item.iconAfter }}</dv-icon></span>
		<dv-dropdown 
			:anchor-name="item.text"
			offset-x="1px"
			close-on-esc
			:show="currentActiveItem == item"
			@close="currentActiveItem = false">
			<div class="dv-pulldown-submenu">
				<dv-menu
					:items="item.submenu"
					size="medium"
					:ref="menuRef(item)"
					@click="currentActiveItem = null"
					@keydown.native="onKeydownSubmenu"
				></dv-menu>	
			</div>
		</dv-dropdown>
		</li>		
	</ul>

</template>

<script>

import dvDropdown from './dv-dropdown.vue'
import dvIcon from './dv-icon.vue'
import dvMenu from './dv-menu.vue'
import dvToolbarSection from './dv-toolbar-section.vue'
import utils from './utils.js'


export default {
	components: {
		dvDropdown,
		dvIcon,
		dvMenu,
		dvToolbarSection
	},

	props: {
		items: {
			type: Array,
			default: {},
		},
		noBorder: {
			type: Boolean,
			default: false
		},
		permanentBorder: {
			type: Boolean,
			default: false
		}	
	},

	data:function () {
		return {
			currentActiveItem: null
		}	
	},

	computed: {
		enabledItems: function () {
			return this.items.filter(item => !item.disabled)
		} 
	},

	methods: {
		menuItemClass: function (menuItem) {
			let classes = []
			if (menuItem.disabled)
				return 'disabled'
			if (utils.isPropOn(this.noBorder) || menuItem.noBorder)
				classes.push('no-border')
			if (utils.isPropOn(this.permanentBorder) || menuItem.permanentBorder)
				classes.push('permanent-border')
			if (menuItem == this.currentActiveItem)
				classes.push('active')
			return classes
		},

		menuItemStyle: function (menuItem) {
			let styles = []
			if (menuItem.iconBefore) {
				styles.push('padding-left:8px')
			}
			if (menuItem.iconAfter) {
				styles.push('padding-right:8px;')
			}
			return styles.join('')
		},

		menuRef: function (menuItem) {
			return 'menu_' + menuItem.text
		},

		selectMenuItem: function (menuItem) {
			if (menuItem == this.currentActiveItem) {
				// User clicked on an already open menu item
				this.currentActiveItem = null
				return
			}
			this.currentActiveItem = menuItem
			this.$nextTick(() => {
				let menuItemRef = this.menuRef(menuItem)
				let menuComponent = this.$refs[menuItemRef]
				if (menuComponent.length) {
					menuComponent = menuComponent[0]
				}
				menuComponent.focus()
			})	
		},

		onClickMenuItem: function (menuItem, e) {
			e.preventDefault()
			e.stopPropagation()
			if (menuItem.disabled)
				return
			this.selectMenuItem(menuItem)
		},

		onKeydown: function (e) {
			console.log(e.key)
			let indexActiveMenu = this.enabledItems.indexOf(this.currentActiveItem)
			if (indexActiveMenu < 0) {
				return 
			}
			switch (e.key) {
				case 'ArrowLeft':
					indexActiveMenu -= 1
					break
				case 'ArrowRight': 
					indexActiveMenu += 1
					break
				case 'Home':
					indexActiveMenu = 0
					break
				case 'End':
					indexActiveMenu = this.enabledItems.length - 1
					break
				default:
					return
			}
			if (indexActiveMenu < 0) {
				indexActiveMenu = this.enabledItems.length - 1
			}
			else if (indexActiveMenu >= this.enabledItems.length) {
				indexActiveMenu = 0
			}
			this.selectMenuItem(this.enabledItems[indexActiveMenu])
			
			e.preventDefault()
			e.stopPropagation()
		},

		onKeydownSubmenu: function (e) {
			if (e.key == 'Home' || e.key == 'End')
				return
			this.onKeydown(e)
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-pulldown-menu {

}

.dv-pulldown-menu-item {
    list-style-type: none;  
    margin-left: 0px;
    user-select:none;  

	display: inline-block;
	line-height: 44px;
	padding-left: 12px;
	padding-right: 12px;

	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	border-bottom: 1px solid $border-color;

	&.permanent-border {
		border-left-color: $border-color;
		border-right-color: $border-color;
	}

	&:hover {
		color: $color-primary;
	}	

	&.disabled {
		color: $color-disabled;
	}

	&.active {
		color: $color-primary;
		border-bottom: 1px solid white;

		&:not(.no-border) {
			border-left: 1px solid $border-color;
			border-right: 1px solid $border-color;
		}	
	}
}

span.dv-icon-before {
	margin-right: 0.2em;
}

span.dv-icon-after {
	margin-left: 0.2em;
}

.dv-pulldown-submenu {
	min-width:200px;
	padding: 4px;
	padding-left: 4px;
	padding-right: 4px;
	border-left: 1px solid $border-color;
	border-right: 1px solid $border-color;
	border-bottom: 1px solid $border-color;
	line-height: normal;
}

</style>