<script setup>
const exerciseStore = useExerciseStore();
const contentStore = useContentStore();
</script>

<template>
    <UAccordion multiple :items="contentStore.testCases" size="2xl" data-cy="exercise-test-case">
        <template #default="{ item, open }">
            <UButton
                color="gray"
                variant="solid"
                size="xl"
                class="mb-2 flex justify-between"
                :class="{
                    'border border-red-700': item.status == 'failed' && !exerciseStore.isCodeExecuting,
                    'border border-green-700': item.status == 'success' && !contentStore.isCurrentContentFinished() && !exerciseStore.isCodeExecuting,
                    'border border-green-700': contentStore.isCurrentContentFinished() && item.status != 'failed' && !exerciseStore.isCodeExecuting,
                }"
                data-cy="exercise-test-case-button"
            >
                <div class="flex items-center gap-2" data-cy="exercise-test-case-button-content">
                    <h2 class="text-lg text-start text-black dark:text-white" data-cy="exercise-test-case-title">
                        {{ item.testTitle }}
                    </h2>
                </div>
                <div class="flex items-center gap-2" data-cy="exercise-test-case-status-icons">
                    <UIcon
                        v-if="item.status == 'failed' && !exerciseStore.isCodeExecuting"
                        name="i-heroicons-x-circle"
                        class="text-red-500 text-2xl"
                        data-cy="exercise-test-case-failed-icon"
                    ></UIcon>
                    <UIcon
                        v-if="(item.status == 'success' || (item.status !== 'failed' && contentStore.isCurrentContentFinished())) && !exerciseStore.isCodeExecuting"
                        name="i-heroicons-check-circle"
                        class="text-green-500 text-2xl"
                        data-cy="exercise-test-case-success-icon"
                    ></UIcon>
                    
                    <UiOrbitLoading v-if="exerciseStore.isCodeExecuting" data-cy="exercise-test-case-loading-icon"></UiOrbitLoading>
                    <UIcon
                        :name="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                        class="ml-2"
                        data-cy="exercise-test-case-toggle-icon"
                    ></UIcon>
                </div>
            </UButton>
        </template>

        <template #item="{ item }">
            <div class="p-2 border-2 dark:border-gray-700 border-gray-200 rounded flex flex-col gap-4" data-cy="exercise-test-case-detail">
                <div>
                    <div class="text-base dark:text-white text-black" v-html="item.testDesc" data-cy="exercise-test-case-detail-description"></div>
                </div>
                <div>
                    <h3 class="text-base font-bold dark:text-gray-300 text-gray-700" data-cy="exercise-test-case-detail-input-title">Input</h3>
                    <p class="text-base dark:text-white text-black" data-cy="exercise-test-case-detail-input-content">
                        {{ item.functionCallExample }}
                    </p>
                </div>
                <div>
                    <h3 class="text-base font-bold dark:text-gray-300 text-gray-700" data-cy="exercise-test-case-detail-expected-output-title">
                        Output yang diharapkan
                    </h3>
                    <p class="text-base dark:text-white text-black" data-cy="exercise-test-case-detail-expected-output-content">
                        {{ item.expectedOutput }}
                    </p>
                </div>
                <div v-if="item.obtainedOutput">
                    <h3 class="text-base font-bold dark:text-gray-300 text-gray-700" data-cy="exercise-test-case-detail-obtained-output-title">
                        Output didapat
                    </h3>
                    <p class="text-base dark:text-white text-black" data-cy="exercise-test-case-detail-obtained-output-content"><pre>{{ item.obtainedOutput }}</pre></p>
                </div>
            </div>
        </template>
    </UAccordion>
</template>
