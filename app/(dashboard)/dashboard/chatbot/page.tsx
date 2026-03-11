"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useChatBotStore } from "@/stores/useChatBotStore";
import { formatDistanceToNow } from "date-fns";
import {echo} from "@/lib/echo";

export default function Chatbot() {
    const [reply, setReply] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        fetchConversations,
        conversations,
        selectedConversation, // The Data
        selectConversation,   // The Action
        messages,             // The Message Thread
        sendReply
    } = useChatBotStore();

    // 1. Setup Listener ONCE on mount
    useEffect(() => {
        fetchConversations();

        echo?.private('admin.inbox')
            .listen('ChatBotEvent', (e: any) => {
                const incomingMsg = e.message;

                // ONLY push to current chat window if it matches
                // We use a functional update check or a ref to avoid stale closures
                useChatBotStore.setState((state) => {
                    if (state.selectedConversation?.id === incomingMsg.conversation_id) {
                        // Prevent duplicate if admin is the one who sent it
                        const exists = state.messages.some(m => m.id === incomingMsg.id);
                        if (!exists) {
                            return { messages: [...state.messages, incomingMsg] };
                        }
                    }
                    return state;
                });
            });

        return () => echo?.leaveChannel('admin.inbox');

    }, []);


    // 2. Separate Scroll Logic
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // Scroll to bottom whenever messages change

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !selectedConversation) return;

        // Use the store action to send reply
        await sendReply(selectedConversation.id, reply);
        setReply("");
    };

    return (
        <div className="flex h-[calc(100vh-120px)] border rounded-xl overflow-hidden bg-card">
            {/* --- LEFT SIDE: Conversation List --- */}
            <div className="w-80 border-r flex flex-col bg-muted/10">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-bold mb-4">Guest Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search guests..." className="pl-8" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => selectConversation(conversation)}
                            className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                                selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-sm truncate max-w-[120px]">
                                    {conversation.guest_name || `Guest #${conversation.id}`}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    {conversation.updated_at} ago
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate italic">
                                Last active: {conversation.guest_id.slice(0, 8)}...
                            </p>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* --- RIGHT SIDE: Message Thread --- */}
            <div className="flex-1 flex flex-col bg-background">
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b flex items-center justify-between bg-muted/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">
                                        {selectedConversation.guest_name || "Anonymous Guest"}
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground">
                                        UUID: {selectedConversation.guest_id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <ScrollArea className="flex-1 p-6">
                            <div className="space-y-4">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                                            m.sender === "admin"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none border"
                                        }`}>
                                            {m.body}
                                            <p className="text-[9px] mt-1 opacity-70 text-right">
                                                {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>

                        <form onSubmit={handleSendReply} className="p-4 border-t bg-muted/5 flex gap-2">
                            <Input
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1"
                            />
                            <Button type="submit" disabled={!reply.trim()}>
                                <Send size={18} className="mr-2" /> Reply
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <User size={48} className="mb-4 opacity-20" />
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}