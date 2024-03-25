import React, { useState } from "react";
import { Box, Button, Heading, Text, Textarea, VStack, HStack, useToast, Progress, Divider } from "@chakra-ui/react";
import { FaFileUpload, FaCheck, FaTimes } from "react-icons/fa";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [plagiarismReport, setPlagiarismReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setInputText(e.target.result);
    };
    reader.readAsText(file);
  };

  const handlePasteText = (event) => {
    setInputText(event.target.value);
  };

  const handleGenerateReport = () => {
    if (inputText.trim() === "") {
      toast({
        title: "Error",
        description: "Please provide some text to generate the report.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    // Simulating API call to generate plagiarism report
    setTimeout(() => {
      const plagiarismPercentage = Math.floor(Math.random() * 50) + 10;
      const aiContentPercentage = Math.floor(Math.random() * 30) + 5;
      const rephrasedText = `This is the rephrased version of the plagiarized text. Original text: "${inputText}"`;

      setPlagiarismReport({
        plagiarismPercentage,
        aiContentPercentage,
        rephrasedText,
      });

      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        Plagiarism Detector
      </Heading>

      <VStack spacing={6} alignItems="stretch">
        <Box>
          <Heading as="h2" size="lg" marginBottom={4}>
            Upload File or Paste Text
          </Heading>
          <HStack>
            <Button leftIcon={<FaFileUpload />}>
              <input type="file" accept=".txt,.doc,.docx,.pdf" onChange={handleFileUpload} style={{ display: "none" }} />
              Upload File
            </Button>
            <Text>or</Text>
            <Textarea placeholder="Paste your text here..." rows={8} value={inputText} onChange={handlePasteText} />
          </HStack>
        </Box>

        <Button colorScheme="blue" size="lg" onClick={handleGenerateReport} isLoading={isLoading} loadingText="Generating Report">
          Generate Report
        </Button>

        {plagiarismReport && (
          <Box>
            <Heading as="h2" size="lg" marginBottom={4}>
              Plagiarism Report
            </Heading>
            <VStack alignItems="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold">Plagiarism Percentage:</Text>
                <Progress value={plagiarismReport.plagiarismPercentage} colorScheme={plagiarismReport.plagiarismPercentage > 30 ? "red" : "green"} />
                <Text>{plagiarismReport.plagiarismPercentage}% of the content is plagiarized.</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">AI-Generated Content:</Text>
                <Progress value={plagiarismReport.aiContentPercentage} colorScheme={plagiarismReport.aiContentPercentage > 20 ? "red" : "green"} />
                <Text>{plagiarismReport.aiContentPercentage}% of the content is AI-generated.</Text>
              </Box>
              <Divider />
              <Box>
                <Text fontWeight="bold">Rephrased Text:</Text>
                <Text>{plagiarismReport.rephrasedText}</Text>
              </Box>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
