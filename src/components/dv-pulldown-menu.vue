<template>

<!-- Temos que implementar o tab e o shift-tab para o menu pulldown! -->


	<ul 
		class="dv-pulldown-menu" 
		tabindex="0"
		@focus="onFocus"
		@blur="onBlur"
		@keydown="onKeydown"
	>
		<li 
			v-for="item in items"
			class="dv-pulldown-menu-item"
			:class="menuItemClass(item)"
			:style="menuItemStyle(item)"
			:key="item.text"
			:data-name="item.text"
			@click="onClickMenuItem(item, $event)"

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
			currentFocusedItem: null,
			lastFocusedItem: null,
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
			else if (menuItem == this.currentFocusedItem)
				classes.push('focus')
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
			if (menuItem == this.currentActiveItem || !menuItem) {
				// User clicked on an already open menu item,
				// or menuItem == null
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

		onFocus: function (e) {
			this.currentFocusedItem = this.lastFocusedItem || this.enabledItems[0]
		},

		onBlur: function (e) {
			console.log('Entrou em onBlur')
			//this.lastFocusedItem = this.currentFocusedItem
			this.currentFocusedItem= null
		},

		onClickMenuItem: function (menuItem, e) {
			e.preventDefault()
			e.stopPropagation()
			if (menuItem.disabled)
				return
			this.selectMenuItem(menuItem)
			this.currentFocusedItem = menuItem
			this.lastFocusedItem = menuItem
		},

		onKeydown: function (e) {
			let openSubmenu = false
			let indexActiveMenu = -1
			if (this.currentFocusedItem) {
				indexActiveMenu = this.enabledItems.indexOf(this.currentFocusedItem)
			}
			else if (this.currentActiveItem) {
				indexActiveMenu = this.enabledItems.indexOf(this.currentActiveItem)
			}
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
				case 'Enter':
				case 'ArrowDown':
					openSubmenu = true	
					break
				case 'Escape':
					this.returnToMainMenu()
					e.preventDefault()
					return
				default:
					return
			}
			if (indexActiveMenu < 0) {
				indexActiveMenu = this.enabledItems.length - 1
			}
			else if (indexActiveMenu >= this.enabledItems.length) {
				indexActiveMenu = 0
			}
			let newlySelectedItem = this.enabledItems[indexActiveMenu]
			this.currentFocusedItem = newlySelectedItem
			this.lastFocusedItem = newlySelectedItem
			if (this.currentActiveItem || openSubmenu) {
				this.selectMenuItem(newlySelectedItem)
			}
			e.preventDefault()
			e.stopPropagation()
		},

		returnToMainMenu () {
			this.currentFocusedItem = this.currentActiveItem
			this.selectMenuItem(null)
			this.$el.focus()					
		},

		onKeydownSubmenu: function (e) {
			console.log('Entrou em onKeydown submenu')
			if (e.key == 'Home' || e.key == 'End' || e.key == 'Enter' || e.key == 'ArrowDown')
				return
			this.onKeydown(e)
		}
	}
}

</script>

<style lang="scss">

@import './base.scss';

.dv-pulldown-menu {
	&:focus {
		outline: 0;
	}

}

.dv-pulldown-menu-item {
	box-sizing: border-box;
    list-style-type: none;  
    margin-left: 0px;
    user-select:none;  

	display: inline-block;
	line-height: 42px;
	padding-left: 12px;
	padding-right: 12px;
	margin-top: 2px;

	border: 1px solid transparent;
	border-top: none;
	border-bottom-color: $border-color;

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

	&.focus {
		background-color: #BBDEFB;

		//color: $color-primary;
	}

	&.active {
		// color: $color-primary;
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