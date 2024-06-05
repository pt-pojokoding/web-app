// @ts-nocheck
import { runCode } from "~/services/content/runCode";
import { renderMarkdown } from "~/services/content/renderMarkdown.ts";

export const useExerciseStore = defineStore("exercise", () => {
    const contentStore = useContentStore();
    const progressStore = useProgressStore();
    const achievementStore = useAchievementStore();

    const code = ref(contentStore.currentContent.startingCode);
    const renderedPrompt = ref(renderMarkdown(contentStore.currentContent.prompt));
    const isCodeExecuting = ref(false);
    const testCases = ref(contentStore.currentContent.testCases.map(test => {
        return {
            ...test,
            testDesc: renderMarkdown(test.testDesc),
        };
    }));
    const codeResult = ref(null);

    async function execute() {
        isCodeExecuting.value = true;

        const stdinArray = testCases.value.map(test => test.stdin);

        const result = await execCode({
            stdinArray: stdinArray,
            code: code.value,
        });

        codeResult.value = result;

        testCases.value.forEach((test, index) => {
            if (result[index].stdout.trim() === test.expectedOutput) {
                test.status = "success";
                test.obtainedOutput = result[index].stdout;
            } else {
                test.status = "failed";
                test.obtainedOutput = result[index].stdout;
            }
        });

        isCodeExecuting.value = false;

        const isAllTestCasesSuccess = testCases.value.every((test) => test.status === "success");

        if (isAllTestCasesSuccess) {
            await progressStore.saveProgress(code.value);
            contentStore.populateSidebarWithUserProgress();
            await achievementStore.checkAchievement();
        }
    }

    async function execCode(params: { stdinArray: any[]; code: string }) {
        const readyToCompileCode = params.code + "\n\n" + contentStore.currentContent.compileCode;

        const response = await runCode(
            readyToCompileCode,
            params.stdinArray,
            contentStore.currentContent.languageConfig.languageName
        );

        return response;
    }

    return {
        code,
        renderedPrompt,
        testCases,
        isCodeExecuting,
        codeResult,
        execute,
        execCode,
    };
});
