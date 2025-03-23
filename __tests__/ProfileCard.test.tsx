import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileCard from "../src/app/Components/ProfileCard";

interface ProfileSectionProps {
  username: string;
  description: string;
  following: number;
  followers: number;
  rate: number;
}

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

describe("ProfileCard", () => {
  const mockProps: ProfileSectionProps = {
    username: "JohnDoe",
    description: "Digital artist and NFT collector",
    following: 245,
    followers: 1250,
    rate: 4.8,
  };

  test("renders the profile card with correct user details", () => {
    render(<ProfileCard {...mockProps} />);

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(
      screen.getByText("Digital artist and NFT collector")
    ).toBeInTheDocument();
    expect(screen.getByText("245")).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByText("1250")).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
  });

  test("renders profile images correctly", () => {
    render(<ProfileCard {...mockProps} />);

    const profilePic = screen.getByAltText("profile-pic");
    const followingIcon = screen.getByAltText("following-icon");
    const followersIcon = screen.getByAltText("followers-icon");
    const rateIcon = screen.getByAltText("rate-icon");

    expect(profilePic).toHaveAttribute("src", "/profile-pic-big.png");
    expect(followingIcon).toHaveAttribute("src", "/user-tick.svg");
    expect(followersIcon).toHaveAttribute("src", "/profile-2user.svg");
    expect(rateIcon).toHaveAttribute("src", "/magic-star.svg");
  });

  test("renders with default values when optional props are missing", () => {
    const minimalProps: ProfileSectionProps = {
      username: "JohnDoe",
      description: "Digital artist",
      following: 0,
      followers: 0,
      rate: 0,
    };

    render(<ProfileCard {...minimalProps} />);

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("Digital artist")).toBeInTheDocument();

    const followingSection = screen
      .getByAltText("following-icon")
      .closest("div");
    const followersSection = screen
      .getByAltText("followers-icon")
      .closest("div");
    const rateSection = screen.getByAltText("rate-icon").closest("div");

    expect(followingSection?.querySelector("p")?.textContent).toBe("0");
    expect(followersSection?.querySelector("p")?.textContent).toBe("0");
    expect(
      rateSection?.querySelector(".flex.gap-1.items-center p")?.textContent
    ).toBe("0");
  });
});
