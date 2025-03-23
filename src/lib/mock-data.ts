const mockProducts = [
  {
    title: "Vintage Rolex Submariner Watch",
    startingPrice: "5,000 EGP",
    startingDate: new Date("2025-03-25T14:00:00"),
    imageUrl: "https://example.com/rolex.jpg",
    isLiveAuction: true,
  },
  {
    title: "Antique Victorian Writing Desk",
    startingPrice: "1,200 EGP",
    startingDate: new Date("2025-03-22T10:00:00"),
    imageUrl: "https://example.com/desk.jpg",
    isLiveAuction: false,
  },
  {
    title: "Rare First Edition Book - Great Gatsby",
    startingPrice: "3,500 EGP",
    startingDate: new Date("2025-03-23T16:30:00"),
    imageUrl: "https://example.com/book.jpg",
    isLiveAuction: true,
  },
  {
    title: "Mid-Century Modern Lounge Chair",
    startingPrice: "800",
    startingDate: new Date("2025-03-24T09:00:00"),
    imageUrl: "https://example.com/chair.jpg",
    isLiveAuction: false,
  },
  {
    title: "Vintage Gibson Les Paul Guitar",
    startingPrice: "7,800 EGP",
    startingDate: new Date("2025-03-26T15:00:00"),
    imageUrl: "https://example.com/guitar.jpg",
    isLiveAuction: true,
  },
  {
    title: "Antique Brass Telescope",
    startingPrice: "2,300 EGP",
    startingDate: new Date("2025-03-27T11:30:00"),
    imageUrl: "https://example.com/telescope.jpg",
    isLiveAuction: false,
  },
  {
    title: "Rare 1960s Polaroid Camera",
    startingPrice: "1,500 EGP",
    startingDate: new Date("2025-03-28T13:00:00"),
    imageUrl: "https://example.com/camera.jpg",
    isLiveAuction: true,
  },
  {
    title: "Art Deco Porcelain Vase",
    startingPrice: "900 EGP",
    startingDate: new Date("2025-03-29T10:00:00"),
    imageUrl: "https://example.com/vase.jpg",
    isLiveAuction: false,
  },
  {
    title: "Vintage Omega Speedmaster Watch",
    startingPrice: "6,200 EGP",
    startingDate: new Date("2025-03-30T14:30:00"),
    imageUrl: "https://example.com/omega.jpg",
    isLiveAuction: true,
  },
  {
    title: "Antique Persian Rug",
    startingPrice: "4,000 EGP",
    startingDate: new Date("2025-03-31T12:00:00"),
    imageUrl: "https://example.com/rug.jpg",
    isLiveAuction: false,
  },
  {
    title: "Signed Picasso Lithograph",
    startingPrice: "12,000 EGP",
    startingDate: new Date("2025-04-01T16:00:00"),
    imageUrl: "https://example.com/picasso.jpg",
    isLiveAuction: true,
  },
  {
    title: "Retro Bakelite Radio",
    startingPrice: "1,100 EGP",
    startingDate: new Date("2025-04-02T09:30:00"),
    imageUrl: "https://example.com/radio.jpg",
    isLiveAuction: false,
  },
];
const mockProfileInfo={
  username:"Hala Ahmed",
  description:"I am Hala Ahmed, I am the owner of the local brand called Beauty which is for makeup and skin Care.",
  following:5,
  followers:20,
  rate:4.2
  
}
export { mockProducts,mockProfileInfo}
export type Product = {
  title: string;
  startingPrice: string; 
  startingDate: Date;
  imageUrl: string;
  isLiveAuction: boolean;
};