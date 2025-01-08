<script setup>
/**
 * TODO: Exercise with other data type
 * TODO: API Limitation
 */
import { renderMarkdown } from "~/services/content/renderMarkdown";


const contentStore = useContentStore();
const progressStore = useProgressStore();
const exerciseStore = useExerciseStore();

await exerciseStore.checkIfUserEligibleToAccessExercise();

const handleKeydown = (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
        exerciseStore.execute();
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
    <div class="grid grid-cols-2 h-screen-minus-navbar" data-cy="exercise">
        <div class="overflow-auto relative" data-cy="exercise-left-panel">
            <div class="p-8 min-h-full flex flex-col gap-4" data-cy="exercise-left-content">
                <!-- $ Title -->
                <h1 class="text-2xl font-bold text-primary font-space-mono" data-cy="exercise-title">
                    {{ contentStore.currentContent.title }}
                </h1>

                <UDivider />

                <!-- $ Question -->
                <div data-cy="exercise-question">
                    <h2 class="text-xl font-bold mb-2" data-cy="exercise-question-title">Soal</h2>
                    <div v-html="renderMarkdown(contentStore.currentContent.body.find((item) => item.type == 'question').value)"
                        class="markdown-style post-style" data-cy="exercise-question-content">
                    </div>
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
            <div class="flex justify-between p-2 border-t-2 border-slate-600 sticky bottom-0 w-full bg-white dark:bg-bg"
                data-cy="exercise-sticky-bottom">
                <UTooltip text="Reset kode ke keadaan awal" open-delay=600 :popper="{ offsetDistance: 16 }">
                    <UButton variant="ghost" color="gray" @click="contentStore.resetCode()"
                        data-cy="exercise-instruction-button">
                        <UIcon name="i-heroicons-arrow-path"></UIcon> 
                    </UButton>
                </UTooltip>

                <UButton class="self-end" size="xl" @click="exerciseStore.execute"
                    :loading="exerciseStore.isCodeExecuting" data-cy="exercise-check-answer-button">Cek Jawaban
                </UButton>
            </div>
        </div>
        <div class="overflow-auto" data-cy="exercise-right-panel">
            <ContentExerciseCodeEditor v-model="contentStore.code" />
        </div>
    </div>
</template>
