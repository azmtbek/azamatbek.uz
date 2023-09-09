"use client";
import useHaveBeen from "@/store/useHaveBeen";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Zap } from "lucide-react";

const questions = [
  {
    value: "item-1",
    question: "Why is the website like this?",
    answer:
      "Because I wanted it like this. I wanted to try something different, not ordinary. I wanted to see something that I own and control. Something unique. Wanted to be seen as an adventure. Let the person being in the website feel some joy by discovering it's wonders.",
  },
  {
    value: "item-2",
    question: "Hints?",
    answer: "Go everywhere, every corner. Try everything, day and night.",
  },
];

const Why = () => {
  const { addPath } = useHaveBeen();
  useEffect(() => {
    addPath("/why");
  }, [addPath]);
  return (
    <div className="flex flex-col  items-center justify-between min-h-screen py-24">
      <h1 className="text-3xl flex items-center gap-2">
        FAQ <Zap />
      </h1>
      <div className="w-64 md:w-[720px]">
        <Accordion type="single" collapsible>
          {questions.map((q) => (
            <FAQItem
              key={q.value}
              value={q.value}
              question={q.question}
              answer={q.answer}
            />
          ))}
        </Accordion>
      </div>

      <div>
        credits to:
        <div>
          <span>
            Shooting Stars
          </span>
          <span>
            <a
              className="underline pl-2"
              href="https://codepen.io/YusukeNakaya/pen/XyOaBj"
            >
              CodePen Yusuke Nakaya
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

type FAQItemType = {
  value: string;
  question: string;
  answer: string;
};

const FAQItem = ({ value, question, answer }: FAQItemType) => (
  <AccordionItem value={value}>
    <AccordionTrigger>
      {question}
    </AccordionTrigger>
    <AccordionContent>
      {answer}
    </AccordionContent>
  </AccordionItem>
);

export default Why;
