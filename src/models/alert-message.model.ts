export type SeverityType = 'success' | 'info' | 'warning' | 'error';

export interface IAlertMessage {
    messageId: number,
    severity: SeverityType;
    message: string;
}