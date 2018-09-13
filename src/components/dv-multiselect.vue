<template>

<div>
  <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" :searchable="true" @tag="addTag"></multiselect>
<!--
  <pre class="language-json"><code>{{ value  }}</code></pre>
-->
</div>

</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  data () {
    return {
      value: [
        { name: 'Javascript', code: 'js' }
      ],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' },
        { name: 'C++', code: 'cpp'},
        { name: 'Turbo Pascal', code: 'tp'},
        { name: 'Turbo C', code: 'tc'},
        { name: 'Borland Delphi', code: 'de'},
        { name: 'Object Pascal', code: 'op'},
        { name: 'Typescript', code: 'ts'}
      ]
    }
  },
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    }
  }
}

</script>

<style lang="scss">

@import "~vue-multiselect/dist/vue-multiselect.min.css";

.multiselect {
  min-height: 0;
  height: 28px;
}

.multiselect__select {
  height: 28px; /* Ou outro valor que ajuste a seta para baixo */
  width: default; /* Ajuste para colocar a seta mais para a direita */

/*  padding: 0 8px; */
  margin-top: 3px;  /* Se tentar aumentar o padding, o transform:rotate vai ficar errado */
}

.multiselect__tags {
  min-height: 24px;  /* Coloque aqui o valor que ajusta a input box para o valor correto */
  padding: 7px 2px 0 4px; /* Exemplo para centralizar os tags */
  border-radius: 8px;  /* Estranhamente, a borda é definida em .multiselect__tags */

  padding-top: 4px;
  padding-bottom: 1px;
  margin-bottom: 0px;
}

.multiselect__tag {
  margin-right: 4px;
  background: #999; /* coloque aqui a cor de fundo */
  border-radius: 6px; /* altere para deixar as tags rounded */

  margin-bottom: 0px;
}

</style>