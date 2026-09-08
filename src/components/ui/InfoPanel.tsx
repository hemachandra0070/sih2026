"use client";

import * as React from "react";
import {
  Accordion as AccordionBase,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

export interface InfoPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Accordion = AccordionBase;

export function InfoPanel({ title, children, className }: InfoPanelProps) {
  return (
    <Accordion type="single" collapsible className={className}>
      <AccordionItem value="info">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}