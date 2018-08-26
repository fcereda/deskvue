<template>

	<div class="btn-group" @keydown="onkeydown" @click="onclick">
		<slot></slot>
	</div>  

</template>

<script>

export default {

	props: ['type', 'value'],

	data: function () {
		return {}
	},

	computed: {

		radio: function () {
			return this.type == 'radio'
		},

		check: function () {
			return this.type == 'check'
		},

	},

	watch: {
		value: function (newValue) {
			return
			// NADA AQUI FUNCIONOU:
			this.$children.forEach((component, index) => {
				component.$props.active = (index == newValue)
				console.log(component)
			})
		}
	},

	methods: {
		onkeydown: function (e) {
			if (e.key != 'ArrowLeft' && e.key != 'ArrowRight')
				return
			let activeElement = document.activeElement
			let indexActiveElement = this.$children.map(component => component.$el).indexOf(activeElement)
			if (e.key == 'ArrowLeft') 
				indexActiveElement -= 1
			else
				indexActiveElement = (indexActiveElement + 1) % this.$children.length
			if (indexActiveElement < 0)
				indexActiveElement = this.$children.length - 1
			this.$children[indexActiveElement].$el.focus()
		},

		onclick: function (e) {
			let indexTargetElement = this.$children.map(component => component.$el).indexOf(e.target)
			if (indexTargetElement < 0)
				return
			if (this.radio)  {
				this.$emit('input', indexTargetElement)
			}
		}
	}

}

</script>


<style>


.btn-group > .dv-button {
    margin-left: 0px !important;
    margin-right: 0px !important;
    //border-radius: 0px;
    //background-color: #f99;
}  
  
.btn-group > .dv-button {
    min-width: 1em;
  }  

.btn-group > .dv-button:nth-child(1) { 
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}  
  
.btn-group > .dv-button:nth-child(1n+2) {
    border-left: 1px solid transparent;
    border-radius: 0px;
    //border-top-right-radius: 0px;
    //border-bottom-right-radius: 0px;
  }  

.btn-group > .dv-button:nth-child(1n+2):focus {
    border: 1px solid rgba(0, 0, 0, 0.4);
}  
  
.btn-group > .dv-button:nth-last-child(1) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    // border-left: 1px solid transparent;
}    


</style>