<template>

<div style="background-color:#eee;">

	<h3>Form controls</h3><p>

	<br>
	<div style="text-align:left">

		Search Google:<br>
		<dv-combo>
			<input class="dv-input-text" v-model="text2">
			<i class="material-icons" style="cursor:pointer">search</i>
		</dv-combo>


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
<br><br>
		<dv-combo>
			<dv-button class="border">OK</dv-button>
			<dv-button class="border" wide>Cancelar</dv-button>			
		</dv-combo>



		<br><br>


		Who are you going to vote for? <br>
		<dv-input-select search placeholder="Selecione seu candidato">
		<option placeholder>Please click here...</option>
			<option v-for="tag in tags">{{ tag }}</option>
		</dv-input-select>

		<br><br>
		Who do you you think will win?<br>
		<dv-input-select multiple search rounded no-border>
			<option v-for="pilot in currentPilots">{{ pilot }}</option>
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
import dvTextbox from './dv-textbox.vue'
import dvSelectbox from './dv-selectbox.vue'
import dvInputSelect from './dv-input-select.vue'

export default {

	components: {
		dvButton,
		dvCombo,
		dvTextbox,
		dvSelectbox,
		dvInputSelect
	},

	data: function () {
		return {
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
	}

}

</script>