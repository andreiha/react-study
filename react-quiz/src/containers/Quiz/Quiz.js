import React from 'react';
import './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends React.Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Как звали актера Вицина?',
                rightAnswerId: 3,
                answers: [
                    { text: 'Александр', id: 1 },
                    { text: 'Дмитрий', id: 2 },
                    { text: 'Георгий', id: 3 },
                    { text: 'Петр', id: 4 },
                ],
            },
            {
                id: 2,
                question: 'Как звали актера Никулина?',
                rightAnswerId: 2,
                answers: [
                    { text: 'Фома', id: 1 },
                    { text: 'Юрий', id: 2 },
                    { text: 'Вася', id: 3 },
                    { text: 'Александр', id: 4 },
                ],
            },
        ],
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[this.state.activeQuestion + 1]) {
                results[this.state.activeQuestion + 1] = 'success';
            }

            console.log(this.state.results);

            this.setState({
                answerState: { [answerId]: 'success' },
                results,
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[this.state.activeQuestion + 1] = 'error';

            console.log(this.state.results);

            this.setState({
                answerState: { [answerId]: 'error' },
                results,
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {},
        });
    };

    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Ответьте на все вопросы</h1>

                    {this.state.isFinished ? (
                        <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.retryHandler} />
                    ) : (
                        <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
