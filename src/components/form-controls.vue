<template>

<div style="background-color:#eee;">

	<h3>Form controls</h3><p>

	Text inputs:<br>
		<dv-textbox
			:value="nativePilot"
			style="float:left"
			width="10em"
		></dv-textbox>			


	<dv-input-text v-model="text1" placeholder="Type here" style="float:left;"></dv-input-text>
	<dv-input-text v-model="text1" placeholder="Type here" style="float:left;"></dv-input-text>

	<br>
	<dv-input-text v-model="text2" placeholder="What's up?" rounded></dv-input-text>
	<br>
	Password:
	<br>
	<dv-input-text 
		v-model="password1" 
		password 
		pattern=".{6,}"
		minlength="6"
		maxlength="10"
		rounded
	></dv-input-text> 

	<br><br>
	Number:
	<br>
	<dv-input-number v-model="number1" placeholder="Type a number" width="20em" :min="100" :max="1999" :step="5"></dv-input-number> {{ number1 }}

	<br><br>
	<div style="text-align:left">

		<dv-iconbutton>save</dv-iconbutton>
		<dv-iconbutton>search</dv-iconbutton> 
		Hello World!

		<br>Slim buttons:
		<dv-iconbutton slim flat>save</dv-iconbutton>
		<dv-iconbutton slim flat>search</dv-iconbutton> 


		<br>

		Simple combo:<br>
		<dv-combo>
			<i class="material-icons" style="cursor:pointer">search</i>
			<input class="dv-input-text" v-model="text2">
			<dv-iconbutton link>keyboard_arrow_up</dv-iconbutton>			
			<dv-iconbutton flat>keyboard_arrow_down</dv-iconbutton>
			<dv-button class="border">OK</dv-button>			
		</dv-combo>

		<br><br>    
		    <dv-button success small short>> Run</dv-button><dv-button success small short><dv-icon>keyboard_arrow_right</dv-icon> Run &nbsp; <small>Ctrl-R</small></dv-button>

		<br><br>    	
		Search Google and any other sites you'd like:<br>
		<div style="background-color:yellow;">
			<dv-combo width="10em">
				<input class="dv-input-text" v-model="text2">
				<dv-icon rotate="90deg">search</dv-icon>
			</dv-combo>

			<dv-combo width="10em">
				<dv-icon>save</dv-icon>
				<input class="dv-input-text" v-model="text2">

				<i class="material-icons">save</i>
				<dv-iconbutton>search</dv-iconbutton>
			</dv-combo> 

			<dv-combo width="15em">
				<dv-button>save</dv-button>
				<input class="dv-input-text" v-model="text2">
				<dv-iconbutton>search</dv-iconbutton>			
			</dv-combo>
		</div>	



		<br>This is a combo component   
		<div style="width:20px"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path></svg></div>
		<br>
		<dv-combo>
			<i class="material-icons">save</i>
			<input class="dv-input-text" v-model="text2">
			<dv-button tall class="border"><dv-icon>save</dv-icon><br>Save</dv-button>
			<dv-button tall class="border"><dv-icon>save</dv-icon><br>Save&nbsp;or store</dv-button>
			<dv-iconbutton link>keyboard_arrow_down</dv-iconbutton>
		</dv-combo>

		<br>This is a combo component<br>
		<dv-combo width="30em" rounded>
			<i class="material-icons">drag_indicator</i>
			<i class="material-icons">save</i>
			<input class="dv-input-text" v-model="text2">
			<dv-button tall class="border">OK</dv-button>
			<dv-button class="border">Cancelarrr</dv-button>			
			<i class="material-icons" style="cursor:pointer">keyboard_arrow_down</i>
		</dv-combo>

		<dv-combo width="30em" rounded>
			<i class="material-icons">drag_indicator</i>
			<i class="material-icons">save</i>
			<input class="dv-input-text" v-model="text2">
			<dv-button class="border">OK</dv-button>
			<dv-button class="border">Cancelarrr</dv-button>			
			<dv-iconbutton>keyboard_arrow_down</dv-iconbutton>
		</dv-combo>

		<dv-combo width="30em" rounded>

			<dv-icon>search</dv-icon>
	
			<dv-input-select multiple search rounded no-border>
				<option v-for="pilot in currentPilots">{{ pilot }}</option>
			</dv-input-select>
			<dv-button primary>OK</dv-button>
		</dv-combo>

		<br>

		<dv-combo width="30em" rounded>

			<dv-icon>search</dv-icon>
	
			<dv-input-select search rounded no-border>
				<option v-for="pilot in currentPilots">{{ pilot }}</option>
			</dv-input-select>
			<dv-button warning>OK</dv-button>
		</dv-combo>		<br>	

<br><br>
		<dv-combo rounded>
			<dv-button class="border"><dv-icon>check_circle_outline</dv-icon>  OK</dv-button>
			<dv-button class="border" wide><dv-icon>cancel</dv-icon> Cancelar</dv-button>			
		</dv-combo>

		<br><br>Onde procurar:<br>

		<dv-combo rounded>
			<dv-label> &nbsp;Cidade:</dv-label>
			<input class="dv-input-text" v-model="cidade" />
			<dv-label class="border-left"> &nbsp;Raio:</dv-label>
			<dv-select-native v-model="raio" width="10.5em">
				<option v-for="r in raios" :value="r">{{ r }} km</option>
			</dv-select-native>	
		</dv-combo>

