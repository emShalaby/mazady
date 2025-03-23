import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BurgerMenu from "../src/app/Components/BurgerMenu";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      priority?: boolean;
      fill?: boolean;
    }
  ) => {
    const { src, alt, width, height, priority, fill, ...rest } = props;
    return (
      <img
        src={src as string}
        alt={alt}
        width={width}
        height={height}
        data-priority={priority ? "true" : undefined}
        data-fill={fill ? "true" : undefined}
        {...rest}
      />
    );
  },
}));

jest.mock("react-burger-menu", () => ({
  slide: ({
    children,
    className,
    width,
  }: {
    children: React.ReactNode;
    className?: string;
    width?: string;
    isOpen?: boolean;
    onStateChange?: (state: { isOpen: boolean }) => void;
  }) => (
    <div data-testid="burger-menu" className={className} style={{ width }}>
      {children}
    </div>
  ),
}));

describe("BurgerMenu", () => {
  const mockUserId = "123";

  test("renders burger menu button", () => {
    render(<BurgerMenu userId={mockUserId} />);

    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    expect(menuButton).toBeInTheDocument();
    expect(screen.getByAltText("menu-icon")).toBeInTheDocument();
  });

  test("renders navigation links with correct hrefs", () => {
    render(<BurgerMenu userId={mockUserId} />);

    const homeLink = screen.getByText("Home");
    const blogLink = screen.getByText("Blog");
    const giftsLink = screen.getByText("Gifts");

    expect(homeLink).toHaveAttribute("href", `/profile/${mockUserId}`);
    expect(blogLink).toHaveAttribute("href", `/profile/${mockUserId}/blog`);
    expect(giftsLink).toHaveAttribute("href", `/profile/${mockUserId}/gifts`);
  });
});
