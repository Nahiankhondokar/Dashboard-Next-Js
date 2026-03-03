import { create } from 'zustand';
import { apiFetch } from '@/lib/api'; // Assuming your api helper

interface Conversation {
    id: number;
    guest_id: string;
    guest_name: string | null;
    last_message_at: string;
    created_at: string;
    updated_at: string;
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
    loading: boolean;
    selectedConversation: Conversation | null;

    // Actions
    fetchConversations: () => Promise<void>;
    fetchMessages: (conversationId: number) => Promise<void>;
    selectConversation: (conv: Conversation) => void;
    sendReply: (conversationId: number, body: string) => Promise<void>;
    addMessage: (message: Message) => void; // For real-time updates
}

export const useChatBotStore = create<ChatState>((set, get) => ({
    conversations: [],
    messages: [],
    loading: false,
    selectedConversation: null,

    fetchConversations: async () => {
        set({ loading: true });
        try {
            // Cast the response to the expected type
            const data = await apiFetch('chatbot/conversations') as Conversation[];
            set({ conversations: data });
        } catch (error) {
            console.error("Failed to fetch conversations", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchMessages: async (conversationId: number) => {
        set({ loading: true });
        try {
            // Cast the response to the Message interface array
            const data = await apiFetch(`/chatbot/conversations/${conversationId}/messages`) as Message[];
            set({ messages: data });
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            set({ loading: false });
        }
    },

    selectConversation: (conv) => {
        set({ selectedConversation: conv });
        // get().fetchMessages(conv.id);
    },

    sendReply: async (conversationId, body) => {
        try {
            const newMessage = await apiFetch(`/admin/conversations/${conversationId}/reply`, {
                method: 'POST',
                body: { body }
            });
            // Append the new admin message to the thread
            // set((state) => ({ messages: [...state.messages, newMessage] }));
        } catch (error) {
            console.error("Reply failed", error);
        }
    },

    addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
    }
}));