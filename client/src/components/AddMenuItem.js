import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from 'react-apollo-hooks';
import gql from "graphql-tag";
import useForm from 'react-hook-form';

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($name: String!, $type: String!, $price: Int!, $photo: String!){
    addItem(name: $name, type: $type, price: $price, photo: $photo){
      id
      name
      type
      price
      photo
    }
  }
`;

const AddMenuItem =withRouter(({history})=>{
    const [photo, setPhoto] = useState();

    const [singleUploadStream, { loading }] = useMutation(UPLOAD_FILE_STREAM,{
        update: (proxy, mutationResult) => {
            const fileName = mutationResult.data.singleUploadStream.filename;
            setPhoto(`https://cafe-react-test.s3.eu-west-2.amazonaws.com/${fileName}`)
        }
    });
    const [addItem] = useMutation(ADD_ITEM,{
      update: ()=>{
        history.push('/');
      }  
    });
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => { 
        console.log(data)
        addItem({ 
            variables: { 
                name: data.name,
                type: data.type,
                price: Number(data.price),
                photo
            } 
        })
    }

    return (
        <div className="container">
            <h2>Add menu item</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} encType={'multipart/form-data'}>
                <select  name="type" ref={register({ required: true })}>
                    <option value="Main">Main</option>
                    <option value="Side">Side</option>
                </select>
                {errors.type &&
                    errors.type.type === "required" &&
                    <div>This field is required</div>}


                <input 
                    type="text" 
                    name="name" 
                    ref={register({ required: true, maxLength: 50 })}
                    placeholder="" />
                {errors.name &&
                errors.name.type === "required" &&
                <div>This field is required</div>}
                {errors.name &&
                errors.name.type === "maxLength" &&
                <div>Your input exceed 50 charcter length</div>}     


                <input 
                    type="number" 
                    name="price" 
                    ref={register({ required: true ,pattern: /\d+/ })}
                    placeholder="" />
                {errors.price &&
                errors.price.type === "required" &&
                <div>This field is required</div>}
                {errors.price &&
                errors.price.type === "pattern" &&
                <div>Enter numbers only</div>}


                <input name={'document'} type={'file'} 
                    ref={register({ required: true })}
                    onChange={
                    ({target: { files }}) => {
                        const file = files[0]
                        file && singleUploadStream({ variables: { file: file } })
                    }
                    }/>
                {loading && <p>Loading.....</p>}
                {errors.document &&
                errors.document.type === "required" &&
                <div>This field is required</div>}

                <button type="submit" disabled={loading}>Save item</button>
            </form>
                
       
        </div>
    )
})

export default AddMenuItem;