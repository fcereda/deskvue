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
	>
		<div class="slot" :class="slotClass" ref="slot">
		<slot></slot>
		</div>

		<label v-if="label" class="dv-input-label" :class="labelClass" @click="setFocus">
			{{ label }}
			<span v-if="showLabelIcons" class="icons"><i v-for="icon in icons" class="material-icons icon">{{ icon }}</i></span>
		</label>
	</div>
</div>

</template>

<script>

import utils from './utils.js'
import props from './props.js'

export default {
	props: {
		...props.fieldProps,

		placeholder: {
			type: String,
			required: false
		},

		message: {
			type: String,
			required: false
		},

		floating: {
			type: Boolean,
			default: false
		},

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

		// Just in case, remove later if not used 
		slotClass: function () {
			return ''
		},

	},

	data: function () {
		return {
			currentValue: this.value,
			hasFocus: false,
			showLabelIcons: false,
			icons: ['help_outline']
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

}

.textbox {
	display: flex;
	flex-direction: column-reverse;
/*
	margin-bottom:1em;
*/
	font-size:14px;
	width:100%;
}

.textbox.no-label {
	margin-bottom: 0;
}

.textbox > .dv-input-label {
	font-size: 0.9em;
	font-weight: 600;
	padding-left:0.5em;
	padding-bottom:0.125em;
	text-align:left;

	&.focus {
		color: var(--focus-color);
	}

	&.disabled {
		color: var(--color-disabled);
	}
}


/*
.textbox:not(.floating).rounded > input.dv-input-text {
	border-radius: 8px;
}
  
.textbox:not(.floating) > input.dv-input-text:focus {
    outline: 2px solid $focus-color; 
} 
*/ 
  
.textbox:not(.floating).rounded > .slot {
	border-radius: 8px;
}
  
 .textbox:not(.floating) > .slot:focus {
    outline: 2px solid $focus-color; 
} 

.textbox.rounded {
	border-radius: 8px;
}

.textbox.floating {
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	border: $border;
	border-color: var(--border-color);
	box-shadow: 0px 0px 1px 0px var(--box-shadow-color);
}

.textbox.no-border {
	border-color: transparent;
}

/*
.textbox.floating.inset {
	box-shadow: inset 0px 1px 6px 1px $border-color;
}

.textbox.floating.inset > input{
	background-color: transparent;
}
*/

.textbox.floating.rounded {
	border-radius:8px;
}

.textbox.floating > .dv-input-label {
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


.textbox.floating.focus {
	border:1px solid var(--focus-color);
	box-shadow: 0px 0px 2px 0px var(--focus-color);
}


.textbox.floating.focus > .slot:focus {
    outline: 2px solid transparent; 
}  

.textbox.floating > .slot {
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

.textbox.floating.empty > .slot {
	opacity:0.0;
	transition: 0.25s all;
	box-sizing: border-box;	
}

.textbox.floating.empty > .dv-input-label {
	font-size:1em;

	position: absolute;
	/* padding-top: calc(1.125em + (2.25em - 1em) / 2 + 0.125em); */
	padding-top: calc((2.25em + 0.25em) / 2);

	left: 0px;
	right:0;	
	bottom: 0;
	top:0;

	cursor: text;	
	transition: 0.25s all;
}

.icons {
	float:right;
	transform:translateY(-0.375em);
	padding-right:0.125em;
}

.textbox.floating:not(.empty) > label > span.icons {
	transform:translateY(-0.5em);
}

.icon {
	font-size:1.5em;
	padding-left:0;
}

.textbox.floating:not(.empty) > label > span.icons > .icon {
	padding-left:0;
}

.textbox > .iconbar {
	position: absolute;
	right:0;
	top:0;
	padding:0.25em;
	color:#656565;
}

</style>