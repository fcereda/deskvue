<template>

<div>
	<ul class="dv-tab">
		<slot></slot>
	    <li class="dv-tab-button"><button class="dv-button circle small short no-focus">+</button></li>
	</ul>
</div>

</template>

<script>

export default {

	props: ['value'],

	data: function () {
		return {}
	}

}

</script>

<style lang="scss">

.dv-tab {
    list-style-type: none;
    border-bottom: 1px solid #aaa;
    padding-left:1em;
    padding-right:1em;
    font-size:4px;
    margin:0px;
}  

li.dv-tab-item {
   display:inline-block;
   border-top: 2px solid transparent;
   border-bottom: 2px solid transparent;
   padding-left:1em;
   padding-right:1em;
   padding-top:0.5em;
   padding-bottom:0.35em;
   transform: translateY(1.5px);
   margin-right:0px;
   margin-left:0px;
   font-size:14px;
   user-select:none;
   cursor:pointer;
}  

li.dv-tab-item:hover {
    color:#1867c0;
  }  
  
li.dv-tab-item.active {
   border-left: 1px solid #aaa;
   border-right: 1px solid #aaa;
   border-bottom: 2px solid white;
   border-top: 2px solid #1867c0;
   //border-top-left-radius:4px;
   //border-top-right-radius:4px;
   background-color: white;
}  
  
li.dv-tab-item:focus {
    //color:#1867c0;
    text-decoration:underline;
    text-decoration-color: #888;
    outline: none;
  }  
  
.dv-tab-item > button {
    border: 0.5px solid transparent;
    outline: none;
    background-color: transparent;
    font-size:inherit;
}  
  
.dv-tab-item > button:hover {
    color: #1867c0;
}  

.dv-tab-item > button:focus {
    border: 0.5px dotted #aaa;
}    
  
  
.dv-tab-button {
  float:right;
  font-size:14px;
  }  	
    
.dv-badge {
    display:inline-block;
    background-color: #888;
    color:white;
    min-width:1em;
    //height:1.5em;
    text-align:center;
    line-height:150%;
    border-radius:1em;
    font-size:0.8em;
    padding:1px 4px;
    transform: translateY(-2px);
    font-weight:400;
}  
  
.dv-badge.warning {
    background-color: #FF9800;
    color:white;
    font-weight:500;
}  

</style>