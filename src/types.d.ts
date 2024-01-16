interface ModalC {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

interface DropdownC {
  children: React.ReactNode;
}

interface DropdownCTX {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface DropdownItemC {
  children: React.ReactNode;
  onClick?: () => void;
}
interface DropdownMenuC {
  children: React.ReactNode;
}

interface DropdownTriggerC {
  children: React.ReactNode;
}

type DropdownV = React.FC<DropdownC> & {
  Item: React.FC<DropdownItemC>;
  Trigger: React.FC<DropdownTriggerC>;
  Menu: React.FC<DropdownMenuC>;
};

interface TimeStamp {
  createdAt: string;
  updatedAt: string;
}

interface Story  {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  category: string;
  cover: string;
  tags: string;
  StoryChapters: Array<StoryChapter & TimeStamp>;
  status: string;
}

interface StoryChapter {
  id: string;
  title: string;
  story: string;
}
