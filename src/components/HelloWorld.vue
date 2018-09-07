<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <h3>Menu</h3>
    <dv-menu 
    	:items="menuItems"
    	size="medium"
    	border
    	@click="onMenuClick"
    ></dv-menu>	

    <h3>Buttons</h3>

    <dv-button primary wide>Hello</dv-button>
    <dv-button warning class="warning">Warning</dv-button>
    <dv-button danger>Error</dv-button>
    <dv-button success>Done</dv-button>
    <dv-button primary>Primary</dv-button>
    <dv-button secondary>Secondary</dv-button>  
    <dv-button info wide>Info</dv-button>  
    <br><br>
    <dv-button class="ml-2" @click="counter += 1">OK {{ counter }} </dv-button>
    <dv-button wide @click="clicked = (clicked+1) % 9">Cancel {{ clicked }}</dv-button>
    <dv-button wide no-focus>No focus</dv-button>    
    <br><br>
    RunKit:
    <br><br>
    <dv-button success small short>> Run</dv-button>
    <dv-button danger small short>|| Stop</dv-button>
    <dv-button success small short pill>Go ahead</dv-button>
    <br><br>
    <dv-button success small short>> Run &nbsp;&nbsp;<small style="font-weight:400">Ctrl-R</small></dv-button>
    <dv-button danger small short>|| Stop &nbsp;&nbsp;<small style="font-weight:400">Ctrl-S</small></dv-button>
    <br><br>
    <dv-button warning tall>A tall one</dv-button>
    <br><br>
    <dv-button warning circle>=</dv-button> 
    <dv-button success circle no-focus>&</dv-button> 
    <dv-button pill>What is this?</dv-button>
    <dv-button circle no-border>$</dv-button>
    <dv-button circle no-focus no-border>%</dv-button>
    <dv-button circle no-focus no-border>&</dv-button>
    <dv-button circle no-focus no-border>#</dv-button>
    <dv-button circle no-focus no-border>§</dv-button>
    <h4>Button group</h4>
    <dv-btn-group>
        <dv-button 
          small primary 
          v-for="i in [1,2,3,4,5,6,7,8,9]"
          :class="clicked == i ? 'active' : ''"
          @click="clickBtnGroup(i)">{{ i }}
        </dv-button>
    </dv-btn-group>    

    <br><br>

    <dv-btn-group 
    	type="radio"
        @input="onBtnGroupInput"
        :value="btnGroupRadioValue"
	>
    	<dv-button 	
    	    warning
    	    :active="btnGroupRadioValue == i-1"
    	    v-for="i in 12"
    	    @click=""
    	>{{ i }}</dv-button>
    </dv-btn-group>
    

    <h3>Tags</h3>

    <div>
        <dv-tag 
        	v-for="tag in tags.map(tag => ({text: tag, primary: tag == primaryTag}))" 
        	:value="tag.text" 
        	:primary="tag.primary ? 'primary': false"
        	:warning="tag.text == warningTag"
        	close
        	@click="clickTag(tag.text)"
        	@close="closeTag(tag.text)"
        ></dv-tag>
    </div>  

    <h3>Tabs</h3>

    <dv-tabs ref="tab1" :value="currentTab" width="600px" 
    	add
    	remove
    	align="left"
    	background-color="#eee" 
    	color="#aaa"
    	content-background-color="#F8F8F8" 
    	content-color="black"
    	content-border 
    	@input="setTab" @add="addTab">
    	<dv-tab-item title="Code">Tab: code</dv-tab-item>
    	<dv-tab-item 
    		v-for="tab in additionalTabs" 
    		:title="tab.title" 
    	>
    		This is tab <b>{{ tab.title }}</b><br>Click the button below to remove this tab:<br><br><dv-button @click="removeTab(tab)">Remove</dv-button>
    	</dv-tab-item>	
    	<dv-tab-item title="Issues">To select the issues found in your code, press <kbd>Ctrl</kbd> + <kbd>I</kbd>.<br>
    		To help fixing these issues, clone the repository and open Sublime Text.<br>
    		To ignore the issues, just do nothing.</dv-tab-item>
    	<dv-tab-item title="Pull requestes">Here you have your pull requests:</dv-tab-item>
    	<dv-tab-item title="Custom HTML" v-html="'<h3>Hello</h3>Para remover um tab, foque nele e pressione <kbd>Del</kbd>'"></dv-tab-item>
    	<dv-tab-item title="Nested tab">
    		<dv-tabs ref="nested" 
	   			width="100%"
    	    	active-color="none"
    			content-background-color="white"
    			content-border
    			tab-width="25%">
    			<dv-tab-item title="Tab 1">This is tab 1</dv-tab-item>
    			<dv-tab-item title="Fixed width tabs">This is the second tab</dv-tab-item>
    		</dv-tabs>
    	</dv-tab-item>		
    </dv-tabs>


	<h3>Simple inputs</h3><p>
	<fieldset>
		<legend>Log in</legend>
		<div class="field">
		    <label for="first-name" class="dv-input-label">What's the first name</label>
		  <input type="text" name="first-name" class="dv-input-text" placeholder="Type here"></input>
		</div>
		<br>
		<div class="field">
		<label class="dv-input-label">Last name</label>
		<input type="text" class="dv-input-text" placeholder="Type here"></input>
		</div>
		<select class="dv-select dv-input-text">
		    <option v-for="item in 100">Option {{ item }}</option> 
		</select><br><br>

		<div style="text-align:left">
		<dv-checkbox v-model="checkbox1">Billing address is the same as shipping address</dv-checkbox><br>
		<dv-checkbox v-model="checkbox2" color="success" allow-indeterminate>Allows indeterminate</dv-checkbox><br>
		<dv-checkbox disabled>Allows indeterminate</dv-checkbox>
		</div>

		<fieldset style="float:right;width:10em;">
		<legend>More options</legend>
		<dv-checkbox>A really big checkbox label, to cause wrapping that we will have to deal with</dv-checkbox>
		</fieldset>


		<br><br>
		<button class="dv-button wide primary">OK</button>
	</fieldset>
	

    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>

