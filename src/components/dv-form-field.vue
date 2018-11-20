<template>


<div 
	class="dv-form-field"
	:class="containerClass"
	:style="containerStyle"
>
	<div 
		class="textbox"
		:class="divClass"
		:style="divStyle"
		ref="div"
		v-tooltip="messageTooltipObject" 
	>
		<div class="slot" :class="slotClass" ref="slot">
		<slot></slot>
		</div>

		<label 
			v-if="label" 
			class="dv-input-label" 
			:class="labelClass" 
			:style="labelStyle"
			@click="setFocus"
		>{{ label }} <span v-if="required" class="required-icon">&divonx;</span>
			<span v-if="showLabelIcons" class="icons"><i v-for="icon in icons" class="material-icons icon">{{ icon }}</i></span>
		</label>

	</div>

	<div v-if="message && !floating" class="dv-form-field-message" :style="messageStyle">
		{{ message }}
	</div>	

</div>

</template>

<script>

import utils from './utils.js'
import props from './props.js'

export default {
	props: {
		...props.fieldProps,

		isEmpty: {
			// Auxiliary property; used by components based on dv-form-field 
			type: Boolean,
			default: false
		}
	},

	computed: {

		containerClass: function () {
			let classes = []
			if (this.display == 'block')
				classes.push(this.display)
			if (this.rounded)
				classes.push('rounded')
			return classes.join(' ')
		},

		containerStyle: function () {
			let style = []
			if (this.width) {
				style.push(`width:${this.width};`)
			}
			return style.join('')
		},

		divClass: function () {
			let classes = []
			if (this.floating) classes.push('floating')				
			if (this.rounded)  classes.push('rounded')
			if (this.noBorder) classes.push('no-border')	
			if (!this.label)   classes.push('no-label')	
			if (this.hasFocus) {
				classes.push('focus') 
			}
			else if (this.isEmpty) {
				classes.push('empty')
			}	
			return classes.join(' ')
		},

		divStyle: function () {
			return utils.computeColorStyle(this.color)
		},

		labelClass: function () {
			if (this.disabled)
				return 'disabled'
			return this.hasFocus ? 'focus' : ''
		},

		labelStyle: function () {
			// Check if really necessary 
			let color = `black`
				if (this.color) {
				color = utils.computeColorVar(this.color)
			}
			return `--message-color: ${color};`
		},

		// Just in case, remove later if not used 
		slotClass: function () {
			return ''
		},

		messageStyle: function () {
			if (this.color) {
				let color = utils.computeColorVar(this.color)
				return `color:${color}`
			}
			return ''
		},

		showLabelIcons: function () { 
			return this.floating && this.message
		},

		icons: function () {
			if (this.showLabelIcons)
				return ['error']
			return null
		},

		showMessagePopup: function () {
			return this.showLabelIcons
		},

		messageTooltipObject: function () {
			if (!this.showLabelIcons)
				return null
			return { 
				content: this.message,
				classes: 'dv-input-label-tooltip ' + this.color
			}
		}

	},

	data: function () {
		return {
			currentValue: this.value,
			hasFocus: false,
		}
	},

	mounted: function () {
		let divElem = this.$refs.div
		divElem.addEventListener('focus', this.onFocusEvent, true)  
		// notice the third argument for addEventListener!   ^^^^
		// It allows us to capture a focus element in a parent of the 
		// <input> element where the focus actually takes place
		divElem.addEventListener('blur', this.onFocusEvent, true)  // <- Same as above
	},

	beforeDestroy: function () {
		let divElem = this.$refs.div
		divElem.removeEventListener('focus', this.onFocusEvent, true)
		divElem.removeEventListener('blur', this.onFocusEvent, true)
	},

	methods: {

		onFocusEvent: function (e) {
			this.hasFocus = (e.type == 'focus')
		},

		setFocus: function () {
			this.hasFocus = true
			this.$nextTick(() => this.$emit('set-focus'))
		},

	}

}

</script>

<style lang="scss">

@import './base.scss';

$focus-color: #1867c0;

