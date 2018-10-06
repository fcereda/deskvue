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
          small  
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
    	<dv-tab-item title="Pull requestes">Here you have your pull requests:

			Who are you going to vote for? <br>
			<dv-input-select search placeholder="Selecione seu candidato">
			<option placeholder>Please click here...</option>
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-input-select>

    	</dv-tab-item>
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
    			<dv-tab-item disabled title="Disabled">This should be a hidden tab</dv-tab-item>
    		</dv-tabs>
    	</dv-tab-item>		
    </dv-tabs>

    <form-controls></form-controls>


	<h3>Simple inputs</h3><p>
	<fieldset>
		<legend>Log in</legend>

		<br>

		<div style="text-align:left; width:25em;">	
			What is your favorite language?<br>
			<dv-multiselect></dv-multiselect>
		</div>	


		<br>
		<div style="text-align:left">
			Who are you going to vote for? <br>
			<dv-input-select search placeholder="Selecione seu candidato">
			<option placeholder>Please click here...</option>
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-input-select>

			<br><br>
			Who do you you think will win?<br>
			<dv-input-select multiple search rounded no-border>
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-input-select>
		
			<br><br>
			Who are you not voting for in any circumstance?<br>
			<dv-input-select multiple search rounded>
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-input-select>

			<br><br>
			<dv-selectbox
				label="Who was the best Brazilian driver of the 70s?"
				search
				floating
				rounded
				:value="myPilots"
				style="float:left">
				<option v-for="pilot in pilots">{{ pilot }}</option>				
			</dv-selectbox>
			<dv-textbox 
				label="Lotus ppp" 
				floating 
				rounded 
				placeholder="Type your first name here" 
				v-model="text4"
				style="float:left"
			></dv-textbox>

		</div>





		<br>
		<div style="text-align:left;">
			<dv-textbox style="width:300px" label="First name" rounded placeholder="Type your first name here" v-model="text1"></dv-textbox>&nbsp;
			<dv-textbox label="Last name" width="8em" rounded placeholder="Type your last name" v-model="text2"></dv-textbox>&nbsp;
			<dv-textbox label="Email" rounded placeholder="Please, no bogus addresses" v-model="text3"></dv-textbox>&nbsp;
			<dv-textbox label="Lotus ppp" floating rounded placeholder="Type your first name here" v-model="text4"></dv-textbox>&nbsp;
			<dv-textbox label="Ferrari qp" floating rounded inset placeholder="Type your last name" v-model="text5"></dv-textbox>&nbsp;
			<dv-textbox style="width:300px" label="Brabham Gordon Murray" floating rounded placeholder="Please, no bogus addresses" v-model="text6"></dv-textbox>
		</div>	
		Textos digitados: {{ [text1, text2, text3, text4, text5, text6].join(', ')}}

		<br><br>


		<div class="field">
		<label class="dv-input-label">Last name</label>
		<input type="text" class="dv-input-text" placeholder="Type here"></input>
		</div>
		<select class="dv-select dv-input-text">
		    <option v-for="item in 100">Option {{ item }}</option> 
		</select><br><br>

		<div style="text-align:left">
		<dv-checkbox v-model="checkbox1">Billing address is the same as shipping address</dv-checkbox><br>
		<dv-checkbox v-model="checkbox2" color="success">Indeterminate value</dv-checkbox><br>
		<dv-checkbox disabled>Allows indeterminate</dv-checkbox>
		</div>

		<br>

		<fieldset style="float:right;width:10em;text-align:left;">
		<legend>More options</legend>
		<dv-checkbox v-model="checkbox1">I added a really big checkbox label, to cause wrapping that we will have to deal with</dv-checkbox>
		<dv-checkbox v-model="checkbox2">Another multiple line checkbox</dv-checkbox>
		</fieldset>

		<fieldset style="width:10em;text-align:left;float:left;">
			<legend>Left toggles</legend>
			<dv-checkbox type="toggle" color="warning" v-model="toggle1">Toggle this!</dv-checkbox><br>
			<dv-checkbox type="toggle" v-model="toggle2">And this too!</dv-checkbox><br>
		</fieldset>

		<fieldset style="width:10em;text-align:right;float:left">
			<legend>dv-checkbox type="radio"</legend>
			<dv-checkbox type="radio" align="right" v-model="radio1">First radio</dv-checkbox><br>
			<dv-checkbox type="radio" align="right" v-model="radio2">Second radio</dv-checkbox>
		</fieldset>	

		<fieldset style="width:10em;text-align:right;float:left;">
			<legend>Right toggles</legend>
			<dv-checkbox type="toggle" align="right" color="success" v-model="toggle3">Toggle this!</dv-checkbox><br>
			<dv-checkbox type="toggle" align="right" color="danger" v-model="toggle4">And this too!</dv-checkbox><br>
		</fieldset>

		<fieldset style="width:15em;text-align:left">
			<legend>Radio group</legend>
			<dv-radiogroup v-model="radioGroup">
				<dv-radio id="1">Option One</dv-radio>&nbsp;
				<dv-radio id="2">Option Two</dv-radio>
			</dv-radiogroup>
			<br>Value: {{ radioGroup }}
		</fieldset>	

		<fieldset style="width:10em;text-align:center;float:left">
			<legend>Centered group</legend>
			<dv-radiogroup v-model="radioGroup2">
				<dv-radio id="3" align="center">Three</dv-radio>
				<dv-radio id="4" align="center">Four</dv-radio>
			</dv-radiogroup>
			Value: {{radioGroup2}}
		</fieldset>		

		<fieldset style="width:10em;text-align:center;float:left">
			<legend>No IDs</legend>
			<dv-radiogroup v-model="radioGroup3">
				<dv-radio align="center">Five</dv-radio>
				<dv-radio align="center">Six</dv-radio>
			</dv-radiogroup>
			Value: {{radioGroup3}}
		</fieldset>	

		<fieldset style="width:10em;text-align:center;float:left">
			<legend>Centered toggles</legend>
			<dv-checkbox type="toggle" align="center" v-model="toggle3">Five</dv-checkbox>
			<dv-checkbox type="toggle" align="center" v-model="toggle4">Six</dv-checkbox>
		</fieldset>		

		<fieldset style="width:10em; text-align:left; float:left;">
			<legend>Candidatos</legend>
			<dv-radiogroup v-model="radioGroup4">
				<dv-radio 
					align="left"
					display="block"
					v-for="candidato in tags"
					:id="candidato"
				>{{ candidato }}</dv-radio>
			</dv-radiogroup>
		</fieldset>		

		

	</fieldset>	



		<br><br>
		<button class="dv-button wide primary">OK</button>


	<fieldset>
		<legend>Notifications</legend>

		<fieldset style="width:15em;float:left;">
			<legend>Message to show</legend>
			<dv-textbox rounded width="100%" placeholder="Type the message here" v-model="toastText"></dv-textbox>
		</fieldset>			
		<fieldset style="width:25em;float:left;">
			<legend>Type of toast</legend>
			<dv-options :options="options1" full-width equal-width v-model="option1"></dv-options>
		</fieldset>	

		<fieldset style="width:20em;float:left;">
			<legend>Type of toast</legend>
			<dv-radiogroup v-model="toastType">
				<dv-radio 
					v-for="type in ['Regular', 'Info', 'Success', 'Warning', 'Error']"
					:id="type.toLowerCase()" 
					align="center"
				>{{ type }}</dv-radio>
			</dv-radiogroup>
		</fieldset>			
		<fieldset style="width:15em;float:left;">  
			<legend>Icon</legend>
			<dv-radiogroup v-model="toastIcon">
				<dv-radio id="info" align="center"> &nbsp;<i class="material-icons">info</i></dv-radio>
				<dv-radio id="report" align="center"> &nbsp;<i class="material-icons">report</i></dv-radio>
				<dv-radio id="check_circle" align="center"> &nbsp;<i class="material-icons">check_circle</i></dv-radio>
				<dv-radio id="warning" align="center"> &nbsp;<i class="material-icons">warning</i></dv-radio>				
				<dv-radio id="notification_important" align="center"> &nbsp;<i class="material-icons">notification_important</i></dv-radio>				
			</dv-radiogroup>
		</fieldset>			 

		<br><br>
		<fieldset style="width:32em;float:left;">
			<legend>Ícones e texto</legend>
			<dv-options :options="options2" type="radio" width="25em" option-width="20%" stacked v-model="option2"></dv-options>
			<dv-options :options="options3" type="radio" full-width v-model="option2"></dv-options>
			<dv-options :options="options3" type="radio" v-model="option2"></dv-options>
		</fieldset>	

		<fieldset style="width:32em;float:left;">
			<legend>Ícones e texto</legend>
			<dv-options :options="options2" type="checkbox" width="25em" option-width="20%" stacked v-model="option4"></dv-options>
			<br><br>
			<dv-options :options="options3" type="checkbox" v-model="option4"></dv-options>
			<br>
			{{ option4 }}
		</fieldset>	

		
		<fieldset style="width:15em;float:left">
			<legend>Pilotos</legend>
			<dv-options 
				:options="{ 
					senna: 'Ayrton',
					piquet: 'Nelson',
					emerson: 'Fittipaldi'
				}" 
				type="radio" 
				equal-width
				full-width
				v-model="option3"
			></dv-options>
		</fieldset>	


		<p style="clear:both;"></p><p>&nbsp;</p>


		<dv-button @click="showToast">Show toaster</dv-button>
		<br><br>
		{{ option1 }}
		<br>
		{{ option2 }}
		<br>
		{{ option3 }}
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
      <li><a warning="https://chat.vuejs.org" target="_blank" rel="noopener">Community warningat</a></li>
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
import dvOptions from './dv-options.vue'
import dvRadio from './dv-radio.vue'
import dvRadiogroup from './dv-radiogroup.vue'
import dvTabs from './dv-tabs.vue'
import dvTabItem from './dv-tab-item.vue'
import dvTag from './dv-tag.vue'
import dvTextbox from './dv-textbox.vue'
import dvSelectbox from './dv-selectbox.vue'

