import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// eslint-disable-next-line react/prop-types
const SortableItem = ({ song, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center space-x-3 py-2 cursor-pointer"
    >
      <img
        src={song.cover}
        alt={song.title}
        className="w-10 h-10 rounded-md"
      />
      <div>
        <p className="text-sm font-medium">{song.title}</p>
        <p className="text-xs text-gray-400">{song.artist}</p>
      </div>
    </div>
  );
};

const MusicPlayerModal = () => {
  const {
    isPlaying,
    handlePlayPause,
    handlePrevSong,
    handleNextSong,
    queue,
    setQueue,
  } = useAudio();

  const [isFixed, setIsFixed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const currentSong = queue[0];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // activationConstraint: {
      //   distance: 5,
      // },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const upcomingSongs = queue.slice(1);

      const oldIndex = upcomingSongs.findIndex(
        (song) => song.title === active.id
      );
      const newIndex = upcomingSongs.findIndex(
        (song) => song.title === over.id
      );

      const updatedUpcoming = arrayMove(upcomingSongs, oldIndex, newIndex);
      const updatedQueue = [queue[0], ...updatedUpcoming];

      setQueue(updatedQueue);
    }
  };

  return (
    <>
      {!isFixed && (
        <div
          className="fixed bottom-0 left-0 w-40 h-20"
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      <div
        className={`fixed bottom-4 left-4 bg-[#222222] border border-[#000000] p-4 rounded-lg shadow-lg text-white w-84 transition-all duration-300 ease-in-out
          ${isFixed || isHovered ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}
          ${showQueue ? "h-96" : "h-40"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Música</h3>
          <button
            onClick={() => setIsFixed(!isFixed)}
            className="text-gray-400 hover:text-white"
          >
            <img
              src={`/${isFixed ? "down" : "up"}.svg`}
              alt="Toggle"
              className="w-6 h-6"
            />
          </button>
        </div>

        {currentSong && (
          <div className="flex items-center space-x-4 mb-3 p-2 bg-[#333] rounded-md">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-12 h-12 rounded-md"
            />
            <div>
              <p className="text-base font-medium">{currentSong.title}</p>
              <p className="text-xs text-gray-400">{currentSong.artist}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mb-2">
          <button
            onClick={() => setShowQueue(!showQueue)}
            className="px-3 py-1 rounded"
          >
            <img
              src="/queue.svg"
              alt="Lista"
              className="w-6 h-6 hover:opacity-80"
            />
          </button>
          <button onClick={handlePrevSong}>
            <img src="/prev.svg" className="w-6 h-6" />
          </button>
          <button onClick={handlePlayPause}>
            <img
              src={`/${isPlaying ? "pause" : "play"}.svg`}
              className="w-6 h-6"
            />
          </button>
          <button onClick={handleNextSong}>
            <img src="/next.svg" className="w-6 h-6" />
          </button>
        </div>

        {showQueue && (
          <DndContext
            sensors={sensors}
            modifiers={[restrictToVerticalAxis]}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={queue.slice(1).map((song) => song.title)}
              strategy={verticalListSortingStrategy}
            >
              <div className="mt-4 max-h-60 overflow-y-auto pb-4">
                {queue.slice(1).map((song) => (
                  <SortableItem key={song.title} id={song.title} song={song} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </>
  );
};

export default MusicPlayerModal;
