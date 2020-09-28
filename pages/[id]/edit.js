import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditCar = ({ car }) => {
    const [ form , setFrom  ] = useState({
        plat: car.plat,
        brand: car.brand
    })
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ errors , setErrors ] = useState({});
    const router = useRouter();

    useEffect(() => {
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                updateCar();
                // alert('Success');
            }else{
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const updateCar = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/cars/${router.query.id}` , {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setFrom({
            ...form,
            [e.target.name] : e.target.value
        })
    };

    const validate = () => {
        let err = {};

        if(!form.plat){
            err.plat = "Plat is required";
        }

        if(!form.brand){
            err.brand = "Brand is required";
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Update Car</h1>
            <div>
                {
                    isSubmitting 
                        ? <Loader active inline="centered"/>
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.plat ? { content : "Please enter a Plat" , pointing : "below" } : null }
                                label="Plat"
                                placeholder="Plat"
                                name="plat"
                                value={form.plat}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.brand ? { content : "Please enter a Brand" , pointing : "below" } : null }
                                label="Brand"
                                placeholder="Brand"
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                            />
                            <Button type="submit">Update</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditCar.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/cars/${id}`);
    const { data } = await res.json();

    return { car : data };
}

export default EditCar;