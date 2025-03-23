import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import ProductCard from "../src/app/Components/ProductCard";
import * as dateFns from "date-fns";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock date-fns functions
jest.mock("date-fns", () => ({
  differenceInDays: jest.fn(),
  differenceInHours: jest.fn(),
  differenceInMinutes: jest.fn(),
}));

describe("ProductCard", () => {
  const mockProps = {
    title: "Test Product",
    startingPrice: "5,000 EGP",
    startingDate: new Date("2024-12-31"),
    imageUrl: "/test-image.jpg",
    isLiveAuction: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock time differences
    (dateFns.differenceInDays as jest.Mock).mockReturnValue(2);
    (dateFns.differenceInHours as jest.Mock).mockReturnValue(51);
    (dateFns.differenceInMinutes as jest.Mock).mockReturnValue(3090);
  });

  test("renders product details correctly", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.startingPrice)).toBeInTheDocument();
    expect(screen.getByText("Starting Price")).toBeInTheDocument();
    expect(screen.getByText("Live Auction")).toBeInTheDocument();
  });

  test("displays correct time remaining", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
  });

  test("shows Hot Sale badge when isLiveAuction is false", () => {
    render(<ProductCard {...mockProps} isLiveAuction={false} />);

    expect(screen.getByText("Hot Sale")).toBeInTheDocument();
    expect(screen.queryByText("Live Auction")).not.toBeInTheDocument();
  });

  test("displays time remaining section correctly", () => {
    render(<ProductCard {...mockProps} />);

    expect(screen.getByText("Lot Starts In")).toBeInTheDocument();

    const timeContainers = screen.getAllByText(/Days|Hours|Minutes/);
    timeContainers.forEach((container) => {
      expect(container.parentElement).toHaveClass("bg-[#fff8e1]");
    });
  });
});