.dv-form-field {
	display: inline-block;

	&.block {
		display: block;
	}

	&.rounded {
		border-radius: $border-radius-rounded;
	}

	& > .textbox {
		display: flex;
		flex-direction: column-reverse;
		font-size:14px;
		width:100%;

		&.no-label {
			margin-bottom: 0;
		}

		& > .dv-input-label {
			font-size: 0.9em;
			font-weight: 600;
			padding-left:0.5em;
			padding-right: 0.125em;
			padding-bottom:0.125em;
			text-align:left;

			&.focus {
				color: var(--focus-color);
			}

			&.disabled {
				color: var(--color-disabled);
			}

			& > .required-icon {
				color: firebrick;
			}

			&:not(.focus) > .icons > .icon {
				color: #606060;
			}	
		}

		&:not(.floating).rounded > .slot {
			border-radius: 8px;
		}

/*		  
		&:not(.floating) > .slot:focus {
		    outline: 2px solid $focus-color; 
		} 
*/
		&.rounded {
			border-radius: 8px;
		}

		&.floating {
			display: inline-block;
			position: relative;
			box-sizing: border-box;
			border: $border;
			/* border-color: var(--border-color); */
			/* box-shadow: 0px 0px 1px 0px var(--box-shadow-color); */
			box-shadow: $box-shadow;
		}

		&.floating.rounded {
			border-radius:8px;
		}

		&.no-border {
			border-color: transparent;
		}

		&.floating > .dv-input-label {
			box-sizing:border-box;
			position: absolute;	
			top: 0em;
			left: 0.125em;
			width:100%;
			padding-left: 0.5em;
			padding-top: 0.625em;
			font-size:0.8em;
			line-height:80%;
			transition: 0.2s all;
		}

	}

	& > .dv-form-field-message {
		font-size: 0.8em;
		padding-left: 0.55em;
		padding-top: 0.10em;
		color: #606060;
	}

}



.textbox.floating {
	& > .slot {
		display:block;
		position: relative;
		top: 0;
		left: 0;
		padding-top: 1.125em;
		width:100%;
		border: none;
		background-color: transparent;
		line-height: 125%;
		transition-delay: 0.2s;
		transition-duration: -0.2;
		transition-property: opacity;
	}

	&.focus {
		/*
		border:1px solid var(--focus-color);
		box-shadow: 0px 0px 2px 0px var(--focus-color);
		*/
		border: $border-focus;
		box-shadow: $box-shadow-focus;

		& > .slot:focus {
   			outline: 2px solid transparent; 
		}  

	}

	&.empty {
		& > .slot {
			opacity:0.0;
			transition: 0.25s all;
			box-sizing: border-box;	
		}

 		& > .dv-input-label {
			font-size:1em;
			position: absolute;
			padding-top: calc((2.25em + 0.25em) / 2);
			left: 0px;
			right:0;	
			bottom: 0;
			top:0;
			cursor: text;	
			transition: 0.25s all;
		}
	}

	&:not(.empty) > label > span.icons {
		transform:translateY(-0.5em);
	}

	&:not(.empty) > label > span.icons > .icon {
		padding-left:0;
	}

}		

.icons {
	float:right;
	transform:translateY(-0.375em);
	padding-right:0.125em;

	& > .icon {
		font-size:1.5em;
		padding-left:0;
	}

}

.textbox > .iconbar {
	position: absolute;
	right:0;
	top:0;
	padding:0.25em;
	color:#656565;
}


.dv-input-label-tooltip {

	&.danger {
		& > .tooltip-inner {
			background-color: var(--bg-color-danger);
		}
	
		& > .tooltip-arrow {
			border-color: var(--bg-color-danger);
		}	
	}
	
	&.success {
		& > .tooltip-inner {
			background-color: var(--bg-color-success);
		}
	
		& > .tooltip-arrow {
			border-color: var(--bg-color-success);
		}	
	}	

	&.warning {
		& > .tooltip-inner {
			background-color: var(--bg-color-warning);
			color: black;
		}
	
		& > .tooltip-arrow {
			border-color: var(--bg-color-warning);
		}	
	}	

}


</style>