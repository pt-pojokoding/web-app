<script setup>
import checkExercise from "~/services/achievement/exercise";
import { renderMarkdown } from "~/services/content/renderMarkdown.ts";
const contentStore = useContentStore();
const progressStore = useProgressStore();
const exerciseStore = useExerciseStore();

const content = contentStore.currentContent;

const code = ref(content.startingCode);
const renderedPrompt = renderMarkdown(content.prompt)
const isLoading = ref(false);
const testCases = content.testCases.map((test) => {
    return {
        ...test,
        testDesc: renderMarkdown(test.testDesc),
    };
});

const codeResult = ref(null)

/**
 * store all stdin from test cases in an array
 * for every stdin run the code and return the result on an array
 * we got array of result from the compiler
 * the index of the result represent its test case
 * TODO: Exercise with other data type
 * TODO: API Limitation
 */
async function handleExecuteCode() {
    isLoading.value = true;
    const stdinArray = testCases.map((test) => test.stdin);

    const result = await exerciseStore.execCode({
        stdinArray: stdinArray,
        code: code.value,
    });
    
    codeResult.value = result;

    testCases.forEach((test, index) => {
        if (result[index].stdout.trim() === test.expectedOutput) {
            test.status = "success";
            test.obtainedOutput = result[index].stdout;
        } else {
            test.status = "failed";
            test.obtainedOutput = result[index].stdout;
        }
    });

    isLoading.value = false;

    await progressStore.saveProgress(code.value);
    await checkExercise()
}
</script>

<template>
    <div class="grid grid-cols-2 h-screen-minus-navbar">
        <div class="p-8 flex flex-col gap-8 overflow-auto">
            <h1 class="text-2xl font-bold">{{ content.displayTitle }}</h1>
            <div class="flex flex-col gap-4">
                <UCard v-for="(test, testIndex) in testCases" :key="testIndex" class="relative">
                    <div v-if="isLoading" class="absolute right-2 top-2">
                        <UiOrbitLoading></UiOrbitLoading>
                    </div>
                    <div class="flex justify-between">
                        <div>
                            <UBadge v-if="test.status == 'success'" color="green" variant="outline">Berhasil</UBadge>
                            <UBadge v-if="test.status == 'failed'" color="red" variant="outline">Gagal</UBadge>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div>
                            <h2 class="text-xl">{{ test.testTitle }}</h2>
                            <div v-html="test.testDesc"></div>
                        </div>
                        <div>
                            <h3 class="text-lg">Contoh pemanggilan fungsi</h3>
                            <pre>{{ test.functionCallExample }}</pre>
                        </div>
                        <div>
                            <h3 class="text-lg">Output yang diharapkan</h3>
                            <pre>{{ test.expectedOutput }}</pre>
                        </div>
                        <div v-if="test.obtainedOutput">
                            <h3 class="text-lg">Output yang didapatkan</h3>
                            <pre>{{ test.obtainedOutput }}</pre>
                        </div>
                    </div>
                </UCard>
            </div>
            <div v-html="renderedPrompt"></div>
            <pre>Content: {{ content }}</pre>
            <pre>{{ codeResult }}</pre>
            <UButton class="self-end" @click="handleExecuteCode">Cek Jawaban</UButton>
        </div>
        <div class="overflow-auto">
            <ContentExerciseCodeEditor v-model="code" />
        </div>
    </div>
</template>
