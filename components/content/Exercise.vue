<script setup>
/**
 * TODO: Exercise with other data type
 * TODO: API Limitation
 * TODO: Restrict non logged in user
 */
const contentStore = useContentStore();
const progressStore = useProgressStore();
const exerciseStore = useExerciseStore();
</script>

<template>
    <div class="grid grid-cols-2 h-screen-minus-navbar" data-cy="exercise">
        <div class="overflow-auto relative" data-cy="exercise-left-panel">
            <div class="p-8 min-h-full flex flex-col gap-4" data-cy="exercise-left-content">
                <!-- $ Title -->
                <h1 class="text-2xl font-bold text-primary font-space-mono" data-cy="exercise-title">{{ contentStore.currentContent.displayTitle }}</h1>
                
                <UDivider />
    
                <!-- $ Question -->
                <div data-cy="exercise-question">
                    <h2 class="text-xl font-bold mb-2" data-cy="exercise-question-title">Soal</h2>
                    <div v-html="exerciseStore.renderedPrompt" data-cy="exercise-question-content"></div>
                </div>
    
                <!-- $ Test Cases -->
                <div class="pb-16" data-cy="exercise-test-cases">
                    <h2 class="text-xl font-bold mb-2" data-cy="exercise-test-cases-title">Test Cases</h2>
                    <div class="flex flex-col gap-4" data-cy="exercise-test-cases-wrapper">
                        <ContentExerciseTestCase />
                    </div>
                </div>
            </div>

            <!-- $ Sticky bottom div -->
            <div class="flex justify-between p-2 border-t-2 sticky bottom-0 w-full bg-white dark:bg-bg" data-cy="exercise-sticky-bottom">
                <div></div>
                <UButton class="self-end" size="xl" @click="exerciseStore.execute" data-cy="exercise-check-answer-button">Cek Jawaban</UButton>
            </div>
        </div>
        <div class="overflow-auto" data-cy="exercise-right-panel">
            <ContentExerciseCodeEditor v-model="exerciseStore.code" />
        </div>
    </div>
</template>
