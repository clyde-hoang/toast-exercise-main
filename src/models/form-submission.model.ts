export interface IFormSubmission {
    id: string;
    data: IFormSubmissionData;
}

export interface IFormSubmissionData {
    email: string;
    firstName: string;
    lastName: string;
    liked: boolean;
}