<div style="position:absolute;
	background-color:transparent;
	top:100px;
	left:100px;
	width:100px;
	height:200px;
	border:4px solid rgba(128,128,128,0.75);
	border-radius:0px;
	border-bottom-left-radius:16px;
	border-top:none;
	border-right:none;"></div>

		<br><br>

		A native select component<br>
		<dv-select-native
			v-model="nativePilot"
			style="float:left;">
			<option v-for="pilot in pilots">{{ pilot }}</option>				
		</dv-select-native>

		<dv-select-native
			
			width="10em"
			v-model="nativePilot"
			style="float:left;">
			<option v-for="pilot in pilots">{{ pilot }}</option>				
		</dv-select-native>

		<dv-textbox
			:value="nativePilot"
			style="float:left"
			width="10em"
		></dv-textbox>			

		<br><br>

		A dropdown component<br>

		<dv-dropdown>
			<template slot="head"><span style="padding-left:0.5em; padding-right: 0.5em; font-size:14px;">{{ nativePilot }}</span></template>
			<template slot="pane"><div v-for="pilot in pilots" @click="closePane" @keydown="closePane">{{ pilot }}</div></template>
		</dv-dropdown>	

		<br><br>


		Who are you going to vote for? <br>
		<dv-input-select search placeholder="Selecione seu candidato">
		<option placeholder>Please click here...</option>
			<option v-for="tag in pilots">{{ tag }}</option>
		</dv-input-select>

		<br><br>
		Who do you you think will win?<br>
		<dv-input-select multiple search rounded no-border>
			<option v-for="pilot in currentPilots">{{ pilot }}</option>
		</dv-input-select>
	
		<br><br>
		Who are you not voting for in any circumstance?<br>
		<dv-input-select multiple search rounded>
			<option v-for="tag in pilots">{{ tag }}</option>
		</dv-input-select>

		<br><br>
		<dv-selectbox
			label="Who was the best Brazilian driver of the 70s?"
			search
			floating
			
			:value="myPilots"
			style="float:left">
			<option v-for="pilot in pilots">{{ pilot }}</option>				
		</dv-selectbox>
		<dv-textbox 
			label="Lotus ppp" 
			floating 
			:rounded="false" 
			placeholder="Type your first name here" 
			v-model="text4"
			style="float:left"
		></dv-textbox>

		<br><br>
		<dv-selectbox
			label="Who was the best Brazilian driver of the 70s?"
			search
			rounded
			:value="myPilots"
			style="float:left;">
			<option v-for="pilot in pilots">{{ pilot }}</option>				
		</dv-selectbox>
		<dv-textbox 
			label="Lotus ppp" 
			rounded 
			placeholder="Type your first name here" 
			v-model="text4"
			style="float:left"
		></dv-textbox>

		<br><br>
		<dv-selectbox
			label="Who was the best Brazilian driver of the 70s?"
			search
			rounded
			multiple
			:value="myPilots"
			style="float:left;">
			<option v-for="pilot in pilots">{{ pilot }}</option>				
		</dv-selectbox>
		<dv-textbox 
			label="Lotus ppp" 
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

	Datepicker

	<dv-datepicker not-after="2019-04-04" v-model="dateValue"></dv-datepicker>&nbsp; 
	<dv-datepicker range rounded v-model="dateRange"></dv-datepicker>
	<br><br>{{ dateValue }}


</div>

</template>

<script>

import dvButton from './dv-button.vue'
import dvCombo from './dv-combo.vue'
import dvDatepicker from './dv-datepicker.vue'
import dvDropdown from './dv-select-dropdown.vue'
import dvIcon from './dv-icon.vue'
import dvIconbutton from './dv-iconbutton.vue'
import dvInputNumber from './dv-input-number.vue'
import dvInputText from './dv-input-text.vue'
import dvLabel from './dv-label.vue'
import dvTextbox from './dv-textbox.vue'
import dvSelectbox from './dv-selectbox.vue'
import dvSelectNative from './dv-select-native.vue'
import dvInputSelect from './dv-input-select.vue'

export default {

	components: {
		dvButton,
		dvCombo,
		dvDatepicker,
		dvDropdown,
		dvIcon,
		dvIconbutton,
		dvInputNumber,
		dvInputText,
		dvLabel,
		dvTextbox,
		dvSelectbox,
		dvSelectNative,
		dvInputSelect
	},

	data: function () {
		return {
			rotation: 45,
	   		pilots: ['Wilson Fittipaldi', 'Emerson Fittipaldi', 'José Carlos Pace', 'Ingo Hoffman', 'Alex Dias Ribeiro', 'Nelson Piquet'],
	   		currentPilots: ['Hamilton', 'Bottas', 'Vettel', 'Raikkonen', 'Max', 'Riccardo', 'Alonso', 'Leclerc', 'Grosjean'],
	   		myPilots: null,
	   		nativePilot: null,
	   		text1: '',
	   		text2: 'John Stewart',
	   		text3: '',
	   		text4: 'Emerson Fittipaldi',
	   		text5: 'Niki Lauda',
	   		text6: 'Nelson Piquet',
	   		password1: null,
	   		number1: null,
	   		raios: [25, 50, 100, 200, 300, 500, 1000],
	   		raio: '',
	   		cidade: '',
	   		dateValue: new Date(),
	   		dateRange: null
		}
	},

	mounted: function () {
		setInterval(() => {
			this.rotation += 15
			if (this.rotation >= 360)
				this.rotation -= 360
		}, 200)
	},

	methods: {
		closePane: function () {
			console.log('close pane')
			this.$emit('close')
		}
	}

}

</script>