<template lang="pug">
  #questions.questions
    h2 {{title}}
    p {{msg}}
    .preload(v-if="list.length === 0")
      p Loading ...
    .question__item(v-for="(item, index) in list") 
      p {{item.question}}
      p {{item.is_correct_answer}}
      ul.questions__item__answers
        li(v-for="(answer, answerIndex) in item.answers")
          label
            input(type="radio" :name="`name${index}`" v-on:change="updateAnswer(index, answerIndex)")
            span {{answer}}
    .question__results
      h4 {{results}} correct answer(s)
      p #[button(v-on:click="showResults") Check answers]
</template>

<script>
  export default {
    name: 'questions',
    props: {
      msg: String,
    },

    data() {
      return {
        title: 'Questions',
      }
    },

    computed: {
      list() {
        return this.$store.state.list;
      },
      results() {
        return this.$store.state.results;
      }
    },

    mounted() {
      this.$store.commit('fetchedQuestions');
    },

    methods: {
      updateAnswer(index, answerIndex) {
        this.$store.commit('updateQuestion', { index, answerIndex });
      },
      showResults() {
        this.$store.commit('getResults');
      }
    },

    watch: {
      list: () => {
        console.log('watch');
      }
    }
  }
</script>

<style lang="scss">
  .questions {
    &__item {
      &__answers {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
