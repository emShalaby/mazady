import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import OptionsList from "../src/app/Components/OptionsList";
import { getOptionProperties } from "../src/app/actions";
import { Property } from "@/lib/types";

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

jest.mock("../src/app/actions", () => ({
  getOptionProperties: jest.fn(),
}));

describe("OptionsList", () => {
  const mockOptions: Property[] = [
    {
      id: 1,
      name: "Color",
      type: "select",
      parent_id: null,
      options: [
        { id: 11, name: "Red", has_child: false },
        { id: 12, name: "Blue", has_child: true },
      ],
    },
    {
      id: 2,
      name: "Size",
      type: "select",
      parent_id: null,
      options: [
        { id: 21, name: "Small", has_child: false },
        { id: 22, name: "Large", has_child: false },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getOptionProperties as jest.Mock).mockResolvedValue(mockOptions);
  });

  test("renders options with SearchDropdownUi components", async () => {
    await act(async () => {
      render(<OptionsList id={1} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Color")).toBeInTheDocument();
      expect(screen.getByText("Size")).toBeInTheDocument();
    });
  });

  test("fetches options on mount", async () => {
    await act(async () => {
      render(<OptionsList id={1} />);
    });

    await waitFor(() => {
      expect(getOptionProperties).toHaveBeenCalledWith(1);
    });
  });

  test("handles option selection", async () => {
    await act(async () => {
      render(<OptionsList id={1} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Color")).toBeInTheDocument();
    });

    const colorInput = screen.getAllByPlaceholderText("search")[0];

    await act(async () => {
      fireEvent.focus(colorInput);
      fireEvent.change(colorInput, { target: { value: "Red" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Red")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Red"));
    });
  });

  test("renders single SearchDropdownUi when options are empty", async () => {
    const emptyOptions: Property[] = [
      {
        id: 1,
        name: "Empty Category",
        type: "select",
        parent_id: null,
        options: [],
      },
    ];
    (getOptionProperties as jest.Mock).mockResolvedValue(emptyOptions);

    await act(async () => {
      render(<OptionsList id={1} name="Test Category" />);
    });

    await waitFor(() => {
      expect(screen.getByText("Test Category")).toBeInTheDocument();
    });
  });

  test("handles nested options when parent has child", async () => {
    await act(async () => {
      render(<OptionsList id={1} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Color")).toBeInTheDocument();
    });

    const colorInput = screen.getAllByPlaceholderText("search")[0];

    await act(async () => {
      fireEvent.focus(colorInput);
      fireEvent.change(colorInput, { target: { value: "Blue" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Blue")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Blue"));
    });
  });
});
