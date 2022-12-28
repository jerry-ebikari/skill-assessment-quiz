export interface User {
    name: string;
    email: string;
    favorites?: string[];
    quizHistory?: {
        name: string,
        numberOfTimesTaken: number,
        bestScore: string
    }[];
    totalNumberOfQuizzesTaken: number;
}

export const defaultUser: User = {
    name: '',
    email: '',
    totalNumberOfQuizzesTaken: 0
}
