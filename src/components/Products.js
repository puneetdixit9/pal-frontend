import React from 'react'

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://127.0.0.1:5000/pal/products');
                const data = await response.json();
                setProducts(data);
                console.log(products)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <p>OS: {product.OS}</p>
                    <p>RRP: {product.RRP}</p>
                    <p>Weight: {product.weight}</p>
                    <p>ID: {product.id}</p>
                    <p>Article Description: {product.articleDescription}</p>
                    <p>Article ID: {product.articleId}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Brick: {product.brick}</p>
                    <p>Category: {product.category}</p>
                    <p>Created At: {product.createdAt}</p>
                    <p>Family: {product.family}</p>
                    <p>Launch Date: {product.launchDate}</p>
                    <p>Missing Attribute: {product.missingAttribute}</p>
                    <p>SD: {product.sd}</p>
                    <p>Type: {product.type}</p>
                </div>
            ))}
        </div>
    )
}

export default Products