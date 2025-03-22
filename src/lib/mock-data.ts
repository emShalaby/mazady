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
];
const mockProfileInfo={
  username:"Heba Ahmed",
  description:"I am Hala Ahmed, I am the owner of the local brand called Beauty which is for Mackeup and kin Care.",
  following:5,
  followers:20,
  rate:4.2
  
}
export { mockProducts,mockProfileInfo}