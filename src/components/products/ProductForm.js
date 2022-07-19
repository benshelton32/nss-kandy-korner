import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProductTypeDropDown = () => {
    const [productTypes, setProductTypes] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/productTypes")
                .then(response => response.json())
                .then((productTypeArray) => {
                    setProductTypes(productTypeArray)
                })
        },
        []
    )

    return <>
        <option value="">Select product type...</option>
        {
            productTypes.map(productType => {
                return <>
                    <option value={productType.id}>{productType.name}</option>
                </>
            })
        }
    </>
}

export const ProductForm = () => {
    const [product, update] = useState({
        name: "",
        price: "",
        productTypeId: ""

    })

    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const productToSendToAPI = {
            name: product.name,
            price: parseInt(product.price),
            productTypeId: parseInt(product.productTypeId)
        }

        // TODO: Perform the fetch() to POST the object to the API

        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
        }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter product's name.."
                        value={product.name}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input 
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter product's price.."
                        value={product.price}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.price = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type: </label>
                    <select
                        value={product.productTypeId}
                        required
                        className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.productTypeId = event.target.value
                                update(copy)
                            }
                        }>
                            <ProductTypeDropDown />
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}