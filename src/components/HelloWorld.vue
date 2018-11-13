<template>
  <div class="hello">
    <dv-toolbar>
    	<dv-toolbar-section width="120px" align="left">
    		<dv-toolbar-spacer width="16px"></dv-toolbar-spacer>
    		<span style="font-size:24px; font-weight: 600;">DeskVue</span>
    		<dv-toolbar-spacer width="16px"></dv-toolbar-spacer>
    	</dv-toolbar-section>	
    	<dv-toolbar-section>
    		<dv-pulldown-menu
    			:items="pulldownMenuItems"
    		></dv-pulldown-menu>
    	</dv-toolbar-section>		
    	<dv-toolbar-spacer></dv-toolbar-spacer>
    	<dv-toolbar-section>
    		<dv-iconbutton flat>computer</dv-iconbutton>
    		<dv-iconbutton flat>desktop_mac</dv-iconbutton>
    		<dv-iconbutton flat>desktop_windows</dv-iconbutton>
    	</dv-toolbar-section>
    	<dv-toolbar-spacer width="16px"></dv-toolbar-spacer>
    	<dv-toolbar-section>
			<dv-select-native search width="100px">
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-select-native>&nbsp;
    		<dv-iconbutton flat>all_inbox</dv-iconbutton>
    		<dv-iconbutton flat v-tooltip.bottom-end="'Hello'">dns</dv-iconbutton>
    		<dv-iconbutton flat v-tooltip="'Hello'">build</dv-iconbutton>
    	</dv-toolbar-section>
<!--
    	<dv-toolbar-section>
    		<dv-pulldown-menu
    			:items="[{
    				text: '&nbsp; Fábio',
    				iconAfter: 'keyboard_arrow_down', 
    				submenu: menuItems, 
    				noBorder:true
    			}]"
    			:permanent-border="true"
    		></dv-pulldown-menu>
    	</dv-toolbar-section>
-->
    	<dv-toolbar-section align="right">
    		<dv-toolbar-spacer width="16px"></dv-toolbar-spacer>
			<dv-link 
				@click="showUserDropdown=!showUserDropdown" 
				data-name="user-name"
				>John Smith&nbsp;<dv-icon :rotate="showUserDropdown ? '180deg' : 0" data-name="user-name">keyboard_arrow_down</dv-icon>
			</dv-link>
			<dv-toolbar-spacer width="8px"></dv-toolbar-spacer>
			<dv-dropdown 
				:show="showUserDropdown" 
				@close="showUserDropdown=false" 
				anchor-name="user-name" 
				offset-y="11.5px"
				offset-x="-100px" 
				elevation
			>
				<dv-pane border elevation="1">
					<dv-menu
						:items="menuItems"
						size="medium"
						
						@click="showUserDropdown=false"
					></dv-menu>	
				</dv-pane>
			</dv-dropdown>
    	</dv-toolbar-section>

    </dv-toolbar>

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

    <pane-test></pane-test>


    <h3>Buttons</h3>
    <dv-button primary wide>Hello</dv-button>
    <dv-button>Cancelar</dv-button>
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
    <dv-button circle no-focus no-border><dv-icon>commute</dv-icon></dv-button>
    <dv-button circle no-focus no-border>#1HHH</dv-button>
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

    <dv-toolbar sticky top="0px" topbar="none">
    	<dv-toolbar-section width="200px">Hello World</dv-toolbar-section>
    	<dv-toolbar-spacer></dv-toolbar-spacer>
    	<dv-toolbar-section>
    		<dv-iconbutton>save</dv-iconbutton>
    		<dv-iconbutton>save</dv-iconbutton>
    		<dv-iconbutton>save</dv-iconbutton>
    	</dv-toolbar-section>
    </dv-toolbar>	


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
    	@input="setTab" @add="addTab"
    >
    	<dv-tab-item title=" " disabled></dv-tab-item>
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
    	<dv-tab-item disabled title="Pull requestes">Here you have your pull requests:

			Who are you going to vote for? <br>
			<dv-input-select search placeholder="Selecione seu candidato">
			<option placeholder>Please click here...</option>
				<option v-for="tag in tags">{{ tag }}</option>
			</dv-input-select>

    	</dv-tab-item>
    	<dv-tab-item title="Custom HTML" v-html="'<h3>Hello</h3>Para remover um tab, foque nele e pressione <kbd>Del</kbd>'"></dv-tab-item>
    	<dv-tab-item title="Nested tab">
    		<dv-tabs ref="nested" 
    			align="right"
	   			width="100%"
    	    	active-color="none"
    			content-background-color="white"
    			content-border
    			tab-width="25%">
    			<dv-tab-item title="Tab 1">This is tab 1</dv-tab-item>
    			<dv-tab-item disabled title="Disabled">This should be a hidden tab</dv-tab-item>
    			<dv-tab-item title="Fixed width tabs">This is the second tab</dv-tab-item>
    		</dv-tabs>
    	</dv-tab-item>		
    </dv-tabs>

    <form-controls></form-controls>

