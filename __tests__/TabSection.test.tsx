import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabSection from "../src/app/Components/TabSection";
import { Product } from "@/lib/mock-data";

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

jest.mock("react-virtualized", () => ({
  AutoSizer: ({
    children,
  }: {
    children: (size: { width: number; height: number }) => React.ReactNode;
  }) => children({ width: 1000, height: 500 }),
  List: ({
    rowRenderer,
  }: {
    rowRenderer: (props: {
      index: number;
      key: string;
      style: React.CSSProperties;
      parent: {
        props: { deferredMeasurementCache: { clear: () => void } };
      } | null;
    }) => React.ReactNode;
  }) => {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(
        rowRenderer({
          index: i,
          key: `row-${i}`,
          style: {},
          parent: null,
        })
      );
    }
    return <div data-testid="virtualized-list">{items}</div>;
  },
  CellMeasurer: ({
    children,
  }: {
    children: (props: {
      measure: () => void;
      registerChild: (element: HTMLElement | null) => void;
    }) => React.ReactNode;
  }) => children({ measure: jest.fn(), registerChild: jest.fn() }),
  CellMeasurerCache: jest.fn().mockImplementation(() => ({
    rowHeight: jest.fn(),
    clear: jest.fn(),
  })),
}));

describe("TabSection", () => {
  const mockProducts: Product[] = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    startingPrice: `${1000 + index * 100} EGP`,
    startingDate: new Date(),
    imageUrl: `/item-${index + 1}.jpg`,
    isLiveAuction: index % 2 === 0,
  }));

  const mockReviews: Product[] = [];
  const mockArticles: Product[] = [];

  test("renders tab buttons correctly", () => {
    render(
      <TabSection
        products={mockProducts}
        reviews={mockReviews}
        articles={mockArticles}
      />
    );

    const productsTab = screen.getByRole("button", { name: "Products" });
    const articlesTab = screen.getByRole("button", { name: "Articles" });
    const reviewsTab = screen.getByRole("button", { name: "Reviews" });

    expect(productsTab).toBeInTheDocument();
    expect(articlesTab).toBeInTheDocument();
    expect(reviewsTab).toBeInTheDocument();
  });

  test("switches between tabs when clicked", () => {
    render(
      <TabSection
        products={mockProducts}
        reviews={mockReviews}
        articles={mockArticles}
      />
    );

    const productsTab = screen.getByRole("button", { name: "Products" });
    const articlesTab = screen.getByRole("button", { name: "Articles" });

    fireEvent.click(articlesTab);
    expect(articlesTab).toHaveClass(
      "border-[#FF951D]",
      "bg-[#fff5e9]",
      "text-[#FF951D]"
    );
    expect(productsTab).not.toHaveClass(
      "border-[#FF951D]",
      "bg-[#fff5e9]",
      "text-[#FF951D]"
    );

    fireEvent.click(productsTab);
    expect(productsTab).toHaveClass(
      "border-[#FF951D]",
      "bg-[#fff5e9]",
      "text-[#FF951D]"
    );
    expect(articlesTab).not.toHaveClass(
      "border-[#FF951D]",
      "bg-[#fff5e9]",
      "text-[#FF951D]"
    );
  });

  test("displays correct number of items", () => {
    render(
      <TabSection
        products={mockProducts}
        reviews={mockReviews}
        articles={mockArticles}
      />
    );

    expect(screen.getByText(`( ${mockProducts.length} )`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Articles" }));
    expect(screen.getByText("( 0 )")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reviews" }));
    expect(screen.getByText("( 0 )")).toBeInTheDocument();
  });

  test("renders Add Review button", () => {
    render(
      <TabSection
        products={mockProducts}
        reviews={mockReviews}
        articles={mockArticles}
      />
    );

    const addReviewButtons = screen.getAllByText("Add Review");
    expect(addReviewButtons).toHaveLength(2);
  });

  test("renders product cards with correct data", () => {
    render(
      <TabSection
        products={mockProducts}
        reviews={mockReviews}
        articles={mockArticles}
      />
    );

    const virtualizedList = screen.getByTestId("virtualized-list");
    expect(virtualizedList).toBeInTheDocument();

    mockProducts.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.startingPrice)).toBeInTheDocument();
    });
  });
});
