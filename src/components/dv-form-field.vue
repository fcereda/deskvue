<template>

<div :style="containerStyle">
	<div 
		class="textbox"
		:class="divClass"
		ref="div"
	>

		<div class="slot" :class="slotClass" ref="slot">
		<slot></slot>
		</div>

		<label class="dv-input-label" :class="labelClass" @click="setFocus">
			{{ label }}
			<span v-if="showLabelIcons" class="icons"><i v-for="icon in icons" class="material-icons icon">{{ icon }}</i></span>
		</label>
	</div>
</div>

</template>

<script>

import utils from './utils.js'

export default {
	props: ['display', 'width', 'label', 'placeholder', 'floating', 'rounded', 'color', 'mask', 'info', 'error', 'value', 'is-empty'],

	computed: {

		containerStyle: function () {
			let style		
			let thisDisplay = 'inline-block'
			if (this.display == 'block')
				thisDisplay = 'block'
			style = `display:${thisDisplay};`
			if (this.width) {
				style = style + `width:${this.width};`
			}
			return style
		},

		divClass: function () {
			let classes = []
			if (this.isFloating) classes.push('floating')				
			if (this.isRounded)  classes.push('rounded')
			if (this.hasFocus) {
				classes.push('focus') 
			}
			else if (this.isEmpty) {
				classes.push('empty')
			}	
			return classes.join(' ')
		},

		labelClass: function () {
			return this.hasFocus ? 'focus' : ''
		},

		// Just in case, remove later if not used 
		slotClass: function () {
			return ''
		},

		isFloating: function () {
			return utils.isPropOn(this.floating)
		},

		isRounded: function () {
			return utils.isPropOn(this.rounded)
		}

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
		console.log(this)
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
			console.log('slots:')
			console.log(this.$slots)
		},

		onInput: function (e) {
			let newValue = 	e.target.value
			this.currentValue = newValue
			this.$emit('input', newValue)
		},

	}

}

</script>

<style lang="scss">

@import './base.scss';

$focus-color: #1867c0;

.textbox {
	display: flex;
	flex-direction: column-reverse;
	margin-bottom:1em;
	font-size:14px;
	width:100%;
}

.textbox > .dv-input-label {
	font-size: 0.9em;
	font-weight: 600;
	padding-left:0.5em;
	padding-bottom:0.125em;
}

.textbox > .dv-input-label.focus {
	color: $focus-color;
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



.textbox.floating {
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	border: 1px solid #aaa;
}

.textbox.floating.rounded {
	border-radius:8px;
}

.textbox.floating > .dv-input-label {
	box-sizing:border-box;
	position: absolute;	
	top: 0em;
	left: 0em;
	width:100%;
	padding-left: 0.5em;
	padding-top: 0.75em;
	font-size:0.8em;
	line-height:80%;
	transition: 0.2s all;
}


.textbox.floating.focus {
	//outline:2px solid $focus-color;
	border:1px solid $focus-color;
	box-shadow: 0px 0px 2px 0px $focus-color;
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
	/*width: calc(100% - 0.9em); */
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
	padding-top: calc(1.125em + (2.25em - 1em) / 2 + 0.125em);
	left: 0;
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