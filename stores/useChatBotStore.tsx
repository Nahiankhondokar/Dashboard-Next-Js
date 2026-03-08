import { create } from 'zustand';
import { apiFetch } from '@/lib/api'; // Assuming your api helper

interface Conversation {
    id: number;
    guest_id: string;
    guest_name: string | null;
    last_message_at: string;
    created_at: string;
    updated_at: string;
    messages: Message[]
}

interface Message {
    id: number;
    conversation_id: number;
    sender: "guest" | "admin";
    body: string;
    created_at: string;
}

interface ChatState {
    conversations: Conversation[];
    messages: Message[];
    setMessages: (message: Message) => void;
    loading: boolean;
    selectedConversation: Conversation | null;


    // Actions
    fetchConversations: () => Promise<void>;
    fetchMessages: (conversationId: number) => Promise<void>;
    fetchMessagesByGuestId: (guestId: string) => Promise<void>;
    selectConversation: (conv: Conversation) => void;
    sendReply: (conversationId: number, body: string) => Promise<void>;
    addMessage: (message: Message) => void; // For real-time updates
}

export const useChatBotStore = create<ChatState>((set, get) => ({
    conversations: [],
    messages: [],
    loading: false,
    selectedConversation: null,
    setMessages: (message:Message) => {
        set((state) => ({
            messages: [message, ...state.messages]
        }));

        console.log(get().messages)
    },

    fetchConversations: async () => {
        set({ loading: true });
        try {
            const data = await apiFetch('chatbot/conversations') as Conversation[];
            set({ conversations: data });

            // Automatically select the first conversation if it exists
            if (data.length > 0) {
                get().selectConversation(data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch conversations", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchMessages: async (conversationId: number) => {
        // No need to set global loading here if you want smooth transitions
        try {
            const data = await apiFetch(`chatbot/conversations/${conversationId}/messages`) as Message[];
            set({ messages: data });
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    },

    fetchMessagesByGuestId: async (guestId: string) => {
        // No need to set global loading here if you want smooth transitions
        try {
            const data = await apiFetch(`v1/public/chatbot/conversations/${guestId}/messages`) as Message[];
            set({ messages: data });
            console.log(get().messages)
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    },

    selectConversation: (conv) => {
        set({ selectedConversation: conv });
        // Fetch the messages for this specific conversation
        get().fetchMessages(conv.id);
    },

    sendReply: async (conversationId, body: string) => {
        try {
            const newMessage = await apiFetch(`chatbot/conversations/${conversationId}/reply`, {
                method: 'POST',
                body: JSON.stringify({body})
            }) as Message;

            console.log('old-msg-',get().messages);
            console.log('new-msg-',newMessage);

            // Append the new admin message to the thread
            // set((state) => ({ messages: [...state.messages, newMessage] }));
        } catch (error) {
            console.error("Reply failed", error);
        }
    },

    addMessage: (message) =>
        set((state) => {
            const exists = state.messages.some(m => m.id === message.id);

            if (exists) return state;

            return {
                messages: [...state.messages, message]
            };
        }),
}));