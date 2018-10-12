<template>

<div :style="divStyle">
	<ul role="tablist" class="dv-tab" :style="tabsStyle">
		<li 
			role="presentation"
			class="dv-tab-item" 
			:class="tabClass(tab)"
			:tabindex="tab.isDisabled ? '' : tab.active ? 0 : -1"
			:style="tabStyle(tab)"
			v-for="(tab, index) in tabs"
			:ref="tabRef(index)"
			@click="onclick(tab, $event)"
			@keydown="onkeydown"
		>{{ tab.title }}<span v-if="removeable && !tab.isDisabled" class="close-icon" @click.stop="removeTab(tab)">×</span>
		</li> 
	    <li v-if="addable" class="dv-tab-button"><button class="dv-button circle small short no-focus" @click="onAddBtnClick">+</button></li>
	</ul>
	<div 
		class="dv-tab-content" 
		:style="contentStyle"
		:class="{border: showContentBorder}"
	><slot></slot>
	</div>
</div>

</template>

<script>

import utils from './utils.js'

export default {

	props: [
		'value', 
		'add',
		'remove',
		'content-border', 
		'width', 
		'align', 
		'tab-width',
		'background-color', 
		'color', 
		'content-background-color', 
		'content-color', 
		'active-color'
	],

	computed: {
		divStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		},

		tabsStyle: function () {
			let style = ''
			if (this.backgroundColor)
				style = `background-color:${this.backgroundColor};`
			if (this.color)
				style += `color:${this.color};`
			if (this.align)
				style += `text-align:${this.align};`
			return style
		},

		contentStyle: function () {
			let style = ''
			if (this.contentBackgroundColor) {
				style = `background-color:${this.contentBackgroundColor};`
			}
			if (this.contentColor) {
				style += `color:${this.contentColor};`
			}
			return style
		},

	},

	data: function () {
		return {
			showContentBorder: utils.isPropOn(this.contentBorder),
			addable: utils.isPropOn(this.add),
			removeable: utils.isPropOn(this.remove),
			tabs: [],
			oldTabs: [],
			currentActiveTab: null,
			indexActiveTab: -1,
		}
	},

	methods: {

		tabClass: function (tab) {
			let classes = []
			if (tab.active) 
				classes.push('active')
			if (this.removeable)				
				classes.push('removeable')
			if (tab.isDisabled)
				classes.push('disabled')
			return classes.join(' ')
		},

		tabStyle: function (tab) {
			let style = ''
			if (this.tabWidth)
				style = `min-width:${this.tabWidth};`
			if (tab.active) {
				style = style + this.contentStyle + `border-bottom: 2px solid ${this.contentBackgroundColor};`
				if (this.activeColor) {
					if (this.activeColor == 'none') {
						style += 'border-top:1px solid #aaa;'
					}
					else {
						style += `border-top:2px solid ${this.activeColor};`
					}
				}
			}
			return style
		},

		tabRef: function (index) {
			return `tab${index}`
		},

		// addTab() and removeTab() are used only by the dv-tab-item component
		// and are not supposed to be used by other components

		addTab: function (newTab, showNewTab) {
			newTab.active = false
			// newTab has already been inserted as a child component
			// Trying index = this.$children.indexOf(newTab) DOES NOT work
			let index = this.$slots.default.indexOf(newTab.$vnode)
            this.tabs.splice(index, 0, newTab);

            // Tab added to this.tabs. Let's check if we must switch to it
            if (newTab.isDisabled)
            	return	// Never ever switch to a disabled tab
            let numEnabledTabs = this.tabs.filter(tab => !tab.isDisabled).length
            let isThisTheFirstEnabledTab = (numEnabledTabs == 1)
            // If showNewTab == true or this tab is the first enabled one, switch to it
			if (showNewTab || isThisTheFirstEnabledTab) {
				this.switchTab(newTab)
			}
			// We can't simply check whether this.currentActiveTab is non-null, because
			// the tab will only be actually switched after all tabs are added (all logic
			// inside this.switchTab happens inside a $nextTick block)
		}, 

		removeTab: function (tabToRemove) {
			let index = -1
			if (typeof tabToRemove == 'number')
				index = tabToRemove
			else
				index = this.tabs.indexOf(tabToRemove)
			this.tabs.splice(index, 1)
			if (this.tabs.length == 0) 
				return
			if (index >= this.tabs.length)
				index -= 1
			if (!this.tabs.find(tab => tab.active)) {
				if (this.indexActiveTab >= this.tabs.length) {
					this.indexActiveTab = this.tabs.length - 1
				}
				this.switchTab(this.tabs[index])
			}
		},

		switchTab: function (tab, focus) {
			// tab can be either a dv-tabs component or a number 
			// indicating the position of the tab to be selected
			// focus: if true, changes the keyboard focus to the
			// newly selected tab

			// By wrapping the logic inside a $nextTick block,
			// we allow the developer to call switchTab() right 
			// after inserting or removing a tab
			this.$nextTick(() => {
				if (typeof tab == 'number')
					tab = this.tabs[tab]
				if (this.currentActiveTab) {
					this.currentActiveTab.active = false
				}	
				tab.active = true
				this.currentActiveTab = tab
				this.indexActiveTab = this.tabs.indexOf(tab)
				if (focus) {
					let elem = this.$refs[this.tabRef(this.indexActiveTab)][0]
					elem.focus()
				}
			})
		},

		// event handlers

		onclick: function (tab, e) {
			if (tab.isDisabled) {
				e.preventDefault()
				return
			}
			this.switchTab(tab)
			this.$emit('input', this.tabs.indexOf(tab))
		},

		onkeydown: function (e) {
			let index = this.indexActiveTab
			let tabs = this.tabs

			function allTabsAreDisabled () {
				for (let i=0; i<tabs.length; i++) {
					if (!tabs[i].isDisabled)
						return false
				}
				return true
			}

			function getNextIndex (currentIndex) {
				if (allTabsAreDisabled())
					return -1
				for (let i=currentIndex; i<tabs.length; i++) {
					if (!tabs[i].isDisabled)
						return i
				}
				if (currentIndex > 0)
					return getNextIndex (0)
				return -1	
			} 

			function getPrevIndex (currentIndex) {
				if (allTabsAreDisabled())
					return -1
				for (let i=currentIndex; i>=0; i--) {
					if (!tabs[i].isDisabled)
						return i
				}
				if (currentIndex < tabs.length - 1)
					return getPrevIndex (tabs.length-1)
				return -1
			}

			switch (e.key) {
				case 'ArrowLeft': 
					index = getPrevIndex(index-1)
					break
				case 'ArrowRight':
					index = getNextIndex(index+1)
					break
				case 'Home':
					index = getNextIndex(0)
					break
				case 'End':
					index = getPrevIndex(this.tabs.length-1)
					break
				case 'Delete':
					if (this.removeable) {
						this.removeTab(index)
						e.preventDefault()
						return 
					}
				default:
					return
			}
			e.preventDefault()
			this.switchTab(index, true)
		},

		onAddBtnClick: function () {
			this.$emit('add')
		}

	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-tab {
    list-style-type: none;
    border-bottom: 1px solid #aaa;
    padding-left:1em;
    padding-right:1em;
    font-size:4px;
    margin:0px;
}  

[role="tablist"] {
  padding: 0;
}

li.dv-tab-item {
   display: inline-block;
   border-top: 2px solid transparent;
   border-bottom: 2px solid transparent;
   padding-left: 1em;
   padding-right: 1em;
   padding-top: 0.5em;
   padding-bottom: 0.35em;
   transform: translateY(1.5px);
   margin-right: 0px;
   margin-left: 0px;
   font-size: 14px;
   text-align: center;
   user-select: none;
   cursor: pointer;

	&.disabled {
		color: $color-disabled; 
		cursor: default;
	}

	&.removeable {
		padding-right:0.5em;
	}

	&.active {
	    border-left: 1px solid #aaa;
	    border-right: 1px solid #aaa;
	    border-bottom: 2px solid white;
	    border-top: 2px solid #1867c0;
	    background-color: white;
	}  
	  
	&:focus {
	    outline: none;
	}

	&:not(.disabled):focus {
	    text-decoration:underline;
	    text-decoration-color: #888;
	}  

	&:not(.disabled):hover {
		color:#1867c0;
	}  

	& > span.close-icon {
		display:inline-block;
		padding:0;
		padding-left:0.25em;
		padding-right:0.25em;
		margin-left:0.5em;
	}

	& > span.close-icon:hover {
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.75);
	}

}  

$tab-content-border: 1px solid #aaa;

.dv-tab-content {
	padding: 1em;

	&.border {
		border-left: $tab-content-border;
		border-right: $tab-content-border;
		border-bottom: $tab-content-border;
	}

}

.dv-tab-button {
  float:right;
  font-size:14px;
}  	


</style>