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
			<div class="dv-dialog-header">
				<div class="dv-dialog-title" v-html="title"></div>
				<div 
					class="dv-dialog-close-button" 
					v-if="closeButton" 					
					@click="close">
					<dv-iconbutton flat>close</dv-iconbutton>
				</div>
			</div>
			<div class="dv-dialog-text">{{ text }}<slot></slot></div>
			<div class="dv-dialog-buttons">
				<dv-button 
					v-for="btn in buttonsObj" 
					:primary="btn.type == 'primary'"
					:danger="btn.type == 'danger' || btn.type == 'error'"
					:warning="btn.type == 'warning'"
					:success="btn.type == 'success'"
					:dark="btn.type == 'dark'"
					:info="btn.type == 'info'"
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
		buttons: [Array, String, Object],
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
			if (utils.defaultColors.indexOf(this.type) >= 0) {
				return this.type
			}
			return ''
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
				if (typeof btn == 'string') {
					return {
						text: btn,
						type: index > 0 ? null : this.type,
					}
				}
				if (typeof btn == 'object') {
					return {
						text: btn.text || '',
						type: btn.type
					}
				}
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
				})
			}
			else {
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

		onBackgroundKeydown: function (e) {
			if (e.key == 'Escape' && this.closeOnEsc) {
				this.close()
			}
			e.preventDefault()
			e.stopPropagation()
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

$border-top-width: 5px;

div.dv-dialog-background {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.25);
	z-index:200;
	text-align: center;
	height: 100%;
	display: flex;
	flex-direction: column;
	outline: none;
}

.dv-dialog {
	min-width: 20em;

	background-color: #fff;
	border-radius: 4px;
	text-align: left;
	flex-direction: column;
	outline: none;
	box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.75);

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

	& > .dv-dialog-header {
		display: flex;

		& > .dv-dialog-title {
			font-size: 16px;
			color: rgba(0, 0, 0, 0.5);
			padding-top: 0.75em;
			padding-left: $font-size;
			flex: 1;
		}

		& > .dv-dialog-close-button {
			display: inline-block;
			float: right;

			& > button {
				border-radius: 4px;
			}
		}

	}


	& > .dv-dialog-text {
		padding: 1em;
		padding-top: 2em;
		font-size: $font-size;
	}

	& > .dv-dialog-buttons {
	  	border-top: 1px solid #ccc;
	  	padding: 0.8em;
	  	text-align:right;
	  	position: relative;

	  	&:after {
	  		content: "";
	  		width: 100%;
	  		height: 2px;
	  		border-top: 1px solid #ccc;
	  		border-bottom: 1px solid #ccc;
	  		position: absolute;
	  		left: 0px;
	  		bottom: 2px;
	  	}	
	}


}

</style>
