import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import { Button, Container, Row, Col, Card, Form, Carousel } from 'react-bootstrap'; // Import Bootstrap components
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore methods
import { firestore } from '../config/Firebase'; // Import Firestore configuration
import ItemDisplay from './ItemDisplay'; // Import custom ItemDisplay component

export default function Query() {
  const [cities, setCities] = useState([]); // State to store the list of cities
  const [selectedCity, setSelectedCity] = useState(''); // State for the selected city
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [results, setResults] = useState([]); // State to store search results

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesSnapshot = await getDocs(collection(firestore, 'items')); // Fetch all items from Firestore
        const citiesData = citiesSnapshot.docs.map(doc => doc.data().city); // Extract city data from items
        const uniqueCities = [...new Set(citiesData)]; // Get unique cities
        setCities(uniqueCities); // Update state with unique cities
      } catch (error) {
        console.error('Error fetching cities:', error); // Log any errors
      }
    };

    fetchCities(); // Call the function to fetch cities on component mount
  }, []);

  const handleSearch = async () => {
    try {
      const itemsCollection = collection(firestore, 'items'); // Reference to items collection
      let q; // Query variable

      // Build the Firestore query based on selected city and search term
      if (selectedCity && searchTerm) {
        q = query(
          itemsCollection,
          where('city', '==', selectedCity), // Filter by selected city
          where('itemName', '>=', searchTerm), // Filter by search term
          where('itemName', '<=', searchTerm + '\uf8ff') // Include all items matching the search term
        );
      } else if (selectedCity) {
        q = query(itemsCollection, where('city', '==', selectedCity)); // Filter by selected city only
      } else if (searchTerm) {
        q = query(
          itemsCollection,
          where('itemName', '>=', searchTerm), // Filter by search term only
          where('itemName', '<=', searchTerm + '\uf8ff')
        );
      } else {
        q = itemsCollection; // No filters applied
      }

      const querySnapshot = await getDocs(q); // Execute the query
      const searchResults = querySnapshot.docs.map(doc => doc.data()); // Map results to data
      setResults(searchResults); // Update state with search results
      console.log('Search Results:', searchResults); // Log search results
    } catch (error) {
      console.error('Error searching items:', error); // Log any errors during search
    }
  };

  const handleEmailUser = (email) => {
    window.location.href = `mailto:${email}`; // Redirect to email client with pre-filled email
  };

  return (
    <div className='container-fluid'>
      <Container className='mt-5'>
        <Row className='justify-content-center'>
          <Col xs={12} md={8} lg={6}>
            <Card className='p-4 shadow'>
              <h1 className='text-center mb-4'>חפש לפי עיר ופריט</h1> {/* Search header */}
              <Row className='text-center mb-3'>
                <Col sm={12} className='mb-3'>
                  <Form.Group>
                    <Form.Control
                      as="select" // Dropdown for selecting a city
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)} // Update state on city selection
                    >
                      <option value="">בחר עיר</option> {/* Default option */}
                      {cities.map((city, index) => ( // Map through cities to create options
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group>
                    <Form.Control
                      type="text" // Input field for searching by item
                      placeholder="חפש לפי פריט"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='text-center mb-3'>
                <Col sm={12}>
                  <Button variant='primary' onClick={handleSearch}> {/* Search button */}
                    חפש
                  </Button>
                </Col>
              </Row>
              <Row>
                {results.length > 0 ? ( // Check if there are results
                  results.map((result, index) => ( // Map through results to display each item
                    <Col key={index} sm={12} className='mb-2'>
                      <Card className="mb-3">
                        <Card.Body>
                          <Row>
                            <Col sm={6}>
                              <ItemDisplay
                                donatingUser={result.donorName} // Display donor name
                                city={result.city} // Display city
                                phoneNum={result.phoneStatus === 'Your phone number' ? result.donorPhoneNumber : 'מספר לא לפרסום'} // Display phone number or not
                                itemDesc={result.itemDescription} // Display item description
                                itemNote={result.itemNote} // Display item note
                                itemName={result.itemName} // Display item name
                                onEmailUser={() => handleEmailUser(result.donorEmail)} // Email user function
                              />
                            </Col>
                            <Col sm={6}>
                              {result.imageUrls && result.imageUrls.length > 0 && ( // Check if images exist
                                <Carousel className="mt-3"> // Carousel for displaying images
                                  {result.imageUrls.map((image, idx) => (
                                    <Carousel.Item key={idx}>
                                      <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`Slide ${idx}`} // Image alt text
                                      />
                                    </Carousel.Item>
                                  ))}
                                </Carousel>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>No results found</p> // Message if no results are found
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
