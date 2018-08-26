<template>

	<div class="btn-group">
		<slot></slot>
	</div>  

</template>


<style>


.btn-group > .dv-button {
    margin-left: 0px !important;
    margin-right: 0px !important;
    //border-radius: 0px;
    //background-color: #f99;
}  
  
.btn-group > .dv-button {
    min-width: 1em;
  }  

.btn-group > .dv-button:nth-child(1) { 
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}  
  
.btn-group > .dv-button:nth-child(1n+2) {
    border-left: 1px solid transparent;
    border-radius: 0px;
    //border-top-right-radius: 0px;
    //border-bottom-right-radius: 0px;
  }  

.btn-group > .dv-button:nth-child(1n+2):focus {
    border: 1px solid rgba(0, 0, 0, 0.4);
}  
  
.btn-group > .dv-button:nth-last-child(1) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    // border-left: 1px solid transparent;
}    


</style>