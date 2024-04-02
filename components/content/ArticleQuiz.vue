<script setup>
/**
 * FITUR QUIZ
 * - Saat pertama kali di render, komponen ini akan mengecek apakah quiz sudah diselesaikan atau belum
 * jika quiz sudah diselesaikan maka menampilkan state "quiz sudah dikerjakan"
 *
 * - Jika quiz belum pernah dilakukan, maka akan langsung menampilkan state "pre-quiz"
 *
 * - pada state "pre-quiz" tampilkan informasi mengenai quiz
 *
 * - User dapat klik "mulai quiz" dan dapat mulai menjawab pertanyaan dengan
 * memilih jawaban yang tersedia. disini masuk state "quiz dimulai"
 *
 * - Jika jawaban yang dipilih user salah, maka tampilkan pesan "jawaban salah"
 * dan pembahasan kenapa itu salah, dan masih dalam pertanyaan yang sama
 *
 * - Jika jawaban yang dipilih user benar, maka tampilkan pesan "jawaban benar"
 * dan pembahasan kenapa itu benar, dan lanjut ke pertanyaan berikutnya
 *
 * - Jika user sudah memilih salah satu pilihan, maka tampilkan tombol "Cek jawaban"
 *
 * - Jika jawaban benar maka tampilkan tombol "Selanjutnya"
 *
 * - Jika sudah menjawab semua pertanyaan maka tampilkan tombol "selesai"
 *
 * - Simpan progress user pada konten tersebut
 *
 * - Tampilkan semacam popup pesan selamat user telah menyelesaikan quiz
 *
 * - tampilkan peningkatan progress di sidebar
 *
 */
const contentStore = useContentStore();
const progressStore = useProgressStore();
const authStore = useAuthStore();

const quiz = contentStore.currentContent.quiz;
const currentContent = contentStore.currentContent;
const currentContentProgress = contentStore.currentContentProgress;

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
    selectedChoiceExplanation.value =
        quiz[currentQuestionIndex.value].choices[selectedChoiceIndex.value].explanation;

    console.log("selectedChoiceExplanation", selectedChoiceExplanation.value);

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
        console.log("quiz selesai, menjalankan save progress");
        await progressStore.saveProgress();
    }
}
</script>

<template>
    <UCard>
        <!-- $ Quiz sudah dikerjakan sebelumnya -->
        <div v-if="currentContentProgress">
            <h2 class="text-3xl">Quiz Selesai</h2>
            <p class="text-lg">Anda sudah menyelesaikan quiz ini</p>
        </div>

        <!-- $ Quiz belum pernah dikerjakan sebelumnya dan belum klik "mulai quiz" -->
        <div v-if="!currentContentProgress && !quizStarted" class="flex flex-col gap-4">
            <h2 class="text-3xl">Quiz</h2>
            <p class="text-lg">Jumlah pertanyaan {{ quiz.length }}</p>
            <UButton class="self-start" @click="startQuiz">Mulai Quiz</UButton>
        </div>

        <!-- $ Quiz Start -->
        <div v-if="quizStarted">
            <div v-for="(question, questionIndex) in quiz" :key="questionIndex">
                <div v-if="questionIndex === currentQuestionIndex">
                    <h3>{{ question.question }}</h3>
                    <ul class="flex flex-col gap-3">
                        <UCard v-if="showExplanation">
                            <p>
                                {{ selectedChoiceExplanation }}
                            </p>
                        </UCard>
                        <li v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex">
                            <label>
                                <URadio
                                    :label="choice.text"
                                    :value="choice.isCorrect"
                                    v-model="isSelectedAnswerCorrect"
                                    @input="selectedChoiceIndex = choiceIndex"
                                    :ui="{
                                        wrapper:
                                            'p-5 border border-slate-600 rounded-lg cursor-pointer',
                                    }"
                                ></URadio>
                            </label>
                        </li>
                        <UButton
                            v-if="isSelectedAnswerCorrect !== null && !userAnswerIsCorrect"
                            @click="checkAnswer"
                            class="self-end"
                            >Cek Jawaban</UButton
                        >
                        <UButton v-if="userAnswerIsCorrect" @click="nextQuestion" class="self-end">
                            <p v-if="currentQuestionIndex === quiz.length - 1">Selesai</p>
                            <p v-else>Pertanyaan Selanjutnya</p>
                        </UButton>
                    </ul>
                </div>
            </div>
        </div>

        <!-- $ Quiz Selesai -->
        <div v-if="currentQuestionIndex === quiz.length">
            <h2>Quiz Selesai</h2>
            <p>Anda sudah menyelesaikan quiz ini</p>
        </div>
    </UCard>
</template>
