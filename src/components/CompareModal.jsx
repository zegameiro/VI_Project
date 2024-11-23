import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

import SpiderChart from "./SpiderChart";

const CompareModal = ({ data, country }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [songs, setSongs] = useState();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [songObjects, setSongObjects] = useState([]);

  useEffect(() => {
    setSongs(
      data.filter((song) =>
        country != "" ? song.country == country : song.country == ""
      )
    );
  }, [data, country]);

  const handleSelectionChange = (keys) => {

    setSelectedSongs([...keys]);

    const selectedObjects = Array.from(keys).map((key) =>
      songs.find((song) => song.daily_rank === key)
    );

    setSongObjects(selectedObjects);
  };

  return (
    <div>
      <Button onPress={onOpen} color="secondary">
        Compare Songs
      </Button>
      <Modal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        hideCloseButton
        className="dark"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Compare songs from top 10 of {country != "" ?  country : "the World"}
              </ModalHeader>
              <ModalBody className="">
                <Select
                  items={songs}
                  label="Songs to compare"
                  placeholder="Select 2 songs"
                  labelPlacement="outside"
                  className="dark w-full text-white"
                  selectionMode="multiple"
                  selectedKeys={selectedSongs}
                  onSelectionChange={handleSelectionChange}
                  description="You can select more than 2 songs and it will display a spider chart for each song"
                >
                  {(song) => (
                    <SelectItem key={song.daily_rank} textValue={song.name}>
                      <div className="flex gap-2 items-center">
                        <div className="">
                          <Chip
                            color="success"
                            variant="bordered"
                            radius="full"
                          >
                            {song.daily_rank}
                          </Chip>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-small">{song.name}</span>
                          <span className="text-tiny text-default-400">
                            {song.artists}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
                <div className="grid grid-cols-3 gap-10">
                  {songObjects.length >= 2 &&
                    songObjects.map((song) => (
                      <div key={song.spotify_id} className="space-y-4">
                        <h3 className="text-white">{song.name}</h3>
                        <SpiderChart song={song} />
                      </div>
                    ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={onClose}
                  onClick={() => {setSelectedSongs([]); setSongObjects([]);}}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompareModal;
