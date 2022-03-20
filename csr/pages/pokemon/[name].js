import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from "axios";
import { Head } from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';

const getPokemonDetail = async (params) => {
  console.log('params123', params);
  if (params) {
    const { data } = await axios.get(`/api/pokemon?name=${params?.queryKey}`);
    return data;
  }
};

export default () => {
  const router = useRouter();
  const name = router.query.name;
  const { data } = useQuery(name, getPokemonDetail);

  return (
    <div>
      <Container>
        {data && (
          <>
            <h1>{data.name.english}</h1>
            <Row>
              <Col xs={4}>
                <img
                  src={`/pokemon/${data.name.english
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  style={{
                    width: "100%",
                  }}
                />
              </Col>
              <Col xs={8}>
                {Object.entries(data.base).map(([key, value]) => (
                  <Row key={key}>
                    <Col xs={2}>{key}</Col>
                    <Col xs={10}>{value}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  )
}