
<template>

  <div
    class="switch-component"
    :class="switchComponentClass"
    v-on:click="onClick"
  >
    <div style="text-align:center;">
      <div
       class="switch"
       :class="switchClass"
       tabindex="0"
       v-on:keydown="onKeyPress"
       ref="switch"
      >
      <span class="switch-ball">&nbsp;</span>
      </div>
    </div>
    <div class="switch-label">
      <slot></slot>
    </div>
  </div>

</template>

<script>

export default {
  props: ['align', 'color', 'value'],

  computed: {
    switchComponentClass: function () {
      let align = this.align || 'left' 
      align = align.toLowerCase()
      return align
    },

    switchClass: function () {
      let classes = []
      if (this.value) {
        classes.push('on')
      }  
      if (this.color) {
        classes.push(this.color)
      }
      return classes.join(' ')
    },

  },

  data: function () {
    return {}
  },

  methods: {
    onClick: function () {
      let newValue = !this.value
      this.$emit('input', newValue)
      this.$refs.switch.focus()
    },

    onKeyPress: function (e) {
      console.log(e.key)
      if (!['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(e.key))
        return
      e.preventDefault()
      e.stopPropagation()
      switch (e.key) {
        case 'ArrowRight':
          return this.$emit('input', true)
        case 'ArrowLeft':
          return this.$emit('input', false)
        case ' ':
        case 'Enter':
          return this.onClick()      
      }
    },

  }

}


</script>

<style lang="scss">

@import './base.scss';

div.switch-component {
  display: inline-flex;
  flex-direction: row;
  font-size: 16px;
}

div.switch-component.right {
  flex-direction: row-reverse;
}

div.switch-component.center {
  flex-direction: center;
}

div.switch-component ~ div.switch-component {
  margin-top: 0.5em;
}

div.switch {
  display: inline-block;
  position: relative;
  font-size: 16px;
  --height: 16px;
  width: 28px;
  height: var(--height);
  text-align: center;
  margin-top: 1px;
  margin-right: 8px;
  border-radius: calc(var(--height) / 2);
  background-color: #BDBDBD;
  outline: none;
  user-select: none;
  transition: background-color 0.2s;
}

div.switch > span.switch-ball {
  display: inline-block;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  margin: 2px;
  border-radius: 50%;
  border: 1px solid #a0a0a0;
  background-color: white;
  position: absolute;
  left: 0px;
  transition: all 0.2s;
}

div.switch.on {
  --background-color: var(--color-primary);
  background-color: var(--background-color);
}

div.switch.on.warning {
  --background-color: var(--color-warning);
  background-color: var(--background-color);
}

div.switch.on.danger {
  --background-color: var(--color-danger);
  background-color: var(--background-color);
}

div.switch.on.error {
  --background-color: var(--color-error);
  background-color: var(--background-color);
}

div.switch.on.success {
  --background-color: var(--color-success);
  background-color: var(--background-color);
}

div.switch.on > span.switch-ball {
  left: 12px;
  border: 1px solid var(--background-color);
}

div.switch:focus::before {
  position: absolute;
  --border-weight: 2;
  --border-gap: 2;
  --position: calc((var(--border-weight) + var(--border-gap)) * -1px);
  left: var(--position);
  top: var(--position);
  right: var(--position);
  bottom: var(--position);
  border-radius: calc( var(--height) / 2 + (var(--border-weight) + var(--border-gap)) * 1px);
  border: 2px solid #999;
  content: " ";
}

.switch-label {
  user-select: none;
  cursor: pointer;
}


</style>