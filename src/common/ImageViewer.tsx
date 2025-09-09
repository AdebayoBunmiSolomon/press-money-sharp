import { View } from "react-native";
import ImageView from "react-native-image-viewing";

interface IImageViewerProps {
  images: {
    uri: string;
  }[];
  visible: boolean;
  closeImageViewer: () => void;
}

export const ImageViewer: React.FC<IImageViewerProps> = ({
  images,
  visible,
  closeImageViewer,
}) => {
  return (
    <View>
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={closeImageViewer}
      />
    </View>
  );
};