import dvButton from './dv-button.vue'
import dvBtnGroup from './dv-btn-group.vue'
import dvCheckbox from './dv-checkbox.vue'
import dvMenu from './dv-menu.vue'
import dvTabs from './dv-tabs.vue'
import dvTabItem from './dv-tab-item.vue'
import dvTag from './dv-tag.vue'
import './form.scss'

export default {
    name: 'HelloWorld',

    components: {
    	dvButton,
    	dvBtnGroup,
    	dvCheckbox,
    	dvMenu,
    	dvTabs,
    	dvTabItem,
    	dvTag
    },

    props: {
      msg: String
    }, 

    data: function () {

		return {
			counter: 0,
			clicked: null,
			menuItems: [
				{ text: 'File operations', category: true },
				{ text: 'New...', icon: 'N', key: 'Ctrl-N' },
				{ text: 'Save', icon: '$', key: 'Ctrl-S'  },
				{ text: 'Save as...', icon: '%', key: 'Ctrl-A', },
				{ divider: true },
				{ text: 'Save and exit', disabled: true, index: 10 },
				{ text: 'Exit', icon: 'º', key: 'Ctrl-X', callback: this.testCallback.bind(this) },
				{ text: 'Text editing', category: true },
				{ text: 'Copy', icon: 'C', key: 'Ctrl-C' },
				{ text: 'Cut', icon: 'X', key: 'Ctrl-X' },
				{ text: 'Paste', icon: 'V', key: 'Ctrl-V' }
    		],
    		tags: [
      			'Lula', 'Bolsonaro', 'Ciro', 'Alckmin', 'Marina', 'Dias', 'Meirelles', 'Daciolo'
    		],   
    		primaryTag: '',
    		warningTag: '',
    		currentTab: 1,
	   		btnGroupRadioValue: -1,
	   		additionalTabs: [],
	   		checkbox1: false,
	   		checkbox2: 0,
		} 

    },

    methods: {
    	onMenuClick: function (e) {
    		console.log(e)
    		if (e.callback) {
    			e.callback()
    		}
    	},

    	clickBtnGroup: function (index) {
	       if (index == this.clicked)
	         this.clicked = null
	       else 
	         this.clicked = index;
	    },

	    onBtnGroupInput: function (e) {
	    	console.log('btngroupinput')
	    	console.log(e)
	    	this.btnGroupRadioValue = e
	    },

    	testCallback: function () {
    		console.log('Hello World')
    	},

	   	clickTag: function (tag) {
	   		this.warningTag = this.primaryTag
	   		this.primaryTag = tag
	   		//this.$set(this, 'primaryTag', tag)
	   		//console.log(this.primaryTag)
    	},

    	closeTag: function (tag) {
    		let index = this.tags.indexOf(tag)
    		this.tags.splice(index, 1)
    	},

    	setTab: function (e) {
    		this.currentTab = e
    	},

    	addTab: function () {
    		this.counter += 1
    		let newTab = {
    			title: 'New Tab ' + this.counter,
    			html: `<h3>This tab ${this.counter}</h3>Random number: ${Math.random()}`
    		}
    		this.additionalTabs.splice(this.additionalTabs.length, 0, newTab)
    		this.$refs.tab1.switchTab(this.additionalTabs.length)
    	},

    	removeTab: function (tab) {
    		let index = this.additionalTabs.indexOf(tab)
    		this.additionalTabs.splice(index, 1)
    		this.$nextTick(() => this.$refs.tab1.showTab(index+1))
    	}

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
