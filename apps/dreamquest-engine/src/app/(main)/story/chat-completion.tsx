"use client";

import { useChat } from "ai/react";

import { Input } from "@dq/ui/input";

export function Chat() {
  const { messages, input, handleSubmit, handleInputChange } = useChat();
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        {messages.map((m) => (
          <div key={m.id}>
            <b>{m.role}</b>: {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
