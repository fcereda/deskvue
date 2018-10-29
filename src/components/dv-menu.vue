<template>

<div>
  <ul 
      class="dv-menu"
      :class="menuClass" 
      tabindex="0"
      @keydown="menuKeydown"
      @mouseout="menuMouseout"
  >
    <li class="dv-menu-item" v-for="(item, index) in menuItems">
      <template v-if="item.divider">
        <hr />
	    </template>
      <template v-if="item.category">
					<span class="category">{{ item.text }}</span>
      </template>  
      <template v-if="!item.divider && !item.category">
				<div :class="menuButtonClass(item, index)"
             @mouseover="menuItemHover(item)"
             @click="menuItemClick(item, index)">
					<span class="dv-menu-icon"><dv-icon v-if="item.icon">{{ item.icon }}</dv-icon></span>
          <span class="menu-item-text" style="float:left;">{{ item.text }}</span>
      		<span class="label">{{ item.key }}</span>
        </div>
      </template>
    </li>
  </ul>  
</div>

</template>

<script>

import dvIcon from './dv-icon.vue'

export default {

  components: {
    dvIcon
  },

  props: ['size', 'classes', 'border', 'items'],

  data: function () {

    let menuItems = this.items.map(item => {
      return {
        text: item.text,
        icon: item.icon,
        key: item.key,
        category: item.category,
        divider: item.divider,
        disabled: item.disabled,
        active: item.active ? true : false,
        classes: item.classes
      }
    })
    let activeMenuItems = menuItems.filter(item => !item.category && !item.disabled && !item.divider) 
    
    console.log(menuItems)

    return {
      hasBorder: this.border !== undefined,
      clicked: -1,
      menuItems,
      activeMenuItems,
      indexCurrentMenuItem: -1,
    }
    
  },

  computed: {
    menuClass: function () {
      let classes = []
      if (this.hasBorder)
        classes.push('dv-menu-border')
      if (this.classes)
        classes.push(this.classes)
      if (this.size)          
        classes.push(this.size)
      return classes
    },
  },

  methods: {

    menuButtonClass: function (item, index) {
      let classes = item.classes || ''
      if (item.active)
        classes += ' active'
      if (item.disabled)
        classes += ' disabled'
			if (item == this.activeMenuItems[this.indexCurrentMenuItem]) {
        classes += ' hover'
      }  
      return classes
    },      
    
    menuKeydown: function (e) {
      let newIndex = this.indexCurrentMenuItem
      switch (e.key) {
        case 'ArrowUp':
          newIndex = newIndex - 1
          break
        case 'ArrowDown':
          newIndex = newIndex + 1
          break
        case 'Home':
          newIndex = 0
          break
        case 'End':
          newIndex = this.activeMenuItems.length - 1
          break
        case 'Enter':
        case 'Return':
        case ' ':
          this.menuCurrentItemClick()
          break
        default:
          return
      }    
      e.preventDefault();
      if (newIndex <= -1)
        newIndex = this.activeMenuItems.length - 1
      else 
        newIndex =  newIndex % this.activeMenuItems.length 
      this.indexCurrentMenuItem = newIndex
    },  
    
    menuItemHover: function (item) {
      let newIndex = this.activeMenuItems.indexOf(item)
      this.indexCurrentMenuItem = newIndex
    },  
    
    menuMouseout: function () {
      this.indexCurrentMenuItem = -1
    },  

    menuCurrentItemClick: function () {
      let currentItem = this.activeMenuItems[this.indexCurrentMenuItem]
      if (currentItem) {
        let index = this.menuItems.indexOf(currentItem)
        this.menuItemClick(currentItem, index)
      }
    },  
    
    menuItemClick: function (item, index) {
      if (item.disabled)
        return
      this.$emit('click', this.items[index])
      this.activeMenuItems.forEach(thisItem => this.$set(thisItem, 'active', thisItem == item))
    }  
    
  }, 
  
  
  
}
</script>

<style lang="scss">

.dv-menu {
    background-color: #fff;
    color: #333;
    min-width: 10em;
    padding:0px;
    font-size:14px;
}  
  
.dv-menu-border {
    border: 1px solid #686868;
    padding: 0.25em;
    margin:0;
}  
  
.dv-menu.small {
    width: 10em;
}  
  
.dv-menu.medium {
    width: 15em;
}  
  
.dv-menu.large {
    width:20em;
}  

.dv-menu-item {
    list-style-type: none;  
    margin-left: 0px;
    user-select:none;  
}  

  
.dv-menu-item > div {
    padding: 0.5em 0.5em;
    font-size: inherit;
      
    background-color: transparent;
    border: none;
	  user-select: none;
    cursor: default;
    display: flex;
    align-items: center;

    flex-direction: row;
}
  
.dv-menu-item > div > span {
    display: inline-block;
 } 
  
.dv-menu-item > div > .menu-item-text {
    flex: 1;
}  
  
.dv-menu.tight > .dv-menu-item > div {
    padding-top: 0.4em;
    padding-bottom: 0.3em;
}  

.dv-menu-item > div:not(.disabled).hover {
  background-color: #BBDEFB;  
}  
 
 
.dv-menu-item > div.disabled:hover {
    cursor:no-drop;
  }  
  
.dv-menu-item > div:focus {
    outline: none;
    //background-color:#CFD8DC;
}  
  
.dv-menu-item > div:focus > .menu-item-text {
    text-decoration: underline;
    text-decoration-color: #888;
  }  
  
  
.dv-menu-item > div:not(.disabled):active {
    background-color: #90A4AE;
}  
  
.dv-menu-item > div.active {
    color: #1867c0;
    box-shadow: -0.3em 0px 0px 0px #1867c0;
}  
  
.dv-menu-item > div.disabled {
    color: rgba(0, 0, 0, 0.4);
}  

.menu-item-text {
    text-align: left;
}

.dv-menu-item > div > span.label {
    font-size: 0.85em;
    line-height:150%;
} 
  
  
.dv-menu-item > hr {
    margin: 2px;
    margin-left:0.5em;
    margin-right:0.5em;

    border: 0;
    height: 1px;
    background: #aaa;
}   

.dv-menu-item > .category {
    display:block;
    margin-left:1em;  
    margin-top:0.75em;
    margin-bottom:0.5em;
    font-size:0.75em;
    font-weight:700;
    text-align: left;
    color:rgba(0,0,0,0.6);
}  
  
.dv-menu > .dv-menu-item:not(:first-child) > .category {
    margin-top:1.5em;
}   

.dv-menu-icon {
    display:inline-block;
    width:1.75em;
    text-align:left;
}

</style>