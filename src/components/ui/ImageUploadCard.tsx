import React, { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  FileButton,
  Group,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconX, IconPhotoPlus } from "@tabler/icons-react";
interface ImageUploadCardProps {
  visible: boolean;
  imageFile?: File;
  onImageChange: (file: File) => void;
  onImageRemove: () => void;
}
function ImageUploadCard({
  visible,
  imageFile,
  onImageChange,
  onImageRemove,
}: ImageUploadCardProps) {
  const theme = useMantineTheme();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const handleImageRemove = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 버블링을 중지합니다.
    onImageRemove();
  };

  if (!visible) {
    return null;
  }
  return (
    <FileButton
      accept="image/png,image/jpeg"
      onChange={(file) => file && onImageChange(file)}
    >
      {(props) => (
        <Card
          shadow="sm"
          p={0}
          {...props}
          style={{ cursor: "pointer", position: "relative" }}
        >
          {imageFile && (
            <ActionIcon
              size={30}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: theme.colors.gray[6],
                color: theme.white,
                zIndex: 2,
              }}
              onClick={handleImageRemove}
            >
              <IconX size={16} />
            </ActionIcon>
          )}
          <Group w={160} h={160} position="center" spacing="md">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                height={160}
                width={160}
                fit="cover"
              />
            ) : (
              <IconPhotoPlus size={30} color="gray" />
            )}
          </Group>
        </Card>
      )}
    </FileButton>
  );
}

export default ImageUploadCard;
