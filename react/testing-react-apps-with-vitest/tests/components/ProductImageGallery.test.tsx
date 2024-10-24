import { render, screen } from "@testing-library/react";

import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGalleryComponent", () => {
  it("should render the image gallery", () => {
    const imageUrls = ["image1", "image2", "image3"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const list = screen.getAllByRole("listitem");
    expect(list).toHaveLength(imageUrls.length);

    const images = screen.getAllByRole("img");
    images.forEach((url, index) => {
      expect(url).toHaveAttribute("src", imageUrls[index]);
    });
  });

  it("should not render the image gallery if no images are provided", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });
});
