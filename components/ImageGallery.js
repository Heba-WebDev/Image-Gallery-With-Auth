import { useDrag, useDrop } from "react-dnd";
import { useRef, useCallback, useState } from "react";
import Image from "next/image";

const data = [
  {
    id: 0,
    img_path: "/images/tech/internetofthings.jpg",
    alt: "Internet of Things",
    tags: ["Tech", "IoT"],
  },
  {
    id: 1,
    img_path: "/images/tech/software.jpg",
    alt: "Mobile App Development",
    tags: ["Tech", "Apps Development"],
  },
  {
    id: 2,
    img_path: "/images/tech/robotics.jpg",
    alt: "Robotics",
    tags: ["Tech", "Robotics"],
  },
  {
    id: 3,
    img_path: "/images/tech/vr1.jpg",
    alt: "Virtual Reality",
    tags: ["Tech", "Virtual Reality"],
  },
  {
    id: 4,
    img_path: "/images/tech/network.jpg",
    alt: "Network",
    tags: ["Tech", "Network"],
  },
  {
    id: 5,
    img_path: "/images/tech/videogames.jpg",
    alt: "Video Games Development",
    tags: ["Tech", "Games Development"],
  },
];

export default function ImageGallery({ tag }) {
  const [images, setImages] = useState(data);

  const moveImage = useCallback(
    (dragIndex, hoverIndex) => {
      const draggedImage = images[dragIndex];
      const updatedImages = [...images];
      updatedImages.splice(dragIndex, 1);
      updatedImages.splice(hoverIndex, 0, draggedImage);
      setImages(updatedImages);
    },
    [images]
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-[4rem]">
      {tag
        ? images
            .filter((x) =>
              x.tags.some(
                (y) => y.toLowerCase().trim() == tag.toLowerCase().trim()
              )
            )
            .map((category, index) => (
              <ImageCard
                key={category.id}
                id={category.id}
                category={category}
                index={index}
                moveImage={moveImage}
              />
            ))
        : images.map((category, index) => (
            <ImageCard
              key={category.id}
              id={category.id}
              category={category}
              index={index}
              moveImage={moveImage}
            />
          ))}
    </section>
  );
}

function ImageCard({ category, index, moveImage }) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { id: category.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      key={category.id}
      ref={ref}
      className="border gap-2 grid pb-4 shadow-lg hover:cursor-pointer"
      style={{ opacity }}
    >
      <Image
        src={category.img_path}
        alt={category.alt}
        width={1880}
        height={1000}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        className="w-full"
      />
      <div className="flex ml-1 gap-2 text-sm align-self-end">
        {category.tags.map((tag, tagIndex) => (
          <div
            key={tagIndex}
            className="bg-blue-50 w-fit flex items-center rounded-full px-4 border py-[0.3px] text-sm font-[500] text-blue-700"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
