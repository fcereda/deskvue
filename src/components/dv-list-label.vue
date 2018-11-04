<template>

	<div 
		class="dv-list-label"
	><span>{{ text }}</span><slot></slot>
	</div>	

</template>

<script>

export default {
	props: {
		text: String
	}, 

	data: function (){
		return {}
	}
}	

</script>

<style lang="scss">

@import './base.scss';

$label-font-size: 13px; //$font-size;

.dv-list-label {
	font-size: $label-font-size;
	font-weight: 600;
	color: #777;
	text-transform: uppercase;
	padding-left: 16px;
	padding-top: 0.75em;
	padding-bottom: 0.25em;
	text-align: left;	
}

</style>