<!--
    <dropdown-examples></dropdown-examples>
-->    

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
				color="danger"
				:value="myPilots"
				style="float:left">
				<option v-for="pilot in pilots">{{ pilot }}</option>				
			</dv-selectbox>
			<dv-textbox 
				label="Lotus" 
				floating 
				rounded 
				color="success"
				placeholder="Type Emerson Fittipaldi" 
				v-model="text4"
				style="float:left"
			></dv-textbox>

		</div>





		<br>
		<div style="text-align:left;">
			<dv-textbox style="width:300px" label="First name" rounded placeholder="Type your first name right here" color="warning" v-model="text1"></dv-textbox>&nbsp;
			<dv-textbox label="Last name" disabled width="8em" rounded placeholder="Type your last name" v-model="text2"></dv-textbox>&nbsp;
			<dv-textbox label="Email" rounded placeholder="Please, no bogus addresses" v-model="text3"></dv-textbox>&nbsp;
			<dv-textbox label="Lotus ppp" floating rounded placeholder="Type your first name here" v-model="text4"></dv-textbox>&nbsp;
			<dv-textbox label="Ferrari qp" floating rounded inset placeholder="Type your last name" v-model="text5"></dv-textbox>&nbsp;
			<dv-textbox style="width:300px;background-color:#e4e4e4;" no-border label="Brabham Gordon Murray" floating rounded placeholder="Please, no bogus addresses" v-model="text6"></dv-textbox>
			<dv-textbox style="width:500px;background-color:#e4e4e4;" no-border label="More Brabham, more Gordon" floating rounded placeholder="Please, no bogus addresses" v-model="text6"></dv-textbox>

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
			<dv-options :options="options2" type="radio" option-width="20%" stacked vertical v-model="option2"></dv-options>
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

		<fieldset>
			<legend>Option box</legend>
			<dv-optionbox 
				label="Pick your Brazilian pilot"
				floating
				rounded
				color="danger"
				:options="options1"
				type="checkbox"
				width="25em"
				option-width="20%"
				v-model="option1"
				style="float:left;"
			></dv-optionbox>
			<dv-textbox label="Lotus ppp" floating placeholder="Type your first name here" v-model="text4" style="float:left;"></dv-textbox>
			<br><br>
			<dv-optionbox 
				label="Using icons"
				floating
				:options="options3" 
				type="checkbox" 
				v-model="option4"
				style="float:left;"
			></dv-optionbox>
			<br>


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

	<br><br>

	<dv-pane 
		vertical-scroll
		scrollbar="slim"
		elevation="1"
		width="20em"
		height="15em"
		border
	>
		{{ lorenIpsun }}
	</dv-pane>

	<br><br>

	Dialogs<br>
	<dv-button @click="openDialog = 1">OK Cancel</dv-button>
	<dv-dialog
		:show="openDialog == 1"
		type="primary"
		:closeOnClick="false"
		title="Do you want to save your personal data in the cloud?"
		text="This will remove your data from your local machine and make it vulnerable to hackers."
		size="large"
		:buttons="[{text:'OK', type:'primary'}, 'Cancel']"
		@close="openDialog = null"
	></dv-dialog>

	<dv-button @click="openDialog = 4">No title</dv-button>
	<dv-dialog
		:show="openDialog == 4"
		type="primary"
		:closeOnClick="false"
		text="This is a very simple dialog box."
		size="small"
		:buttons="[{text:'OK', type:'primary'}, 'Cancel']"
		@close="openDialog = null"
	></dv-dialog>

	<dv-button @click="openDialog = 6">No title and error</dv-button>
	<dv-dialog
		:show="openDialog == 6"
		type="error"
		:closeOnClick="false"
		text="This is a very simple dialog box. It should have a red bar in the top"
		:buttons="[{text:'OK', type:'secondary'}, 'Cancel']"
		@close="openDialog = null"
	></dv-dialog>


	<dv-button @click="openDialog = 5">No title and h1</dv-button>
	<dv-dialog
		:show="openDialog == 5"
		type="primary"
		:closeOnClick="false"
		:buttons="[{text:'OK', type:'primary'}, 'Cancel']"
		@close="openDialog = null"
	>
		<h1>Do you want to open the emergency door?</h1>
		<p>An alarm will sound. If there is not an emergency in the building, please use the regular stairs.</p>
	</dv-dialog>


	&nbsp;
	<br><br>
	<dv-button @click="openDialog = 2">Error, ok</dv-button>
	<dv-dialog
		:show="openDialog == 2"
		type="error"
		:closeOnClick="true"
		title="Houston, we have a problem"
		buttons="ok"
		@close="openDialog = null"
	>
		This is a dropdown button:<br><br>

		<div>
		<dv-button 
			data-name="mybutton2"
			wide
			:active="showDropdown"
			@click.native="showDropdown = !showDropdown"
		>A dropdown button <dv-icon :rotate="showDropdown ? 180 : 0">keyboard_arrow_down</dv-icon></dv-button>

		<dv-dropdown 
			anchor-name="mybutton2"
			:show="showDropdown"
			placement="bottom"
			@close="showDropdown = false"
		>
			<dv-pane 
				width="20em"
				height="10em"
				elevation="1"
				border
			>This is a dropdown pane inside a dialog box<br><dv-iconbutton>save</dv-iconbutton></dv-pane>			
		</dv-dropdown>	
		</div>


	</dv-dialog>
	&nbsp;

	<dv-button @click="openDialog = 3">Yes No</dv-button>
	<dv-dialog
		:show="openDialog == 3"
		type="success"
		title="Qual é seu piloto brasileiro favorito?"
		buttons="yes-no"
		size="medium"
		@close="openDialog = null"
	>Escolha seu piloto favorito:<br>
				<dv-options :options="options3" type="radio" full-width v-model="option2"></dv-options>
				<br><br>
				<div tabindex="0" style="display:inline-block;border:1px solid #aaa;padding:8px;">A tabindex element</div>
	</dv-dialog>

	<br><br>

	$alert and $confirm<br>
	<dv-button @click="showAlert">Show $alert</dv-button>
	<br>
	<dv-button @click="showConfirm">Show $confirm</dv-button>
	<br>
	<dv-button @click="showConfirmOptions">Show $confirm with options object</dv-button>

	<br><br>


	<dv-accordion rounded>
		<dv-collapsible-pane v-for="pilot in pilots" :title="pilot" :open="true">
			<div v-for="pilot in pilots">{{ pilot }}</div>
		</dv-collapsible-pane>	
	</dv-accordion>
	<br>
	<dv-collapsible-pane :open="true">
		<template slot="head">
			<div style="padding:0.5em">Another test</div>
		</template>
		<div v-for="pilot in pilots">{{ pilot }}</div>
	</dv-collapsible-pane>	

	<h3>Lists</h3>

	<dv-list border rounded divider width="200px">
		<dv-list-item v-for="pilot in pilots">
			<div style="text-align:left;font-weight:600">{{ pilot}}</div>
			<div style="text-align:left;font-weight:400">Copersucar Fittipaldi</div>
		</dv-list-item>
	</dv-list>
	<br>

	<dv-pane width="260px" height="500px" border vertical-scroll scrollbar="slim">
	<dv-list rounded divider>
		<template v-for="countryObj in pilotsByCountry">
			<dv-list-label>
				{{ countryObj.country }}
			</dv-list-label>
			<dv-list-item v-for="pilot in countryObj.pilots">
				<div style="text-align:left;font-weight:600">{{ pilot.name }}</div>
				<div style="text-align:left;font-weight:400" v-for="title in pilot.titles">{{ title.year }}: {{ title.team }}{{ title.engine ? '-' + title.engine : '' }}</div>
			</dv-list-item>
		</template>	
	</dv-list>	
	</dv-pane>
	

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

