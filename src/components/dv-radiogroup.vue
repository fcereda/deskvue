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
			maxId: 0,
			selectedRadio: null
		}
	},

	watch: {
		value: function () {
			this.selectedRadio = this.radios.find(radio => radio.thisId == this.value)
			this.updateRadioValues()
		}
	},

	methods: {

		addRadio: function(radio) {
			if (radio.id === undefined) {
				this.maxId += 1
				radio.setId(this.maxId)
			}
			else {
				this.maxId = Math.max(radio.id, this.maxId)
			}
			radio.$on('input', (e) => {		
				this.$emit('input', radio.thisId)
			})

			this.radios.push(radio)
			if (radio.id == this.value) {
				this.selectedRadio = radio
				this.updateRadioValues()
			}
		},

		removeRadio: function (radio) {
			console.log('removing radio')
			radio.$on('input', null)
			let index = this.radios.indexOf(radio)
			this.radios.splice(index, 1)
		},

		updateRadioValues: function () {
			this.radios.forEach(radio => {
				radio.setValue(radio == this.selectedRadio)
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