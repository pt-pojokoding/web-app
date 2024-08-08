<script setup>
const contentStore = useContentStore();
const progressStore = useProgressStore();
const authStore = useAuthStore();
const achievementStore = useAchievementStore();
const { user } = storeToRefs(useAuthStore());

const quiz = contentStore.currentContent.quiz;
const currentContent = contentStore.currentContent;

const quizStarted = ref(false);
const currentQuestionIndex = ref(null);
const isSelectedAnswerCorrect = ref(null);
const isAnswerToAQuestionSubmited = ref(false);
const isAnswerSelected = ref(false);
const userAnswerIsCorrect = ref(false);

const selectedChoiceIndex = ref(null);
const selectedChoiceExplanation = ref(null);
const showExplanation = ref(false);

function startQuiz() {
    quizStarted.value = true;
    currentQuestionIndex.value = 0;
}

function checkAnswer() {
    showExplanation.value = true;
    selectedChoiceExplanation.value = quiz[currentQuestionIndex.value].choices[selectedChoiceIndex.value].explanation;

    if (isSelectedAnswerCorrect.value) {
        userAnswerIsCorrect.value = true;
    }

    if (!isSelectedAnswerCorrect.value) {
        userAnswerIsCorrect.value = false;
    }
}

async function nextQuestion() {
    currentQuestionIndex.value++;
    isSelectedAnswerCorrect.value = null;
    showExplanation.value = false;
    userAnswerIsCorrect.value = false;
    if (currentQuestionIndex.value === quiz.length) {
        await progressStore.saveProgress();
        contentStore.populateSidebarWithUserProgress();
        await achievementStore.checkAchievement();
    }
}
</script>

<template>
    <UCard data-cy="quiz">
        <div v-if="authStore.user">
            <!-- $ Quiz sudah dikerjakan sebelumnya -->
            <div v-if="progressStore.getCurrentContentProgress(contentStore.currentContent._id)" data-cy="quiz-completed">
                <h2 class="text-3xl" data-cy="quiz-completed-title">Quiz Selesai</h2>
                <p class="text-lg" data-cy="quiz-completed-description">Anda sudah menyelesaikan quiz ini</p>
            </div>

            <!-- $ Quiz belum pernah dikerjakan sebelumnya dan belum klik "mulai quiz" -->
            <div
                v-if="!progressStore.getCurrentContentProgress(contentStore.currentContent._id) && !quizStarted"
                class="flex flex-col gap-4"
                data-cy="quiz-intro"
            >
                <h2 class="text-3xl" data-cy="quiz-intro-title">Quiz</h2>
                <p class="text-lg" data-cy="quiz-intro-question-count">
                    Jumlah pertanyaan <span data-cy="quiz-intro-question-count-number">{{ quiz.length }}</span>
                </p>
                <UButton class="self-start" @click="startQuiz" data-cy="quiz-intro-start-button">Mulai Quiz</UButton>
            </div>

            <!-- $ Quiz Start -->
            <div v-if="quizStarted" data-cy="quiz-started">
                <div v-for="(question, questionIndex) in quiz" :key="questionIndex" :data-cy="'quiz-question-' + questionIndex">
                    <div v-if="questionIndex === currentQuestionIndex" data-cy="quiz-current-question">
                        <h3 data-cy="quiz-current-question-title">{{ question.question }}</h3>
                        <ul class="flex flex-col gap-3" data-cy="quiz-current-question-choices">
                            <UCard
                                v-if="showExplanation && userAnswerIsCorrect"
                                class="border border-green-400"
                                data-cy="quiz-current-question-correct-explanation"
                            >
                                <p>
                                    {{ selectedChoiceExplanation }}
                                </p>
                            </UCard>
                            <UCard
                                v-if="showExplanation && !userAnswerIsCorrect"
                                class="border border-red-400"
                                data-cy="quiz-current-question-wrong-explanation"
                            >
                                <p>
                                    {{ selectedChoiceExplanation }}
                                </p>
                            </UCard>
                            <li v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex">
                                <label :data-cy="'quiz-current-question-choice-' + choiceIndex">
                                    <URadio
                                        :label="choice.text"
                                        :value="choice.isCorrect"
                                        v-model="isSelectedAnswerCorrect"
                                        @input="selectedChoiceIndex = choiceIndex"
                                        :ui="{
                                            wrapper: 'p-5 border border-slate-600 rounded-lg cursor-pointer',
                                        }"
                                    ></URadio>
                                </label>
                            </li>
                            <UButton
                                v-if="isSelectedAnswerCorrect !== null && !userAnswerIsCorrect"
                                @click="checkAnswer"
                                class="self-end"
                                data-cy="quiz-check-answer-button"
                                >Cek Jawaban</UButton
                            >
                            <UButton v-if="userAnswerIsCorrect" @click="nextQuestion" class="self-end" data-cy="quiz-next-question-button">
                                <p v-if="currentQuestionIndex === quiz.length - 1">Selesai</p>
                                <p v-else>Pertanyaan Selanjutnya</p>
                            </UButton>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- $ Quiz Selesai -->
            <div v-if="currentQuestionIndex === quiz.length" data-cy="quiz-final-completion">
                <h2 data-cy="quiz-final-completion-title">Quiz Selesai</h2>
                <p data-cy="quiz-final-completion-description">Anda sudah menyelesaikan quiz ini</p>
            </div>
        </div>
        <div v-else data-cy="quiz-auth">
            <p class="text-lg mb-4" data-cy="quiz-auth-prompt">Silahkan login untuk mengerjakan quiz</p>
            <AuthGoogleSignInButton data-cy="quiz-auth-signin-button"></AuthGoogleSignInButton>
        </div>
    </UCard>
</template>
