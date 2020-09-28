import fetch from 'isomorphic-unfetch';
import { useState , useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Car = ({car}) => {
    const [ confirm , setConfirm ] = useState(false);
    const [ isDeleting , setIsDeleting ] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(isDeleting){
            deleteCar();
        }
    }, [ isDeleting ])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteCar = async () => {
        const carId = router.query.id;

        try {
            const deleted = await fetch(`http://localhost:3000/api/cars/${carId}` , {
                method: "DELETE"
            })
            router.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="car-container">
            { isDeleting
                ? <Loader active />
                : 
                <>
                    <h1>{car.plat}</h1>
                    <p>{car.brand}</p>
                    <Button color="red" onClick={open}>Delete</Button>
                </>
            }

            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Car.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/cars/${id}`);
    const { data } = await res.json();

    return { car : data };
}

export default Car;