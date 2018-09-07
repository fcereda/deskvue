<template>

<div @keydown="onKeydown">
	<slot></slot>
</div>	

</template>

<script>

export default {

	props: ['value'],

	data: function () {
		return {
			radios: [],
			selectedRadio: null
		}
	},

	watch: {

		value: function () {
			console.log('New value: ' + this.value)

		}

	},

	methods: {

		addRadio: function(radio) {
			console.log('vai adicionar um radio')
			console.log(radio)
			radio.$on('input', (e) => {
				console.log('radio onInput')
				console.log(e)
				if (e) {
					this.selectedRadio = radio
				}
				this.updateRadioValues()
				this.$emit('input', radio.id)
			})
			this.radios.push(radio)
			console.log(this.radios)
		},

		updateRadioValues: function () {
			this.radios.forEach(radio => {
				radio.value = radio == this.selectedRadio
				//this.$set(radio.$props, 'value', radio == this.selectedRadio)
			})
		},

		onKeydown: function (e) {
			const validKeys = [
				'ArrowUp', 'ArrowLeft',
				'ArrowDown', 'ArrowRight',
				'Home', 'End', 'Tab'
			]
			if (validKeys.indexOf(e.key) < 0)
				return

			// Handling the Tab key:
			// if the user presses the Tab key, focus must be moved to the
			// element next to dv-radiogroup, not to the element next to the 
			// currently focused dv-checkbox. 
			// We do this by moving focus to the last dv-checkbox inside
			// the radiogroup, and not preventing default (thus allowing the
			// DOM to move focus to the next focusable element, outside the
			// radiogroup)
			// The same logic applies to Shift-Key
			if (e.key != 'Tab') {
				e.preventDefault()		
			}

			const currentFocusedRadio = this.radios.find(radio => radio.$el.contains(document.activeElement))
			let index = this.radios.indexOf(currentFocusedRadio)
			switch (e.key) {
				case 'ArrowUp':
				case 'ArrowLeft': {
					index -= 1
					if (index < 0)  {
						index = this.radios.length - 1
					}
					break
				}
				case 'ArrowDown':
				case 'ArrowRight': {
					index += 1
					index = index % this.radios.length
					break
				}	
				case 'Home':
					index = 0
					break;
				case 'End':
					index = this.radios.length - 1
					break
				case 'Tab':
					if (e.shiftKey)
						index = 0
					else
						index = this.radios.length - 1
			}
			this.selectedRadio = this.radios[index]
			this.selectedRadio.$el.focus()
		}

	}
}

</script>