import axios from 'axios';

export const decorateQuestions = (questionsArr) => {
  const list = questionsArr.map((question) => {
    const answersLength = question.incorrect_answers.length + 1;
    const i = Math.floor(Math.random() * answersLength);
    const answers = [...question.incorrect_answers];

    answers.splice(i, 0, question.correct_answer);

    return {
      ...question,
      answers,
      is_correct_answer: false,
      correct_answer_index: i,
    };
  });

  return list;
};

export const fetchQuestions = async () => {
  try {
    const result = await axios.get('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy');
    return result.data.results;
  } catch (err) {
    return err;
  }
};
