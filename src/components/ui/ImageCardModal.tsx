import React, { useState } from "react";
import { Card, Image, Modal, Group, Container } from "@mantine/core";

function ImageCardModal({ images }: { images: string[] }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Container>
      <Group spacing="sm">
        {images.map((image, index) => (
          <Card
            w={160}
            h={160}
            key={index}
            radius="md"
            onClick={() => {
              setSelectedImage(image);
              setModalOpened(true);
            }}
          >
            <Card.Section>
              <Image src={image} alt={`Image ${index + 1}`} fit="cover" />
            </Card.Section>
          </Card>
        ))}
      </Group>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="lg"
      >
        <Image src={selectedImage} alt="Selected Image" />
      </Modal>
    </Container>
  );
}

export default ImageCardModal;
