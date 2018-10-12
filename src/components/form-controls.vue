<template>

<div style="background-color:#eee;">

	<h3>Form controls</h3><p>

	<br>
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
				<i class="material-icons" style="cursor:pointer">search</i>
			</dv-combo> 

			<dv-combo width="15em">
				<dv-button>save</dv-button>
				<input class="dv-input-text" v-model="text2">
				<dv-iconbutton>search</dv-iconbutton>			
			</dv-combo>
		</div>	



		<br>This is a combo component<br>
		<dv-combo>
			<i class="material-icons">save</i>
			<input class="dv-input-text" v-model="text2">
			<dv-button class="border">OK</dv-button>
			<i class="material-icons" style="cursor:pointer">keyboard_arrow_down</i>
		</dv-combo>

		<br>This is a combo component<br>
		<dv-combo>
			<i class="material-icons">drag_indicator</i>
			<i class="material-icons">save</i>
			<input class="dv-input-text" v-model="text2">
			<dv-button class="border">OK</dv-button>
			<dv-button class="border" wide>Cancelar</dv-button>			
			<i class="material-icons" style="cursor:pointer">keyboard_arrow_down</i>
		</dv-combo>


		<dv-combo>

			<dv-icon>search</dv-icon>
	
			<dv-input-select multiple search rounded no-border>
				<option v-for="pilot in currentPilots">{{ pilot }}</option>
			</dv-input-select>
			<dv-button primary>OK</dv-button>
		</dv-combo>

		<br>

		<dv-combo>

			<dv-icon>search</dv-icon>
	
			<dv-input-select search rounded no-border>
				<option v-for="pilot in currentPilots">{{ pilot }}</option>
			</dv-input-select>
			<dv-button warning>OK</dv-button>
		</dv-combo>		<br>	

<br><br>
		<dv-combo>
			<dv-button class="border"><dv-icon>check_circle_outline</dv-icon>  OK</dv-button>
			<dv-button class="border" wide><dv-icon>cancel</dv-icon> Cancelar</dv-button>			
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


</div>

</template>

<script>

import dvButton from './dv-button.vue'
import dvCombo from './dv-combo.vue'
import dvIcon from './dv-icon.vue'
import dvIconbutton from './dv-iconbutton.vue'
import dvTextbox from './dv-textbox.vue'
import dvSelectbox from './dv-selectbox.vue'
import dvInputSelect from './dv-input-select.vue'

export default {

	components: {
		dvButton,
		dvCombo,
		dvIcon,
		dvIconbutton,
		dvTextbox,
		dvSelectbox,
		dvInputSelect
	},

	data: function () {
		return {
			rotation: 45,
	   		pilots: ['Wilson Fittipaldi', 'Emerson Fittipaldi', 'José Carlos Pace', 'Ingo Hoffman', 'Alex Dias Ribeiro', 'Nelson Piquet'],
	   		currentPilots: ['Hamilton', 'Bottas', 'Vettel', 'Raikkonen', 'Max', 'Riccardo', 'Alonso', 'Leclerc', 'Grosjean'],
	   		myPilots: null,
	   		text1: '',
	   		text2: 'John Stewart',
	   		text3: '',
	   		text4: 'Emerson Fittipaldi',
	   		text5: 'Niki Lauda',
	   		text6: 'Nelson Piquet',
		}
	},

	mounted: function () {
		setInterval(() => {
			this.rotation += 15
			if (this.rotation >= 360)
				this.rotation -= 360
		}, 200)
	}

}

</script>