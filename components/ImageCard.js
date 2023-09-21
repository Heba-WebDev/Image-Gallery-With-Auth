import Image from "next/image";
import { useDrag } from "react-dnd";

export default function ImageCard({ category }) {
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { id: category.id }, // Specify the item you want to drag
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div key={category.id} className="relative" ref={drag}>
      <Image
        src={category.img_path}
        alt={category.alt}
        width={1920}
        height={1300}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        className="h-auto max-w-full "
      />
      <div className="absolute bottom-2 left-2 flex gap-2 text-sm">
        {category.tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="bg-white text-blue-600 py-[0.3px] px-2 rounded-lg"
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}
