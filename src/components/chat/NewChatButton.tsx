import { Button, Center, Group, Input, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { api } from "app/api";
import { useState } from "react";

const NewChatButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [userId, setUserId] = useState<number | null>(null);
  const createNewChat = api.useCreateChatRoomMutation()[0];

  return (
    <>
      <Modal opened={opened} onClose={close} title="새 채팅방 만들기">
        <Center>
          <Input
            placeholder="상대 유저 ID"
            variant="filled"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserId(parseInt(e.currentTarget.value));
              console.log(userId);
            }}
          />

          <Button
            onClick={() => {
              if (userId) {
                createNewChat(userId);
              }
              close();
            }}
          >
            만들기
          </Button>
        </Center>
      </Modal>

      <Group position="center">
        <Button onClick={open}>새 채팅방 만들기</Button>
      </Group>
    </>
  );
};

export default NewChatButton;
