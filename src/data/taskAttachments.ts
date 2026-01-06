import { ImageSourcePropType } from "react-native";

export type TaskAttachmentItem = {
  key: string;
  source: ImageSourcePropType;
};

export const ATTACHMENT_LIBRARY: TaskAttachmentItem[] = [
  {
    key: "task-attachment-1",
    source: require("../../assets/images/today-task.png"),
  },
  {
    key: "task-attachment-2",
    source: require("../../assets/images/today-task-card.png"),
  },
  {
    key: "task-attachment-3",
    source: require("../../assets/images/working-period.png"),
  },
];

const attachmentMap = ATTACHMENT_LIBRARY.reduce<Record<string, ImageSourcePropType>>(
  (acc, item) => {
    acc[item.key] = item.source;
    return acc;
  },
  {}
);

export const getAttachmentSource = (key: string) => attachmentMap[key];
