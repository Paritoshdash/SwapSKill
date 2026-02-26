"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Dummy Contacts Data
const CONTACTS = [
    {
        id: 'user_1',
        name: 'Sarah Jenkins',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random',
        lastMessage: 'That sounds perfect! What time works for you tomorrow?',
        time: '10:42 AM',
        unread: 2,
        online: true,
    },
    {
        id: 'user_2',
        name: 'David Smith',
        avatar: 'https://ui-avatars.com/api/?name=David+Smith&background=random',
        lastMessage: 'Thanks for the review. Highly appreciated.',
        time: 'Yesterday',
        unread: 0,
        online: false,
    },
    {
        id: 'user_3',
        name: 'Elena Rodriguez',
        avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random',
        lastMessage: 'Can you show me how you set up that particular lighting rig?',
        time: 'Tuesday',
        unread: 0,
        online: true,
    }
];

// Dummy Messages for a specific chat
const INITIAL_MESSAGES = [
    {
        id: 'm1',
        senderId: 'user_1',
        text: 'Hi Alex! I saw your Next.js Masterclass offering.',
        time: '10:30 AM',
    },
    {
        id: 'm2',
        senderId: 'me', // Represents the logged-in user
        text: 'Hey Sarah! Yes, I just posted it. Are you interested in a swap?',
        time: '10:35 AM',
    },
    {
        id: 'm3',
        senderId: 'user_1',
        text: 'Definitely. I can offer you Advanced Copywriting in exchange. Do you have 2 hours this week?',
        time: '10:40 AM',
    },
    {
        id: 'm4',
        senderId: 'user_1',
        text: 'That sounds perfect! What time works for you tomorrow?',
        time: '10:42 AM',
    }
];

export default function MessagesPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [activeChatId, setActiveChatId] = useState<string | null>('user_1');
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    // For mobile responsiveness: when null, show list. When active, show chat.
    const [isMobileChatView, setIsMobileChatView] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated || !user) return null;

    const activeContact = CONTACTS.find(c => c.id === activeChatId);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: 'm' + Date.now(),
            senderId: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
        setNewMessage('');

        // Simulate a reply
        setTimeout(() => {
            const reply = {
                id: 'm' + (Date.now() + 1),
                senderId: activeContact?.id || 'user_1',
                text: 'Got it! Looking forward to it.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    const selectChat = (id: string) => {
        setActiveChatId(id);
        setIsMobileChatView(true); // Open chat view on mobile
        // If it were a real app, we'd fetch messages for this ID here
        if (id !== 'user_1') {
            setMessages([{ id: 'mock', senderId: id, text: 'Hello from ' + CONTACTS.find(c => c.id === id)?.name, time: 'Now' }]);
        } else {
            setMessages(INITIAL_MESSAGES);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-0 md:pb-8 px-0 sm:px-4 lg:px-8 relative overflow-hidden flex flex-col h-screen">
            {/* Background luxury gradient blurs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/4 z-0"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 translate-y-1/4 z-0"></div>

            <div className="flex-1 max-w-7xl mx-auto w-full relative z-10 animate-fade-in-up md:mt-4 h-full flex flex-col md:bg-[#1a1a1a]/40 md:backdrop-blur-xl md:border md:border-white/10 md:rounded-[2rem] md:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden">

                <div className="flex flex-1 overflow-hidden h-full">
                    {/* Sidebar: Conversation List */}
                    <div className={`w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r border-white/10 bg-[#0f0f0f]/80 md:bg-transparent transition-transform duration-300 ${isMobileChatView ? '-translate-x-full absolute h-full md:translate-x-0 md:relative md:h-auto' : ''}`}>
                        <div className="p-6 border-b border-white/10">
                            <h2 className="text-2xl font-bold text-white tracking-tight">Messages</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto hide-scrollbar p-3 space-y-1">
                            {CONTACTS.map((contact) => (
                                <button
                                    key={contact.id}
                                    onClick={() => selectChat(contact.id)}
                                    className={`w-full text-left flex items-center gap-4 p-3 rounded-2xl transition-all ${activeChatId === contact.id ? 'bg-white/10 shadow-lg border border-white/5' : 'hover:bg-white/5 border border-transparent'}`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-white/10">
                                            <Image src={contact.avatar} alt={contact.name} fill className="object-cover" />
                                        </div>
                                        {contact.online && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#151515] rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-white font-semibold truncate pr-2">{contact.name}</h3>
                                            <span className="text-xs text-gray-500 flex-shrink-0">{contact.time}</span>
                                        </div>
                                        <p className={`text-sm truncate ${contact.unread > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                                            {contact.lastMessage}
                                        </p>
                                    </div>
                                    {contact.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                            <span className="text-[10px] font-bold text-white">{contact.unread}</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className={`flex-1 flex flex-col bg-[#050505] md:bg-transparent h-full transition-transform duration-300 ${!isMobileChatView ? 'translate-x-full absolute w-full md:translate-x-0 md:relative' : ''}`}>
                        {activeContact ? (
                            <>
                                {/* Chat Header */}
                                <div className="h-20 flex items-center justify-between px-6 border-b border-white/10 bg-[#0f0f0f]/95 md:bg-white/5 backdrop-blur-md sticky top-0 z-20">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsMobileChatView(false)}
                                            className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                        </button>
                                        <div className="w-10 h-10 relative rounded-full overflow-hidden border border-white/10">
                                            <Image src={activeContact.avatar} alt={activeContact.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold">{activeContact.name}</h3>
                                            <p className="text-xs text-green-400 font-medium">Online</p>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                    </button>
                                </div>

                                {/* Messages Timeline */}
                                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 hide-scrollbar relative">
                                    <div className="text-center mb-8">
                                        <span className="text-xs font-medium text-gray-500 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">Today</span>
                                    </div>

                                    {messages.map((message) => {
                                        const isMe = message.senderId === 'me';
                                        return (
                                            <div key={message.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
                                                    {!isMe && (
                                                        <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 mb-1 border border-white/10">
                                                            <Image src={activeContact.avatar} alt="Avatar" fill className="object-cover" />
                                                        </div>
                                                    )}

                                                    <div className={`px-5 py-3.5 rounded-2xl ${isMe
                                                        ? 'bg-blue-600 text-white rounded-br-sm shadow-[0_5px_15px_rgba(37,99,235,0.2)]'
                                                        : 'bg-[#222] border border-white/5 text-gray-100 rounded-bl-sm'
                                                        }`}>
                                                        <p className="text-[15px] leading-relaxed">{message.text}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] text-gray-500 mt-1.5 font-medium px-10">{message.time}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 md:p-6 bg-[#0f0f0f]/95 md:bg-white/5 border-t border-white/10 backdrop-blur-md">
                                    <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
                                        {/* Suggestion Chips */}
                                        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                                            {['Yes, works for me!', 'Let me check my calendar.', 'Can we do Google Meet?'].map((chip, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setNewMessage(chip)}
                                                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all whitespace-nowrap"
                                                >
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="relative flex items-center">
                                            <button type="button" className="absolute left-3 p-2 text-gray-400 hover:text-white transition-colors">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                            </button>

                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="w-full bg-[#151515] border border-white/10 rounded-full py-4 pl-12 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
                                            />

                                            <button
                                                type="submit"
                                                disabled={!newMessage.trim()}
                                                className="absolute right-2.5 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:hover:bg-blue-600 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:shadow-none"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 border border-white/10 mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Messages</h3>
                                <p className="text-gray-400 max-w-sm">Select a conversation from the sidebar to view details or start swiping to find new matches.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
