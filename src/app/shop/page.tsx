import { getAllCategories, getCategoryProperties } from "@/app/actions";
import { Category } from "@/lib/types";
import SearchDropdown from "../Components/SearchDropdown";

const ShopPage = async () => {
  const categories = await getAllCategories();
  return (
    <div className="flex flex-col bg-gray-100 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <form className="space-y-2">
        <SearchDropdown
          items={categories}
          onSelect={async (item: Category) => {
            "use server";
            const data = await getCategoryProperties(item.id);
            console.log(data);
          }}
        />
      </form>
    </div>
  );
};
export default ShopPage;
