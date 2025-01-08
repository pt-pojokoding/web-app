import { runCode } from "~/services/content/runCode";
import { renderMarkdown } from "~/services/content/renderMarkdown";

export const useExerciseStore = defineStore("exercise", () => {
    const router = useRouter();

    const contentStore = useContentStore();
    const progressStore = useProgressStore();
    const achievementStore = useAchievementStore();
    const authStore = useAuthStore();

    const isCodeExecuting = ref(false);
    const codeResult = ref(null);

    async function execute() {
        isCodeExecuting.value = true;

        const stdinArray = contentStore.testCases.map((test: any) => test.stdin);

        console.log("stdin Array", stdinArray)
        
        const result = await execCode({
            stdinArray: stdinArray,
            code: contentStore.code,
        });

        console.log("code execution result", result)

        codeResult.value = result;

        contentStore.testCases.forEach((test: any, index: number) => {
            if (result[index].stdout) {
                if ((result[index].stdout?.trim() ?? "") === test.expected_output) {
                    test.status = "success";
                    test.obtained_output = result[index].stdout;
                } else {
                    test.status = "failed";
                    test.obtained_output = result[index].stdout;
                }
            }

            if (result[index].stderr) {
                test.status = "failed";
                test.obtained_output = result[index].stderr;
            }

            if (
                result[index].status === "success" &&
                !result[index].stdout &&
                !result[index].stderr &&
                !result[index].exeption
            ) {
                test.status = "failed";
                test.obtained_output = "Kode tidak menghasilkan output";
            }
        });

        console.log("test cases", contentStore.testCases)

        isCodeExecuting.value = false;

        const isAllTestCasesSuccess = contentStore.testCases.every((test: any) => test.status === "success");

        const currentContentProgress = progressStore.getCurrentContentProgress(contentStore.currentContent._id);

        if (isAllTestCasesSuccess && !currentContentProgress) {
            await progressStore.saveProgress(contentStore.code);
            contentStore.populateSidebarWithUserProgress();
            await achievementStore.checkAchievement();
        }
    }

    async function execCode(params: { stdinArray: any[]; code: string }) {
        const compileCode = contentStore.currentContent.body.find((item: any) => item.type === "compile_code").value
        const readyToCompileCode = params.code + "\n\n" + (compileCode ?? "");
        console.log(readyToCompileCode);
        console.log("stdinArray", params.stdinArray)

        const response = await runCode(readyToCompileCode, params.stdinArray, "javascript");

        console.log(response);
        return response;
    }

    async function checkIfUserEligibleToAccessExercise() {
        if (contentStore.currentContent.contentType === "exercise") {
            if (!authStore.user) {
                router.push("/");
            }
        }
    }

    return {
        isCodeExecuting,
        codeResult,
        execute,
        execCode,
        checkIfUserEligibleToAccessExercise,
    };
});
