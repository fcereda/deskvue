<template>

<div :style="tabStyle">
	<ul class="dv-tab">
		<li 
			class="dv-tab-item" 
			:class="tab.active ? 'active' : ''"
			v-for="tab in tabs"
			@click="onclick(tab)"
		>{{ tab.title }}</li> 
	    <li class="dv-tab-button"><button class="dv-button circle small short no-focus" @click="onAddBtnClick">+</button></li>
	</ul>
	<div 
		class="dv-tab-content" 
		:class="{border: showContentBorder}"
	><slot></slot>
	</div>
</div>

</template>

<script>

import utils from './utils.js'

export default {

	props: ['value', 'content-border', 'width'],

	computed: {
		tabStyle: function () {
			if (this.width)
				return `width:${this.width};`
			return ''
		},

	},

	data: function () {
		return {
			showContentBorder: utils.isPropOn(this.contentBorder),
			tabs: [],
			currentActiveTab: null
		}
	},

	methods: {

		addTab: function (newTab) {
			newTab.active = false
			// newTab has already been inserted as a child component
			let index = this.$slots.default.indexOf(newTab.$vnode)
			console.log('addTab()')
			console.log('index = ' + index)
			console.log('with children: ' + this.$children.indexOf(newTab))

            this.tabs.splice(index, 0, newTab);
			this.showTab(newTab)
		},

		removeTab: function (tabToRemove) {
			let index = this.tabs.indexOf(tabToRemove)
			this.tabs.splice(index, 1)
			if (index > 0) {
				index -= 1
			}
			if (this.tabs.length) {
				this.showTab(this.tabs[index])
			}
		},

		showTab: function (tab) {
			console.log('entrou em showTab')
			if (this.currentActiveTab) {
				this.currentActiveTab.active = false
			}	
			tab.active = true
			this.currentActiveTab = tab
		},

		onclick: function (tab) {
			this.showTab(tab)
			this.$emit('input', this.tabs.indexOf(tab))
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