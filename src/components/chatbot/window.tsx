import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealTimeMode from "./real-time";
import Image from "next/image";
import TabsMenu from "../tabs/intex";
import { BOT_TABS_MENU } from "@/constants/menu";
import ChatIcon from "@/icons/chat-icon";
import { TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Bubble from "./bubble";
import { Responding } from "./responding";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "../ui/label";
import { CardDescription, CardTitle } from "../ui/card";
import Accordion from "../accordian";
import UploadButton from "../upload-button";

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  helpdesk: {
    id: string;
    question: string;
    answer: string;
    domainId: string | null;
  }[];
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
    },
    ref
  ) => {
    return (
      <div className="h-[450px] w-[450px] flex flex-col rounded-xl mr-[80px] border-[1px] overflow-auto">
        <div className="flex justify-between px-4 pt-2 pb-1 sticky top-0 bg-white z-10">
          <div className="flex gap-2 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-sm font-bold leading-tight">
                Sales Rep - Eliodtech
              </h3>
              <p className="text-xs">{domainName?.split(".com")[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
          <div className="relative w-10 h-10">
            <Image
              src="https://ucarecdn.com/019dd17d-b69b-4dea-a16b-60e0f25de1e9/propuser.png"
              fill
              alt="users"
              objectFit="contain"
            />
          </div>
        </div>
        <TabsMenu
          triggers={BOT_TABS_MENU}
          className="bg-transparent border-[1px] border-border mx-2 mb-1"
        >


<TabsContent value="chat">
  <Separator orientation="horizontal" />
  <div className="flex flex-col h-full relative">
    <div
      style={{
        background: theme || "",
        color: textColor || "",
      }}
      className="px-3 flex flex-1 flex-col py-2 gap-2 chat-window overflow-y-auto"
      ref={ref}
    >
      {chats?.map((chat, key) => (
        <Bubble key={key} message={chat} />
      ))}
      {onResponding && <Responding />}
    </div>
    <form
      onSubmit={onChat}
      className="flex px-3 py-2 items-center bg-gray-100 border-t w-full sticky bottom-0 left-0 right-0"
    >
      <div className="flex-1 relative flex items-center bg-white rounded-lg border overflow-hidden">
        <Input
          {...register("content")}
          placeholder="Type your message..."
          className="focus-visible:ring-0 flex-1 p-2 focus-visible:ring-offset-0 rounded-lg outline-none border-none bg-transparent"
        />
      </div>
      <div className="flex items-center gap-2 ml-2">
        <Label htmlFor="bot-image" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-colors">
          <Paperclip className="h-5 w-5" />
          <Input
            {...register("image")}
            type="file"
            id="bot-image"
            className="hidden"
          />
        </Label>
        <Button type="submit" size="sm" className="h-9 w-9 p-0 rounded-full">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  </div>
</TabsContent>


          <TabsContent value="helpdesk">
            <div className="h-[300px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
              <div>
                <CardTitle className="text-base">Help Desk</CardTitle>
                <CardDescription className="text-xs">
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" />

              {helpdesk?.map((desk) => (
                <Accordion
                  key={desk.id}
                  trigger={desk.question}
                  content={desk.answer}
                />
              ))}
            </div>
          </TabsContent>
        </TabsMenu>
      </div>
    );
  }
);