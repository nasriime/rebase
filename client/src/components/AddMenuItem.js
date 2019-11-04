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
            <h4 className="mb-4">Add menu item</h4>
            
            <form onSubmit={handleSubmit(onSubmit)} encType={'multipart/form-data'}>
                <div className="form-group row">
                  <label HtmlFor="type" className="col-sm-2 col-form-label">Type</label>
                  <div className="col-sm-6"> 
                    <select  name="type" id="type" class="custom-select" ref={register({ required: true })}>
                      <option selected>Choose...</option>
                      <option value="Main">Main</option>
                      <option value="Side">Side</option>
                    </select>
                    {errors.type &&
                      errors.type.type === "required" &&
                      <div className="text-danger">This field is required</div>}
                  </div>
                </div>
                

                <div className="form-group row">
                    <label HtmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control"  name="name" 
                          ref={register({ required: true, maxLength: 50 })} id="name" placeholder="" />
                      {errors.name &&
                        errors.name.type === "required" &&
                        <div className="text-danger">This field is required</div>}
                      {errors.name &&
                        errors.name.type === "maxLength" &&
                        <div className="text-danger">Your input exceed 50 charcter length</div>}  
                    </div>
                </div>
              


                <div className="form-group row">
                    <label HtmlFor="price" className="col-sm-2 col-form-label">Price</label>
                    <div className="col-sm-6">
                      <input type="number" className="form-control"  name="price" 
                          ref={register({ required: true ,pattern: /\d+/ })} id="price" placeholder="" />
                    {errors.price &&
                      errors.price.type === "required" &&
                      <div className="text-danger mt-1">This field is required</div>}
                    {errors.price &&
                      errors.price.type === "pattern" &&
                      <div className="text-danger mt-1">Enter numbers only</div>}
                    </div>
                </div>
              

                <div className="form-group row">
                  <label HtmlFor="document" className="col-sm-2 col-form-label">Photo</label>
                  <div className="col-sm-6">
                    <label className="btn btn-primary">
                      Choose photo<input type="file" className="form-control"  name="document"
                        onChange={
                          ({target: { files }}) => {
                              const file = files[0]
                              file && singleUploadStream({ variables: { file: file } })
                          }
                        }
                        ref={register({ required: true })} id="document" hidden/>
                    </label>
                    {errors.document &&
                      errors.document.type === "required" &&
                      <div className="text-danger mt-1">This field is required</div>}
                      {loading && <p>Loading.....</p>}
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={loading}>Save item</button>
            </form>
                
       
        </div>
    )
})

export default AddMenuItem;