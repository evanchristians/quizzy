import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }: { title: string }) => (
    <Flex
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
    >
        <Heading fontSize="clamp(4rem, 6vw, 14rem)" lineHeight="2">
            {title}
        </Heading>
    </Flex>
);

Hero.defaultProps = {
    title: "Quiz",
};
