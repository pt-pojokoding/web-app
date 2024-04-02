// @ts-nocheck
import { runCode } from "~/services/content/runCode"

export const useExerciseStore = defineStore("exercise", () => {
    const contentStore = useContentStore()

    async function execCode(params: {stdinArray: any[], code: string}){
        const readyToCompileCode = params.code + "\n\n" + contentStore.currentContent.compileCode

        const response = await runCode(readyToCompileCode, params.stdinArray, contentStore.currentContent.languageConfig.languageName)
        
        return response
    }

    return {
        execCode
    }
})