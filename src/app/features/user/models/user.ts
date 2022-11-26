export interface User {
    firstName: string;
    surname?: string;
    email: string;
    favorites?: string[];
    quizHistory?: {
        name: string,
        numberOfTimesTaken: number,
        bestScore: string
    }[];
    totalNumberOfQuizzesTaken: number;
}
