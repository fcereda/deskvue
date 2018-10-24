<template>

<div>

<div 
	class="dv-dialog-background" 
	v-if="show"
	ref="background"
	@click="onBackgroundClick"
	@keydown.native="onBackgroundKeydown"
	>

	<div style="flex:1">&nbsp;</div>
	<div style="display:flex;">
		<div  style="flex:1">&nbsp;</div>
		<div 
			class="dv-dialog"
			:class="dialogClass"
			@click="onDialogClick"
			ref="dialog"
			tabindex="1"
		>
			<div class="dv-dialog-header" :class="title ? '' : 'no-title'">
				<div 
					class="dv-dialog-title" 
					v-html="title"></div>
				<div 
					class="dv-dialog-close-button" 
					v-if="closeButton" 					
					@click="close">
					<dv-iconbutton :style="title ? 'color:white;' : ''">close</dv-iconbutton></div>
			</div>
			<div class="dv-dialog-text" :class="title ? '' : 'no-title'">{{ text }}<slot></slot></div>
			<div class="dv-dialog-buttons">
				<dv-button 
					v-for="btn in buttonsObj" 
					v-bind="btn"
					@click="onButtonClick(btn)">{{ btn.text  }}</dv-button>
			</div>	
		</div>	
		<div  style="flex:1">&nbsp;</div>		
	</div>	
	<div style="flex:2">&nbsp;</div>

</div>

</div>

</template>


<script>

import utils from './utils.js'

import dvButton from './dv-button.vue'
import dvIconbutton from './dv-iconbutton.vue'
import dvPane from './dv-pane.vue'


function trapFocus(element) {
    var focusableEls = element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'),
        firstFocusableEl = focusableEls[0],
        lastFocusableEl = focusableEls[focusableEls.length - 1]
    const KEYCODE_TAB = 9;

    const keydownWatcher = function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) { 
            return; 
        }

        if ( e.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    }

    element.addEventListener('keydown', keydownWatcher)
    return keydownWatcher
}

export default {

	components: {
		dvButton,
		dvIconbutton,
		dvPane
	},

	props: {
		show: Boolean,
		title: String,
		text: String,
		size: String,
		width: String,
		buttons: {
			type: [Array, String, Object],
			default: 'OK'
		},
		closeOnEsc: {
			type: Boolean,
			default: true
		},
		closeOnClick: {
			type: Boolean,
			default: false
		},
		closeButton: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: 'primary'
		}
	},

	data: function () {
		return {
			keydownWatcher: null,
			originalOverflow: null,
		}
	},

	computed: {
		dialogClass: function () {
			let classes = []
			if (utils.defaultColors.indexOf(this.type) >= 0) {
				classes.push(this.type)
			}
			if (['small', 'large'].indexOf(this.size) >= 0) {
				classes.push(this.size)
			}
			return classes
		},

		buttonsObj: function () {
			let buttons = this.buttons
			let type = this.type || 'primary'

			if (!buttons.map) {
				switch (buttons) {
					case 'ok-cancel': 
						buttons = ['OK', 'Cancel']
						break
					case 'yes-no': 
						buttons = ['Yes', 'No']
						break
					case 'ok': 
						buttons = [{
							text: 'OK',
							type
						}]
						break
					default: 
						buttons = [buttons]
				}	
			}

			return buttons.map((btn, index) => {
				let btnObj = {}
				if (typeof btn == 'string') {
					btnObj = {
						text: btn,
						type: index > 0 ? null : this.type,
					}
				}
				if (typeof btn == 'object') {
					btnObj = {
						text: btn.text || '',
						type: btn.type
					}
				}
				if (btnObj.type) {
					btnObj[btnObj.type] = true
				}
				return btnObj
			}).reverse()
		}
	},

	watch: {
		show: function () {
			if (this.show) {
				this.$nextTick(() => {
					this.originalOverflow = document.body.style.overflow
					document.body.style.overflow = 'hidden'
					this.keydownWatcher = trapFocus(this.$refs.dialog)
					document.addEventListener('keydown', this.onDocumentKeydown)
				})
			}
			else {
				document.removeEventListener('keydown', this.onDocumentKeydown)
				if (this.keydownWatcher) {
					const dialogEl = this.$refs.dialog
					dialogEl.removeEventListener('keydown', this.keydownWatcher)
					document.body.style.overflow = this.originalOverflow
					this.keydownWatcher = null
				}
			}	
		}
	},

	mounted: function () {
		
	},

	methods: {
		close: function () {
			this.$emit('close')
		},

		onBackgroundClick: function (e) {
			if (e.path.indexOf(this.$refs.dialog) >= 0)
				return
			if (this.closeOnClick) {
				this.close()
			}
		},

		onDocumentKeydown: function (e) {
			console.log('Keydown!')
			console.log(e.key)			
			if (e.key == 'Escape' && this.closeOnEsc) {
				this.close()
			}
		},

		onDialogClick: function (e) {
			return
		},

		onButtonClick: function (btn) {
			this.close()
			this.$emit('click', btn)
		}
	}

}

