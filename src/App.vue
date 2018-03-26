<template>
  <div id="app">
    <Questions msg="Trivia"/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import { decorateQuestions, fetchQuestions } from './actions';
import Questions from './components/Questions.vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    list: [],
    results: 0
  },
  mutations: {
    fetchedQuestions: (state) => {
      fetchQuestions().then((questionsArr) => {
        state.list = decorateQuestions(questionsArr);
      });
    },
    updateQuestion: (state, payload) => {
      const { index, answerIndex } = payload;
      const question = state.list[index];
      question.is_correct_answer = (answerIndex === question.correct_answer_index);
    },
    getResults: (state) => {
      const list = [...state.list];

      const correctAnswers = list.filter(item => item.is_correct_answer);
      state.results = correctAnswers.length;
    }
  }
});

export default {
  name: 'app',
  store,
  components: {
    Questions
  }
}
</script>

<style>

</style>
