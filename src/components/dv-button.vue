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

		_buttonClass: function () {
			return this.classes.join(' ')
		},

		onclick: function () {
			this.$emit('click')
		}

	},

	data: function () {
		return {
			classes: utils.getComponentClasses(this, booleanProps)
		}
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
  height: 2.25em;
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
    min-width:0.5em !important;
    width: 2.75em !important;
    text-align:center;
    height: 2.75em;
    border-radius:50%;
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
  
.purple {
    background-color: #2196F3;
    color: white;
    font-weight:700;  
    text-transform: uppercase;
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

/* 
.primary {
    background-color: $bg-color-primary;
    color: white;
    font-weight:700;
}
  
.secondary {
    background-color: #6c757d;  
    color: white;
    //font-weight: 700;
}  
  
.warning {
    background-color: #FF9800;
    color: white;
    font-weight: 700;
}  

.danger {
    background-color: #cb2431; 
    border-color: #cb2431; 
    color: white;
    font-weight: 700;
  }
  
.success {
    background-color: #28a745; 
  border-color: #28a745; 
  color: white;
  font-weight: 700;
}
  
 
.info {
  background-color: #4FC3F7; 
  color: black;
}  
 
.dark {
    background-color: #607D8B;
    border-color: #607D8B;
    color: white;
    font-weight:700;
} 
*/ 

.purple {
    background-color: #9C27B0;
    color: white;
    font-weight:700;  
    text-transform: uppercase;
}  
  
.purple:hover {
    filter: drop-shadow(2px 2px 2px gray);
}  
      
.purple:active {
    transform: translateY(1px);
    box-shadow: inset 0px 2px 2px 2px rgba(0,0,0,0.15) !important;
    filter: none;
}  
  
.1dv-button:hover {
	text-decoration: none;
  box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.25);

  }  

.ml-2 {
    margin-left: 0.5em;
  }  
  


</style>