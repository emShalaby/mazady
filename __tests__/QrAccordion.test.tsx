import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import QrAccordion from "../src/app/Components/QrAccordion";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("QrAccordion", () => {
  it("renders the QR code section with correct title", () => {
    render(<QrAccordion />);
    expect(screen.getByText("QR Code")).toBeInTheDocument();
  });

  it("renders all action buttons", () => {
    render(<QrAccordion />);

    expect(screen.getByAltText("eye-icon")).toBeInTheDocument();
    expect(screen.getByAltText("share-icon")).toBeInTheDocument();
    expect(screen.getByAltText("download-icon")).toBeInTheDocument();
    expect(screen.getByAltText("arrow-icon")).toBeInTheDocument();
  });

  it("renders the help text", () => {
    render(<QrAccordion />);
    expect(
      screen.getByText("Download the QR code or share it with your friends.")
    ).toBeInTheDocument();
  });

  it("renders the QR code content", () => {
    render(<QrAccordion />);

    expect(screen.getByAltText("Mazaady Logo")).toBeInTheDocument();
    expect(screen.getByText("Hala Ahmed")).toBeInTheDocument();
    expect(screen.getByAltText("QR Code")).toBeInTheDocument();
    expect(screen.getByText("Follow Us On Mazaady")).toBeInTheDocument();
  });

  it("toggles content visibility when arrow button is clicked", () => {
    render(<QrAccordion />);

    const content = screen.getByText(
      "Download the QR code or share it with your friends."
    ).parentElement?.parentElement;
    expect(content).toHaveClass("opacity-100");

    const toggleButton = screen.getByAltText("arrow-icon").parentElement;
    fireEvent.click(toggleButton!);

    expect(content).toHaveClass("opacity-0");
  });

  it("renders with correct initial state", () => {
    render(<QrAccordion />);

    const content = screen.getByText(
      "Download the QR code or share it with your friends."
    ).parentElement?.parentElement;
    expect(content).toHaveClass("max-h-[2000px]");
    expect(content).toHaveClass("opacity-100");
  });
});
