import React from "react";
import { render } from "@testing-library/react";
import Title from "./Title";
import useDarkMode from "../../../hooks/useDarkMode";

test("renders the correct text and attributes for the title element", () => {
    const { enable } = useDarkMode();
    enable();

    const { getByRole } = render(<Title as="h1" label="Section title">Section 1</Title>);

    const titleElement = getByRole("heading", { level: 1 });
    expect(titleElement).toHaveTextContent("Section 1");
    expect(titleElement).toHaveAttribute("aria-label", "Section title");
    expect(titleElement).toHaveClass("text-3xl");
    expect(titleElement).toHaveClass("leading-9");
    expect(titleElement).toHaveClass("font-bold");
    expect(titleElement).toHaveClass("font-sans");
    expect(titleElement).toHaveClass("tracking-normal");
    expect(titleElement).toHaveClass("dark:text-white");
});

test("renders the correct text and attributes for the title element in dark mode", () => {
    const { disable } = useDarkMode();
    disable();

    const { getByRole } = render(<Title as="h2" label="Section title">Section 2</Title>);

    const titleElement = getByRole("heading", { level: 2 });
    expect(titleElement).toHaveTextContent("Section 2");
    expect(titleElement).toHaveAttribute("aria-label", "Section title");
    expect(titleElement).toHaveClass("text-xl");
    expect(titleElement).toHaveClass("leading-normal");
    expect(titleElement).toHaveClass("font-bold");
    expect(titleElement).toHaveClass("font-sans");
    expect(titleElement).toHaveClass("tracking-tight");
    expect(titleElement).toHaveClass("text-onyx");
});