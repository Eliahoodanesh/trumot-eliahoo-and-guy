import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from '../config/Firebase'; // Adjust the import according to your project structure
import ItemDisplay from './ItemDisplay'; // Adjust the import according to your project structure

export default function Query() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesSnapshot = await getDocs(collection(firestore, 'items'));
        const citiesData = citiesSnapshot.docs.map(doc => doc.data().city);
        const uniqueCities = [...new Set(citiesData)];
        setCities(uniqueCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = async () => {
    try {
      const itemsCollection = collection(firestore, 'items');
      let q;

      if (selectedCity && searchTerm) {
        q = query(
          itemsCollection,
          where('city', '==', selectedCity),
          where('itemName', '>=', searchTerm),
          where('itemName', '<=', searchTerm + '\uf8ff')
        );
      } else if (selectedCity) {
        q = query(itemsCollection, where('city', '==', selectedCity));
      } else if (searchTerm) {
        q = query(
          itemsCollection,
          where('itemName', '>=', searchTerm),
          where('itemName', '<=', searchTerm + '\uf8ff')
        );
      } else {
        q = itemsCollection;
      }

      const querySnapshot = await getDocs(q);
      const searchResults = querySnapshot.docs.map(doc => doc.data());
      setResults(searchResults);
      console.log('Search Results:', searchResults);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleEmailUser = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <Card className='p-4 shadow'>
            <h1 className='text-center mb-4'>חפש לפי עיר ופריט</h1>
            <Row className='text-center mb-3'>
              <Col sm={12} className='mb-3'>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">בחר עיר</option>
                    {cities.map((city, index) => (
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
                    type="text"
                    placeholder="חפש לפי פריט"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='text-center mb-3'>
              <Col sm={12}>
                <Button variant='primary' onClick={handleSearch}>
                  חפש
                </Button>
              </Col>
            </Row>
            <Row>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <Col key={index} sm={12} className='mb-2'>
                    <ItemDisplay
                      imageUrl={result.imageUrls[0]} // Assuming imageUrls is an array
                      donatingUser={result.donorName}
                      city={result.city}
                      phoneNum={result.phoneStatus === 'Your phone number' ? result.donorPhoneNumber : 'מספר לא לפרסום'}
                      itemDesc={result.itemDescription}
                      itemName={result.itemName}
                      onEmailUser={() => handleEmailUser(result.donorEmail)}
                    />
                  </Col>
                ))
              ) : (
                <p>No results found</p>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
