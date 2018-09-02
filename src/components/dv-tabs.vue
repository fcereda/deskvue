<template>

<div :style="divStyle">
	<ul role="tablist" class="dv-tab" :style="tabsStyle">
		<li 
			role="presentation"
			class="dv-tab-item" 
			:class="tab.active ? 'active' : ''"
			:tabindex="tab.active ? 0 : -1"
			:style="tabStyle(tab)"
			v-for="(tab, index) in tabs"
			:ref="tabRef(index)"
			@click="onclick(tab)"
			@keydown="onkeydown"
		>{{ tab.title }}</li> 
	    <li class="dv-tab-button"><button class="dv-button circle small short no-focus" @click="onAddBtnClick">+</button></li>
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
		'content-border', 
		'width', 
		'align', 
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
				style += `text-align:${this.align}`
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
		}

	},

	data: function () {
		return {
			showContentBorder: utils.isPropOn(this.contentBorder),
			tabs: [],
			oldTabs: [],
			currentActiveTab: null,
			indexActiveTab: -1,
		}
	},

	methods: {

		tabStyle: function (tab) {
			if (tab.active) {
				let style = this.contentStyle + `border-bottom: 2px solid ${this.contentBackgroundColor};`
				if (this.activeColor) {
					if (this.activeColor == 'none') {
						style += 'border-top:1px solid #aaa;'
					}
					else {
						style += `border-top:2px solid ${this.activeColor};`
					}
				}
				return style
			}
			return ''
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
			if (showNewTab || this.tabs.length == 1) {
				this.switchTab(newTab)
			}
		},

		removeTab: function (tabToRemove) {
			let index = this.tabs.indexOf(tabToRemove)
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

		onclick: function (tab) {
			this.switchTab(tab)
			this.$emit('input', this.tabs.indexOf(tab))
		},

		onkeydown: function (e) {
			let index = this.indexActiveTab
			switch (e.key) {
				case 'ArrowLeft': 
					index -= 1
					if (index < 0) {
						index = this.tabs.length - 1
					}
					break
				case 'ArrowRight':
					index += 1	
					if (index >= this.tabs.length) {
						index = 0
					}	
					break
				case 'Home':
					index = 0
					break
				case 'End':
					index = this.tabs.length - 1
					break
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
   display:inline-block;
   border-top: 2px solid transparent;
   border-bottom: 2px solid transparent;
   padding-left:1em;
   padding-right:1em;
   padding-top:0.5em;
   padding-bottom:0.35em;
   transform: translateY(1.5px);
   margin-right:0px;
   margin-left:0px;
   font-size:14px;
   user-select:none;
   cursor:pointer;
}  

li.dv-tab-item:hover {
    color:#1867c0;
  }  
  
li.dv-tab-item.active {
   border-left: 1px solid #aaa;
   border-right: 1px solid #aaa;
   border-bottom: 2px solid white;
   border-top: 2px solid #1867c0;
   //border-top-left-radius:4px;
   //border-top-right-radius:4px;
   background-color: white;
}  
  
li.dv-tab-item:focus {
    //color:#1867c0;
    text-decoration:underline;
    text-decoration-color: #888;
    outline: none;
  }  
  
.dv-tab-item > button {
    border: 0.5px solid transparent;
    outline: none;
    background-color: transparent;
    font-size:inherit;
}  
  
.dv-tab-item > button:hover {
    color: #1867c0;
}  

.dv-tab-item > button:focus {
    border: 0.5px dotted #aaa;
}    
  
  
.dv-tab-button {
  float:right;
  font-size:14px;
}  	

.dv-tab-content {
	padding: 1em;
}

$tab-content-border: 1px solid #aaa;

.dv-tab-content.border {
	border-left: $tab-content-border;
	border-right: $tab-content-border;
	border-bottom: $tab-content-border;
}
    
.dv-badge {
    display:inline-block;
    background-color: #888;
    color:white;
    min-width:1em;
    //height:1.5em;
    text-align:center;
    line-height:150%;
    border-radius:1em;
    font-size:0.8em;
    padding:1px 4px;
    transform: translateY(-2px);
    font-weight:400;
}  
  
.dv-badge.warning {
    background-color: #FF9800;
    color:white;
    font-weight:500;
}  

</style>