</script>


<style lang="scss">

@import './base.scss';

$border-top-width: 6px;

div.dv-dialog-background {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.15);
	z-index:200;
	text-align: center;
	height: 100%;
	display: flex;
	flex-direction: column;
	outline: none;
}

.dv-dialog {
	min-width: 20em;
	max-width: 30em;

	background-color: #fff;
	//border-radius: 4px;
	text-align: left;
	flex-direction: column;
	outline: none;
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.75);
/*

	&.primary {
		border-top: $border-top-width solid $bg-color-primary;
	}

	&.danger,
	&.error  {
		border-top: $border-top-width solid $bg-color-danger;
	}

	&.warning {
		border-top: $border-top-width solid $bg-color-warning;
	}

	&.success {
		border-top: $border-top-width solid $bg-color-success;
	}

	&.info {
		border-top: $border-top-width solid $bg-color-info;
	}

	&.seconday {
		border-top: $border-top-width solid $bg-color-secondary;
	}

	&.dark {
		border-top: $border-top-width solid $bg-color-dark;
	}
*/

	&.small {
		min-width: 17em;
		max-width: 25em;
	}

	&.large {
		min-width: 25em;
		max-width: 40em;
	}

	& > .dv-dialog-header {
		display: flex;
		background-color: $bg-color-primary;
		color: white;

		&.no-title {
			background-color: inherit;
			height:5px;
			border-top: $border-top-width solid $bg-color-primary;
		}

		& > .dv-dialog-title {
			flex: 1;
			font-weight: 500;
		}	

		&:not(.no-title) > .dv-dialog-title {
			font-size: 20px;
			padding-left: $font-size;
			padding-top: 1em;
			padding-bottom: 1em;
		}

		&.no-title > .dv-dialog-title {
			padding:0;
		}


		& > .dv-dialog-close-button {
			display: inline-block;
			float: right;

			& > button {
				border-radius: 4px;
			}
		}

		&:not(.no-title) > .dv-dialog-close-button {
			transform: translateY(1em);
			padding-right: 0.5em;			
		}

	}


	&.error,
	&.danger {
		& > .dv-dialog-header:not(.no-title) {
			background-color: $bg-color-danger;
		}

		& > .dv-dialog-header.no-title {
			border-color: $bg-color-danger;
		}
	}

	&.success {
		& > .dv-dialog-header:not(.no-title) {
			background-color: $bg-color-success;
		}

		& > .dv-dialog-header.no-title {
			border-color: $bg-color-success;
		}
	}	

	&.dark {
		& > .dv-dialog-header:not(.no-title) {
			background-color: $bg-color-dark;
		}

		& > .dv-dialog-header.no-title {
			border-color: $bg-color-dark;
		}
	}	

	& > .dv-dialog-text {
		padding: 2em 1em;	
		font-size: $font-size;

		&.no-title {
			padding-right: 3em;
		}
	}

	& > .dv-dialog-buttons {
	  	border-top: 1px solid #ccc;
	  	padding: 0.8em;
	  	text-align:right;
	  	position: relative;

	}

	& > .dv-dialog-text > h1 {
		font-size: 22px;
		font-weight: 600;
	}


}

</style>
