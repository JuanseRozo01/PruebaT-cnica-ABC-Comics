import './Reset.css'
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Text, Image, VStack, Heading, Button, Flex, useBreakpointValue, useColorModeValue,Link } from "@chakra-ui/react";
import axios from 'axios';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [isGridView, setIsGridView] = useState(true);
  
    useEffect(() => {
      axios.get('/api/comics')
        .then(response => setComics(response.data))
        .catch(error => console.log(error));
    }, []);
  
    const toggleView = () => {
      setIsGridView(!isGridView);
    };
  
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const cardBg = useColorModeValue('white', 'gray.700');
  
    return (
      <Box p={4}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "start", md: "center" }} mb={4}>
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} mb={{ base: 4, md: 0 }}>Lista de Cómics</Heading>
          <Button onClick={toggleView} mb={{ base: 4, md: 0 }}>
            {isGridView ? 'Ver como Lista' : 'Ver como Grid'}
          </Button>
        </Flex>
  
        {isGridView ? (
          <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
            {comics.map(comic => (
              <Box key={comic.id} borderWidth="1px"
               borderRadius="lg" 
               overflow="hidden" 
               boxShadow="lg" 
               _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)', transition: 'all 0.2s' }} bg={cardBg}>

                <VStack spacing={3} align="center" p={4}>
                  <Text fontWeight="bold">Numero: {comic.issue_number}</Text>
                  <Heading as="h2" size="md" textAlign="center">{comic.name}</Heading>
                  
                  {comic.image && (
                    <Image 
                      src={comic.image.medium_url} 
                      alt={comic.name} 
                      objectFit="cover"
                      maxW="100%"
                      h="auto"
                    />
                  )}
                  <Box>
                    {comic.description ? (
                      <Text textAlign="center" noOfLines={3} dangerouslySetInnerHTML={{ __html: comic.description }} />
                    ) : (
                      <Text textAlign="center">No hay descripción disponible.</Text>
                    )}
                  </Box>
                  <Text fontSize="sm" color="gray.500">{new Date(comic.date_added).toLocaleDateString()}</Text>
                  <Button color='blueSkye'>
                  <Link as={RouterLink} to={`/comic/${comic.id}`} color="blue.500">
                    Ver detalles
                    </Link>
                    </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        ) : (
          <VStack spacing={4} align="stretch">
            {comics.map(comic => (
              <Box key={comic.id} borderWidth="1px" borderRadius="lg" 
              overflow="hidden" 
              boxShadow="lg" 
              _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)', transition: 'all 0.2s' }} bg={cardBg}>
                <Flex direction={{ base: "column", sm: "row" }} p={4}>
                  {comic.image && (
                    <Image 
                      src={comic.image.medium_url} 
                      alt={comic.name} 
                      objectFit="cover"
                      boxSize={{ base: "100%", sm: "100px" }}
                      mb={{ base: 4, sm: 0 }}
                      mr={{ base: 0, sm: 4 }}
                    />
                  )}
                  <VStack align="start" flex={1}>
                    <Heading as="h2" size="md">{comic.name}</Heading>
                    <Text fontWeight="bold">Número: {comic.issue_number}</Text>
                    <Text noOfLines={2}>
                      {comic.description ? (
                        <span dangerouslySetInnerHTML={{ __html: comic.description }} />
                      ) : (
                        'No hay descripción disponible.'
                      )}
                    </Text>
                    <Text fontSize="sm" color="gray.500">{new Date(comic.date_added).toLocaleDateString()}</Text>

                    <Button>
                    <Link as={RouterLink} to={`/comic/${comic.id}`} color="blue.500">
                    Ver detalles
                    </Link>
                    </Button>
                  </VStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    );
  };
  
  export default ComicsList;