import dvAccordion from './dv-accordion.vue'
import dvButton from './dv-button.vue'
import dvBtnGroup from './dv-btn-group.vue'
import dvCheckbox from './dv-checkbox.vue'
import dvCollapsiblePane from './dv-collapsible-pane.vue'
import dvCombo from './dv-combo.vue'
import dvDialog from './dv-modal.vue'
import dvDropdown from './dv-dropdown.vue'
import dvIcon from './dv-icon.vue'
import dvIconbutton from './dv-iconbutton.vue'
import dvLink from './dv-link.vue'
import dvList from './dv-list.vue'
import dvListItem from './dv-list-item.vue'
import dvListLabel from './dv-list-label.vue'
import dvMenu from './dv-menu.vue'
import dvOptionbox from './dv-optionbox.vue'
import dvOptions from './dv-options.vue'
import dvPane from './dv-pane.vue'
import dvPulldownMenu from './dv-pulldown-menu.vue'
import dvRadio from './dv-radio.vue'
import dvRadiogroup from './dv-radiogroup.vue'
import dvTabs from './dv-tabs.vue'
import dvTabItem from './dv-tab-item.vue'
import dvTag from './dv-tag.vue'
import dvTextbox from './dv-text-field.vue'
import dvToolbar from './dv-toolbar.vue'
import dvToolbarSection from './dv-toolbar-section.vue'
import dvToolbarSpacer from './dv-toolbar-spacer.vue'
import dvSelectbox from './dv-selectbox.vue'


