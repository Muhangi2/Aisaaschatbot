"use client";
import { useChatBot } from "@/hooks/chatbot/use-chatbot";
import React from "react";
import { BotWindow } from "./window";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BotIcon } from "@/icons/bot-icon";
import HelpDesk from "../forms/settings/help-desk";

type Props = {};

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot();
  console.log(botOpened, "botOpened");
  console.log(currentBot?.chatBot?.helpdesk,"current help desk")
  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4 bg-green-20">
      <BotWindow
        errors={errors}
        setChat={setOnChats}
        realtimeMode={onRealTime}
        helpdesk={currentBot?.helpdesk!}
        domainName={currentBot?.name!}
        ref={messageWindowRef}
        help={currentBot?.chatBot?.helpdesk}
        theme={currentBot?.chatBot?.background}
        textColor={currentBot?.chatBot?.textColor}
        chats={onChats}
        register={register}
        onChat={onStartChatting}
        onResponding={onAiTyping}
      />

      {/* {botOpened && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messageWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )} */}
      <div
        className={cn(
          "rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-white",
          loading ? "invisible" : "visible"
        )}
        // className="bg-blue-40"
      >
        <BotIcon />

        {/* <Image
          // src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
          src="/images/prop-user.png"
          alt="bot"
          fill
        /> */}

        {/* {currentBot?.chatBot?.icon ? (
          <Image
            // src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            src="/images/prop-user.png"
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )} */}
      </div>
    </div>
  );
};

export default AiChatBot;
