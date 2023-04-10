export interface message {
    bot_response: boolean;
    content: string;
    cssClass: string;
}
export interface GPT_response_format {
    role: string;
    content: string;
}
export const OPEN_AI_KEY: string = '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'