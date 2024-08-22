export type Achievement = {
    id: string;
    name: string;
    type: "quiz" | "exercise";
    description: string;
    icon: string;
    [key: string]: number | string;
} & (
    | {
          type: "quiz";
          minQuiz: number;
      }
    | {
          type: "exercise";
          minExercise: number;
      }
);