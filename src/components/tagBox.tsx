import {
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

export const TagBox = ({ tags }: { tags: { tag: string }[] }) => {
  return (
    <Wrap>
      {tags.map(({ tag }, idx) => {
        return (
          <WrapItem key={idx}>
            <Tag
              size="md"
              borderRadius="full"
              variant="solid"
              colorScheme="orange"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton />
            </Tag>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
