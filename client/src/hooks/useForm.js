// write your custom hook here to control your checkout form
import { useState } from 'react';


const useForm = (initialValues) => {

    const [values, setValues] = useState(initialValues);

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    //   const clearForm = () => {
    //       setTimeout(() => {
    //     setValues(initialValues);
    // }, 1000)
    //   };

    return([values, handleChanges]);
}


export default useForm;