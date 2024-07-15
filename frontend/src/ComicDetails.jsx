import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Image, Text, VStack, Heading, Center } from "@chakra-ui/react";

const ComicDetails = () => {
  const [comic, setComic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/comics/${id}`)
      .then(response => setComic(response.data))
      .catch(error => console.error('Error fetching comic details:', error));
  }, [id]);

  if (!comic) {
    return <Box>Loading...</Box>;
  }

  return (
    <Center p={4}>
      <VStack spacing={4} align="center" w="full" maxW="2xl">
        <Heading as="h1" size="2xl" textAlign="center">{comic.name}</Heading>
        <Text fontWeight="bold">Número: {comic.issue_number}</Text>
        {comic.image && (
          <Image
            src={comic.image.medium_url}
            alt={comic.name}
            objectFit="cover"
            maxW="100%"
            h="auto"
          />
        )}
        <Text fontSize="lg" textAlign = 'center' dangerouslySetInnerHTML={{ __html: comic.description || 'No hay descripción disponible.' }} />
        <Text fontSize="sm" textAlign = 'center' color="gray.500">Fecha de publicación: {new Date(comic.date_added).toLocaleDateString()}</Text>
      </VStack>
    </Center>
  );
};

export default ComicDetails;
