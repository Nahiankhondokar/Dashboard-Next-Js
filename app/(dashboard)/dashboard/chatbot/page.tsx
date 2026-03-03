"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {useChatBotStore} from "@/stores/useChatBotStore";

// Types based on our planned schema
interface Conversation {
    id: number;
    guest_id: string;
    guest_name: string;
    last_message: string;
    updated_at: string;
    unread_count: number;
}

interface Message {
    id: number;
    sender: "guest" | "admin";
    body: string;
    created_at: string;
}

export default function Chatbot() {
    const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [reply, setReply] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
        fetchConversations,
        conversations,
        selectConversation,
    } = useChatBotStore();

    console.log(conversations);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        fetchConversations();
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !selectedChat) return;

        const adminMsg: Message = {
            id: Date.now(),
            sender: "admin",
            body: reply,
            created_at: new Date().toISOString()
        };

        setMessages((prev) => [...prev, adminMsg]);
        setReply("");

        try {
            // API Call: await axios.post(`/api/admin/chat/${selectedChat.id}/reply`, { message: reply });
        } catch (error) {
            console.error("Failed to send reply");
        }
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
                    {/* Map through conversations here */}
                    {
                        conversations.map((conversation) => (
                           <>
                               <div
                                   onClick={() => selectConversation(conversation)}
                                   className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${selectedChat?.id === 1 ? 'bg-muted' : ''}`}
                               >
                                   <div className="flex justify-between items-start mb-1">
                                       <span className="font-semibold text-sm">{conversation.guest_id || "Guest #120"}</span>
                                       <span className="text-[10px] text-muted-foreground">2m ago</span>
                                   </div>
                                   <p className="text-xs text-muted-foreground truncate italic">"Hello! I wanted to ask..."</p>
                                   <Badge className="mt-2 bg-yellow-500 text-black hover:bg-yellow-500">2 New</Badge>
                               </div>
                           </>
                        ))
                    }


                </ScrollArea>
            </div>

            {/* --- RIGHT SIDE: Message Thread --- */}
            <div className="flex-1 flex flex-col bg-background">
                {selectedChat ? (
                    <>
                        {/* Thread Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">{selectedChat.guest_name}</h3>
                                    <p className="text-[10px] text-muted-foreground">ID: {selectedChat.guest_id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
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

                        {/* Reply Form */}
                        <form onSubmit={handleSendReply} className="p-4 border-t bg-muted/5 flex gap-2">
                            <Input
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Write a reply..."
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