import { Box, Text, Heading } from "@chakra-ui/react";

const Index = () => {
  const plagiarismReport = {
    categorizedText: [],
  };

  return (
    <Box>
      <Text fontWeight="bold">Categorized Text:</Text>
      <Box borderWidth={1} borderRadius="md" padding={4}>
        {plagiarismReport.categorizedText.map((section, index) => (
          <Box key={index} marginBottom={4}>
            <Heading as="h3" size="md" marginBottom={2}>
              {section.heading}
            </Heading>
            {section.content.map((paragraph, pIndex) => (
              <Text key={pIndex} marginBottom={2}>
                {paragraph.join(" ")}
              </Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