import dvInputSelect from './dv-input-select.vue'
import dvMultiselect from './dv-multiselect.vue'
import dvSelectNative from './dv-select-native.vue'

import dropdownExamples from './dropdown-examples.vue'
import formControls from './form-controls.vue'
import paneTest from './pane-test.vue'


import './form.scss'

export default {
    name: 'HelloWorld',

    components: {
    	dvAccordion,
    	dvButton,
    	dvBtnGroup,
    	dvCheckbox,
    	dvCollapsiblePane,
    	dvCombo,
    	dvDialog,
    	dvDropdown,
    	dvIcon,
    	dvIconbutton,
    	dvLink,
    	dvList,
    	dvListItem,
    	dvListLabel,
    	dvMenu,
    	dvOptionbox,
    	dvOptions,
    	dvPane,
    	dvPulldownMenu,
    	dvRadio,
    	dvRadiogroup,
    	dvSelectbox,
    	dvTabs,
    	dvTabItem,
    	dvTag,
    	dvTextbox,
    	dvToolbar,
    	dvToolbarSection,
		dvToolbarSpacer,

    	dvInputSelect,
    	dvMultiselect,
    	dvSelectNative,

    	dropdownExamples,
    	formControls,
    	paneTest,
    },

    props: {
      msg: String
    }, 

    data: function () {
	   	const firstNames = ['Wilson', 'Emerson', 'Moco', 'Ingo', 'Alex', 'Nelson', 'Raul', 'Ayrton']
		return {
			counter: 0,
			clicked: null,
			pulldownMenuItems: [
				{ 
					text: 'File',
					iconAfter: 'keyboard_arrow_down',
					submenu: [
						{ text: 'New', icon: 'insert_drive_file', key: 'Ctrl-N' },
						{ text: 'Save', icon: 'save', key: 'Ctrl-S'  },
						{ text: 'Save as...', icon: 'save', key: 'Ctrl-A', }
					]
				}, {
					text: 'Edit',
					submenu: [
						{ text: 'Copy', icon: 'file_copy', key: 'Ctrl-C' },
						{ text: 'Cut', icon: 'file_copy', key: 'Ctrl-X' },
						{ text: 'Paste', key: 'Ctrl-V' }
					] 
				}, {
					text: 'View',
					disabled: true,					
					submenu: [
						{ text: 'History' },
						{ text: 'Article' },
						{ text: 'Object view' }
					]
				}, {
					text: 'Format',
					iconBefore: 'settings',
					submenu: [
						{ text: 'Font...' },
						{ text: 'Paragraph...' },
						{ text: 'Page...'}
					]
				}
			],
			menuItems: [
				{ text: 'File operations', category: true },
				{ text: 'New...', icon: 'insert_drive_file', key: 'Ctrl-N' },
				{ text: 'Save', icon: 'save', key: 'Ctrl-S'  },
				{ text: 'Save as...', icon: 'save', key: 'Ctrl-A', },
				{ divider: true },
				{ text: 'Save and exit', disabled: true, icon: 'exit_to_app', index: 10 },
				{ text: 'Exit', icon: 'exit_to_app', key: 'Ctrl-X', callback: this.testCallback.bind(this) },
				{ text: 'Text editing', category: true },
				{ text: 'Copy', icon: 'file_copy', key: 'Ctrl-C' },
				{ text: 'Cut', icon: 'file_copy', key: 'Ctrl-X' },
				{ text: 'Paste', key: 'Ctrl-V' }
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
	   		pilotsByCountry: [{
	   			country: 'Brazil',
	   			pilots: [{
	   				name: 'Emerson Fittipaldi', 
	   				titles: [{
	   					year: 1972,
	   					team: 'Lotus',
	   					engine: 'Ford'
	   				}, {
	   					year: 1974,
	   					team: 'McLaren',
	   					engine: 'Ford'
	   				}],
	   			}, {
	   				name: 'Nelson Piquet', 
	   				titles: [{
	   					year: 1981,
	   					team: 'Brabham',
	   					engine: 'Ford'
	   				}, {
	   					year: 1983,
	   					team: 'Brabham',
	   					engine: 'Ford'
	   				}, {
	   					year: 1986,
	   					team: 'Williams',
	   					engine: 'Honda'	
	   				}] 
	   			}, {
	   				name: 'Ayrton Senna',
	   				titles: [{
	   					year: 1988,
	   					team: 'McLaren',
	   					engine: 'Honda' 
	   				}, {
	   					year: 1990,
	   					team: 'McLaren',
	   					engine: 'Honda'
	   				}, {
	   					year: 1991,
	   					team: 'McLaren',
	   					engine: 'Honda'
	   				}]
	   			}]
	   		}, {
	   			country: 'UK',
	   			pilots: [{
	   				name: 'Jim Clark', 
	   				titles: [{
	   					year: 1963,
	   					team: 'Lotus',
	   					engine: 'Climax'
	   				}, {
	   					year: 1965,
	   					team: 'Lotus',
	   					engine: 'Climax'
	   				}]
	   			}, {
	   				name: 'Jackie Stewart',
	   				titles: [{
	   					year: 1969,
	   					team: 'Matra',
	   					engine: 'Matra'
	   				}, {
	   					year: 1971,
	   					team: 'Tyrrel',
	   					engine: 'Ford'
	   				}, {
	   					year: 1973,
	   					team: 'Tyrrel',
	   					engine: 'Ford'
	   				}]	
	   			}, {
	   				name: 'Nigel Mansell', 
	   				titles: [{
	   					year: 1992,
	   					team: 'Williams',
	   					engine: 'Renault'
	   				}]
	   			}, {
	   				name: 'Damon Hill',
	   				titles: [{
	   					year: 1996,
	   					team: 'Williams',
	   					engine: 'Renault'
	   				}]
	   			}, {	
	   				name: 'Jenson Button',
	   				titles: [{
	   					year: 2009,
	   					team: 'Brawn GP',
	   					engine: 'Mercedes'
	   				}]
	   			}, {
	   				name: 'Lewis Hamilton',
	   				titles: [{
	   					year: 2008,
	   					team: 'McLaren',
	   					engine: 'Mercedes'
	   				}, {
	   					year: 2014,
	   					team: 'Mercedes',
	   				}, {
	   					year: 2015,
	   					team: 'Mercedes',
	   				}, {
	   					year: 2017,
	   					team: 'Mercedes',
	   				}, {
	   					year: 2018,
	   					team: 'Mercedes',
	   				}]
	   			}]
	   		}, {
	   			country: 'Finland', 
	   			pilots: [{
	   				name: 'Keke Rosberg', 
	   				titles: [{
	   					year: 1982,
	   					team: 'Williams',
	   					engine: 'Ford'
	   				}]
	   			}, {
	   				name: 'Mika Hakkinen', 
	   				titles: [{
	   					year: 1998,
	   					team: 'McLaren',
	   					engine: 'Mercedes'
	   				}, {
	   					year: 1999,
	   					team: 'McLaren',
	   					engine: 'Mercedes'
	   				}]
	   			}, {
	   				name: 'Kimi Raikkonen',
	   				titles: [{
	   					year: 2007,
	   					team: 'Ferrari'
	   				}]
	   			}]	
	   		}, {
	   			country: 'Germany',
	   			pilots: [{
	   				name: 'Michael Schumacher',
	   				titles: [{
	   					year: 1994,
	   					team: 'Benetton',
	   					engine: 'Ford'
	   				}, {
	   					year: 1995,
	   					team: 'Benetton',
	   					engine: 'Renault'
	   				}, {
	   					year: 2000,
	   					team: 'Ferrari'
	   				}, {
	   					year: 2001,
	   					team: 'Ferrari'
	   				}, {
	   					year: 2002,
	   					team: 'Ferrari'
	   				}, {
	   					year: 2003,
	   					team: 'Ferrari'
	   				}, {
	   					year: 2004,
	   					team: 'Ferrari'
	   				}]
	   			}, {	 
	   				name: 'Sebastian Vettel',
	   				titles: [{
	   					year: 2010,
	   					team: 'Red Bull',
	   					engine: 'Renault'
	   				}, {
	   					year: 2011,
	   					team: 'Red Bull',
	   					engine: 'Renault'
	   				}, {
	   					year: 2012,
	   					team: 'Red Bull',
	   					engine: 'Renault'
	   				}, {
	   					year: 2013,
	   					team: 'Red Bull',
	   					engine: 'Renault'
	   				}] 
	   			}, {
	   				name: 'Nico Rosberg',
	   				titles: [{
	   					year: 2016,
	   					team: 'Mercedes' 
	   				}]
	   			}]
	   		}],
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
	   				color: index == 2 ? 'warning' : null,	   				
	   				text: `Hello<br>${firstNames[index]}`
	   			}
	   		}),
	   		options3: ['info', 'report', 'check_circle', 'warning', 'notification_important'].map((icon, index) => {
	   			return {
	   				id: icon,
	   				icon,
	   				color: index == 2 ? 'success' : null,
	   				text: `${firstNames[index]}`
	   			}
	   		}),
	   		option1: [2],
	   		option2: null,
	   		option3: null,
	   		option4: [],
	   		lorenIpsun: (function () {
	   			let line = firstNames.join(' ')
	   			let lines = []
	   			for (let i=0; i<100; i++)
	   				lines.push(line)
	   			return lines.join('<br>')
			})(),
			openDialog: null,
			showDropdown: false,

			showUserDropdown: false
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
    	},

    	showAlert: function () {
    		this.$alert('This is an alert!')
    		.then(() => {
    			console.log('Exibiu o primeiro $alert')
    			return this.$alert('Another alert!', null, 'error')
			})
			.then(() => {
				console.log('Exibiu o segundo $alert')
				alert('This is a native alert')
			})    			
    	},

    	showConfirm: function () {
    		this.$confirm('Do you want to proceed?', 'Confirmation', 'warning')
    		.then(() => {
    			alert('User clicked OK')
    		})
    		.catch(() => {
    			alert('User clicked cancel')
    		})
    	},

    	showConfirmOptions: function () {
    		this.$confirm({
    			text: 'This action will probably break your computer. Are you sure you want to ahead?',
    			title: 'Danger zone!',
    			type: 'danger',
    			okButtonText: 'Yes'
    		})
    		.then(() => {
    			alert('Yes')
    		})
    		.catch(() => {
    			alert('No')
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
