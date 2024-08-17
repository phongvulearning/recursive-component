import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Folder = {
  name: string;
  folders?: Folder[];
};

const folder: Folder[] = [
  {
    name: "Test 1",
    folders: [
      {
        name: "Test 1/Test 2",
        folders: [
          { name: "Test 3" },
          { name: "Test 4" },
          {
            name: "Test 5",
            folders: [{ name: "Test 6", folders: [{ name: "Test 7" }] }],
          },
          { name: "Test 8", folders: [{ name: "Test 7" }] },
        ],
      },
      {
        name: "Folder 8",
        folders: [{ name: "Folder 9" }, { name: "Folder 10" }],
      },
    ],
  },
  {
    name: "Folder11",
    folders: [
      {
        name: "Folder12",
        folders: [{ name: "Folder13" }, { name: "Folder14" }],
      },
      {
        name: "Folder15",
        folders: [{ name: "Folder6" }, { name: "Folder7" }],
      },
    ],
  },
  { name: "Document 1" },
];

export const Folder = () => {
  return (
    <ul>
      {folder.map((folder, index) => (
        <FileSystemItem folder={folder} key={index} />
      ))}
    </ul>
  );
};

function FileSystemItem({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <span className="flex items-center gap-1.5 py-1">
        {folder.folders && folder.folders.length > 0 && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              className="flex"
              transition={{ duration: 0.4, bounce: 0, type: "spring" }}
            >
              <ChevronRightIcon className="size-4 text-gray-500" />{" "}
            </motion.span>
          </button>
        )}

        {folder.folders ? (
          <FolderIcon
            className={`size-6 text-sky-500 ${
              folder.folders.length === 0 ? "ml-[22px]" : ""
            }`}
          />
        ) : (
          <DocumentIcon className="ml-[22px] size-6 text-gray-500" />
        )}
        {folder.name}
      </span>
      <AnimatePresence>
        {isOpen && folder.folders && (
          <motion.ul
            className="pl-6 overflow-hidden flex flex-col justify-end"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.4,
              type: "spring",
              bounce: 0,
              ease: "easeInOut",
            }}
          >
            {folder.folders.map((folder, index) => (
              <FileSystemItem folder={folder} key={index} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
