import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPricedProductsFilter, setTopPricedFilter] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch("http://localhost:8088/products?_expand=productType&_sort=name&_order=asc")
            .then(response => response.json())
            .then((productArray) => {
                setProducts(productArray)
            })
        },
        []
    )

    useEffect(
        () => {
            setFilteredProducts(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (topPricedProductsFilter) {
                const topPricedProducts = products.filter(product => {
                    return product.price > 2
                })
                setFilteredProducts(topPricedProducts)
            } else {
                setFilteredProducts(products)
            }
        },
        [topPricedProductsFilter]
    )

    return <>
        <h2>Products</h2>

        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => {setTopPricedFilter(true)}}>Top Priced</button>
                    <button onClick={() => {setTopPricedFilter(false)}}>Show All</button>
                    <button onClick={() => navigate("/product/create")}>Create Product</button>
                </>
                :
                ""
        }

        <article className="products">
            {
                filteredProducts.map(filteredProduct => {
                    return <>
                        <section className="product">
                            <header className="productName">{filteredProduct.name}</header>
                            <footer className="productAttributes">
                                <div className="productPrice">Price: ${filteredProduct.price.toFixed(2)}</div>
                                <div className="productType">Product Type: {filteredProduct.productType.name}</div>
                            </footer>
                        </section>
                    </>
                })
            }
        </article>
    </>
}