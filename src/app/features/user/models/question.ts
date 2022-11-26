export interface Question {
    topic: string;
    question: string;
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
    }[];
    correctOption: string;
}
