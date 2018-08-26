<template>
    <div 
    	class="dv-tag" 
    	:class="tagClass" 
    	@click.stop="$emit('click', value)"
    >
      <span class="dv-tag-text">{{ tagText }}</span><button class="close-icon" @click.stop="$emit('close', value)">×</button>
    </div>
</template>  

<script>

import utils from './utils.js'

const booleanProps = [
	'primary',
	'secondary',
	'success', 
	'info',
	'warning',
	'danger',
	'error',
]

export default {

	props: ['value', 'text', ...booleanProps],

	computed: {

		tagText: function () {
			return this.text || this.value
		},

		tagClass: function () {
			return this.classes.join(' ')
		}
	},

	mounted: function () {
		booleanProps.forEach(prop => {
			this.$watch(prop, function () { 
				this.updateClasses() 
			})
		})
	},

	data: function () {
		console.log('classes: ')
		console.log(utils.getComponentClasses(this, booleanProps))
		return {
			classes: utils.getComponentClasses(this, booleanProps)
		}
	},

	methods: {

		updateClasses: function () {
			this.classes = utils.getComponentClasses(this, booleanProps)
		}

	}

}

</script>

<style lang="scss">

@import './base.scss';

.dv-tag {
    display:inline-block;
    background-color: #eee;
    color:#222;
    min-width:1em;
    text-align:center;
    border: 0.5px solid #ccc;
    border-radius:1em;
    font-size:0.8em;
    padding:1px 1px;
    padding-left: 8px;
    font-weight:400;
    user-select: none;
	cursor: default;
	margin-right:0.25em;
}  
  
.dv-tag > .dv-tag-text {
    display:inline-block;
}  

.dv-tag.primary,
.dv-tag.danger,
.dv-tag.error,
.dv-tag.success,
.dv-tag.warning {
	color: white;
	font-weight: 700;
}

.dv-tag.primary {
    background-color: $bg-color-primary;
}

.dv-tag.secondary {
	background-color: $bg-color-secondary;
	color: white;
}

.dv-tag.warning {
    background-color: $bg-color-warning;
}  

.dv-tag.danger {
	background-color: $bg-color-danger;
}

.dv-tag.error {
	background-color: $bg-color-danger;
}

.dv-tag.success {
	background-color: $bg-color-success;
}

.dv-tag.info {
	background-color: $bg-color-info;
}

.dv-tag.dark {
	background-color: $bg-color-dark;
}

  
.dv-tag > .close-icon {
    display:inline-block;
    border-radius: 50%;
    width:1.5em;
    text-align: center;
    margin-left: 8px;
    margin-right: 1px;
    margin-top:0.5px;
    margin-bottom:0.5px;
    border: 1px solid transparent;
    outline:none;
  
    background-color: white;
    cursor:pointer;
}  
  
.dv-tag > .close-icon:hover {
    background-color: #999;
    color: white;
}  
  
.dv-tag > .close-icon:focus {
    border: 1px solid #888;
  }  
  
.dv-tag > .close-icon:active {
    background-color: #666;
    color: white;
}  
  
</style>

