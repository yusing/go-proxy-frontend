import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Spacer } from "@nextui-org/spacer";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { toast } from "react-toastify";

import AppCard from "@/components/app_card";
import { getHomepageItems, HomepageItems } from "@/types/homepage_item";

export default function AppGroups() {
  const [homepageItems, setHomepageItems] = useState<HomepageItems>({});

  useEffect(() => {
    const fetchHomepageItems = async () => {
      const items = await getHomepageItems();

      setHomepageItems(items);
    };

    fetchHomepageItems().catch((error) => toast.error(error));
  }, []);

  return (
    <div className="w-full bg-transparent dark:bg-transparent ">

      {Object.entries(homepageItems).map(([category, items]) => (
        <Card key={`app-category-${category}`} className="mb-4 p-3">
          <CardHeader>
            <h2 className="text-2xl font-bold">{category}</h2>
          </CardHeader>
          <CardBody>
            <Spacer y={1} />
            <ResponsiveMasonry
              className="flex gap-4"
              columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5 }}
            >
              <Masonry>
                {items.map((item) => (
                  <AppCard key={item.name} item={item} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
