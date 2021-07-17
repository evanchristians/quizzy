export const toSentence = (string: string) => {
    return (
        string.charAt(0).toUpperCase() +
        string
            .slice(1)
            .split(/(?=[A-Z])/)
            .join(" ")
    );
};
