"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: number;
    sender: "guest" | "admin";
    body: string;
    created_at: string;
}

export default function ChatWidget({ guestId }: { guestId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // 1. Initial Load & Real-time Listener (Laravel Echo)
    useEffect(() => {
        // Fetch existing messages from your API
        // fetchMessages();

        // Example Echo Listener (if using Reverb/Pusher)
        /*
        window.Echo.private(`chat.${guestId}`)
          .listen('MessageSent', (e: { message: Message }) => {
            setMessages((prev) => [...prev, e.message]);
          });
        */

        return () => {
            // window.Echo.leave(`chat.${guestId}`);
        };
    }, [guestId]);

    // 2. Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessage = {
            guest_id: guestId,
            message: input,
        };

        try {
            // Optimistic Update (Show message immediately)
            const tempMsg: Message = {
                id: Date.now(),
                sender: "guest",
                body: input,
                created_at: new Date().toISOString()
            };
            setMessages([...messages, tempMsg]);
            setInput("");

            // API Call to Laravel
            // await axios.post('/api/chat/send', newMessage);

        } catch (error) {
            console.error("Failed to send", error);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
                    S
                </div>
                <div>
                    <p className="text-sm font-semibold">Support Admin</p>
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Online
                    </p>
                </div>
            </div>

            {/* Message List */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "guest" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                    msg.sender === "guest"
                                        ? "bg-yellow-500 text-black rounded-tr-none"
                                        : "bg-slate-800 text-white rounded-tl-none border border-slate-700"
                                }`}
                            >
                                {msg.body}
                            </div>
                        </div>
                    ))}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Message Form */}
            <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-slate-700 flex items-center gap-2 bg-slate-800/30"
            >
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-slate-900 border-slate-700 focus-visible:ring-yellow-500"
                />
                <Button
                    type="submit"
                    size="icon"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black shrink-0"
                >
                    <Send size={18} />
                </Button>
            </form>
        </div>
    );
}