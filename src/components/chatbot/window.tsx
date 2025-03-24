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
      <div className="h-[450px] w-[450px] flex flex-col rounded-xl mr-[80px] border-[1px] border-gray-300 shadow-lg relative bg-white">
        <div className="flex justify-between px-4 pt-2 pb-1 sticky top-0 bg-white z-10 rounded-t-xl border-b border-gray-200">
          <div className="flex gap-2 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=TeraSalesAI" alt="TA" />
              <AvatarFallback>Teru</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-sm font-bold leading-tight text-gray-800">
                Sales Rep - TeraSalesAi
              </h3>
              <p className="text-xs text-gray-500">{domainName?.split(".com")[0]}</p>
              <div className="bg-green-400 rounded-full px-2 py-1 text-xs text-white">
                {realtimeMode?.mode && (
                  <RealTimeMode
                    setChats={setChat}
                    chatRoomId={realtimeMode.chatroom}
                  />
                )}
              </div>
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
          className="bg-transparent border-[1px] border-gray-200 mx-2 mt-2 mb-1 rounded-lg shadow-sm"
        >
          <TabsContent value="chat">
            <Separator orientation="horizontal" className="bg-gray-200" />
            <div
              style={{
                background: theme || "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)", // Blue gradient
                color: textColor || "#1f2937", // Dark gray text for contrast
              }}
              className="px-4 py-3 gap-3 overflow-y-auto flex flex-col h-[calc(100%-110px)] rounded-b-lg"
              ref={ref}
            >
              {chats?.map((chat, key) => (
                <Bubble key={key} message={chat} />
              ))}
              {onResponding && <Responding />}
            </div>
          </TabsContent>

          <TabsContent value="helpdesk">
            <div className="h-[300px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 bg-white rounded-lg border border-gray-200">
              <div>
                <CardTitle className="text-base text-gray-800">Help Desk</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                  Browse from a list of questions people usually ask.
                </CardDescription>
              </div>
              <Separator orientation="horizontal" className="bg-gray-200" />
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
        <form
          onSubmit={onChat}
          className="absolute bottom-0 left-0 right-0 flex px-4 py-3 items-center bg-gray-50 border-t border-gray-200 w-full z-20 rounded-b-xl shadow-md"
        >
          <div className="flex-1 relative flex items-center bg-white rounded-full border border-gray-300 shadow-sm overflow-hidden">
            <Input
              {...register("content")}
              placeholder="Type your message..."
              className="focus-visible:ring-0 flex-1 p-3 text-gray-800 placeholder-gray-400 focus-visible:ring-offset-0 rounded-full outline-none border-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 ml-3">
            <Label htmlFor="bot-image" className="cursor-pointer hover:bg-gray-200 p-2 rounded-full transition-colors">
              <Paperclip className="h-5 w-5 text-gray-600" />
              <Input
                {...register("image")}
                type="file"
                id="bot-image"
                className="hidden"
              />
            </Label>
            <Button
              type="submit"
              size="sm"
              className="h-10 w-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </form>
      </div>
    );
  }
);

BotWindow.displayName = "BotWindow"; // Add this for forwardRef compatibility