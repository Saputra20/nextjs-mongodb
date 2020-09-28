import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewCar = () => {
    const [ form , setFrom  ] = useState({
        plat: '',
        brand: ''
    })
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ errors , setErrors ] = useState({});
    const router = useRouter();

    useEffect(() => {
        if(isSubmitting){
            if(Object.keys(errors).length === 0){
                createCar();
                // alert('Success');
            }else{
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createCar = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/cars' , {
                method: 'POST',
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
            <h1>Create Car</h1>
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
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.brand ? { content : "Please enter a Brand" , pointing : "below" } : null }
                                label="Brand"
                                placeholder="Brand"
                                name="brand"
                                onChange={handleChange}
                            />
                            <Button type="submit">Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewCar;