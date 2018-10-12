<template>

<button 
	class="dv-button"
	:class="buttonClass"
	@click="onclick"
><slot></slot></button>	


</template>

<script>

import utils from './utils.js'

const booleanProps = [
	'active',
	'primary',
	'secondary',
	'success',
	'info',
	'danger',
	'error',
	'warning',
	'noFocus',
	'wide',
	'small',
	'big',
	'short',
	'tall',
	'pill',
	'circle'
]

export default {

	props: booleanProps, 

	computed: {

		buttonClass: function () {
			return this.classes.join(' ')
		},

	},

	methods: {

		updateClasses: function () {
			this.classes = utils.getComponentClasses(this, booleanProps)
		},

		onclick: function () {
			this.$emit('click')
		}

	},

	data: function () {
		return {
			classes: utils.getComponentClasses(this, booleanProps)
		}
	},

	mounted: function () {
		booleanProps.forEach(prop => {
			this.$watch(prop, function () {
				this.updateClasses()
			})
		})
	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-button {
  padding-left: 1.0em;
  padding-right: 1.0em;
  background-color: #fff;
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;		
  outline: 1px transparent;
  min-width: 5em;
  line-height: 150%;
  cursor: pointer;
  user-select: none;
  font-family: inherit;
  height: $form-control-height;
  margin-left: 0.4em;
}  

.no-border {
    border: 1px solid transparent;
}  
  
.no-border:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 0px;
}  
  
.wide {
    min-width: 10em;
}  
  
.tall {
    height: 4.8em !important;
  }  
  
.short {
    height: 2em;
    line-height:80%;
  }  

.circle {
    min-width: $form-control-height !important;
    height: $form-control-height;
    padding-left: 2px;
    padding-right: 2px;
    text-align: center;
    border-radius: 50em;
 }  

.pill {
    border-radius: 50em;
}  
  
.small {
    font-size:0.75em;
 }  
 
.big {
    font-size:1.5em;
  }  
  
  
.dv-button:hover {
    filter: drop-shadow(0px 3px 3px gray);
}  
      
.dv-button:active,
.dv-button.active {
    transform: translateY(1px);
    box-shadow: inset 0px 2px 2px 2px rgba(0,0,0,0.15) !important;
    filter: none;
}  

.btn-group > .dv-button.active {
    transform: none;
    filter: brightness(85%);
}  
  

.dv-button:focus {
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.25);
}    

.noFocus:focus {
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 0px 0px;
}    
  
 
.dv-button.primary,
.dv-button.danger,
.dv-button.error,
.dv-button.success,
.dv-button.warning {
	color: white;
	font-weight: 700;
}

.dv-button.primary {
    background-color: $bg-color-primary;
}

.dv-button.secondary {
	background-color: $bg-color-secondary;
	color: white;	
}

.dv-button.warning {
    background-color: $bg-color-warning;
}  

.dv-button.danger {
	background-color: $bg-color-danger;
}

.dv-button.error {
	background-color: $bg-color-danger;
}

.dv-button.success {
	background-color: $bg-color-success;
}

.dv-button.info {
	background-color: $bg-color-info;
}

.dv-button.dark {
	background-color: $bg-color-dark;
}

  
</style>