import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ cars }) => {
  return (
    <div className="cars-container">
      <h1>cars</h1>
      <div className="grid wrapper">
        {cars.map(car => {
          return (
            <div key={car._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${car._id}`}>
                      <a>{car.plat}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${car._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${car._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/cars');
  const { data } = await res.json();

  return { cars: data }
}

export default Index;