import dvInputSelect from './dv-input-select.vue'
import dvMultiselect from './dv-multiselect.vue'

import formControls from './form-controls.vue'

import './form.scss'

export default {
    name: 'HelloWorld',

    components: {
    	dvButton,
    	dvBtnGroup,
    	dvCheckbox,
    	dvMenu,
    	dvOptions,
    	dvRadio,
    	dvRadiogroup,
    	dvSelectbox,
    	dvTabs,
    	dvTabItem,
    	dvTag,
    	dvTextbox,

    	dvInputSelect,
    	dvMultiselect,

    	formControls,
    },

    props: {
      msg: String
    }, 

    data: function () {
	   	const firstNames = ['Wilson', 'Emerson', 'Moco', 'Ingo', 'Alex', 'Nelson', 'Raul', 'Ayrton']
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

	   		multiselect1: null,

	   		pilots: ['Wilson Fittipaldi', 'Emerson Fittipaldi', 'José Carlos Pace', 'Ingo Hoffman', 'Alex Dias Ribeiro', 'Nelson Piquet'],
	   		myPilots: null,
	   		text1: '',
	   		text2: 'John Stewart',
	   		text3: '',
	   		text4: 'Emerson Fittipaldi',
	   		text5: 'Niki Lauda',
	   		text6: 'Nelson Piquet',
	   		checkbox1: true,
	   		checkbox2: -1,
	   		radio1: false,
	   		radio2: true,
	   		toggle1: false,
	   		toggle2: false,
	   		toggle3: true,
	   		toggle4: true,
	   		radioGroup: 2,
	   		radioGroup2: 3,
	   		radioGroup3: 0,
	   		radioGroup4: 0,

	   		toastText: 'Hello World!',
	   		toastPosition: 'top-right',
	   		toastType: null,
	   		toastIcon: 'error',

	   		options1: ['Regular', 'Info', 'Success', 'Warning', 'Error'],
	   		options2: ['info', 'report', 'check_circle', 'warning', 'notification_important'].map((icon, index) => {
	   			return {
	   				id: icon,
	   				icon,
	   				text: `Hello<br>${firstNames[index]}`
	   			}
	   		}),
	   		options3: ['info', 'report', 'check_circle', 'warning', 'notification_important'].map((icon, index) => {
	   			return {
	   				id: icon,
	   				icon,
	   				text: `${firstNames[index]}`
	   			}
	   		}),
	   		option1: [2],
	   		option2: null,
	   		option3: null,
	   		option4: [],
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
    	},

    	showToast: function () {
    		console.log(this.toastType)
    		this.$toasted.show(this.toastText, {
    			containerClass: 'dv-toast',
    			type: this.toastType,
    			position: 'top-right',
    			icon: this.toastIcon, 
    			//duration: 5000,
    		    action : {
        			text : 'OK',
        			onClick : (e, toastObject) => {
            			toastObject.goAway(0);
        			}
    			},
    		})
    	}

    }

}
</script>

<style lang="scss">

@import './dv-toast.scss';

</style>

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
