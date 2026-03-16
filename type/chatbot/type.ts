export interface Message {
    id: number;
    conversation_id: number;
    sender: "guest" | "admin";
    body: string;
    created_at: string;
}

export interface ChatBotEvent {
    message: Message;
}