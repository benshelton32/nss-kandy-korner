import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>

				<Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList />} />
				<Route path="product/create" element={ <ProductForm /> } />

			</Route>
		</Routes>
	</>
}

