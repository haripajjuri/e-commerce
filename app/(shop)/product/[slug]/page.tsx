import { notFound } from "next/navigation"

type props = {
    params : {slug:string}
}

export default async function Product({params} : props){
    const {slug} = (await params)
    
    const res = await fetch(`http://localhost:3000/api/products/slug/${slug}`)

    if(res.status === 404){
        notFound()
    }
    if(!res.ok){
        throw new Error('server error');
    }

    const {product} = await res.json()
    
    return(
        <div className="flex flex-col">

            {/* ===== HERO SECTION: Image + Details (fills viewport below header) ===== */}
            <section className="min-h-[calc(100svh-3rem)] flex flex-col md:flex-row">

                {/* Left: Image Area */}
                <div className="w-full md:w-2/5 bg-gray-100 flex items-center justify-center p-8 md:p-12">
                    <div className="w-full max-w-md aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center text-gray-400 text-sm">
                        Image Placeholder
                    </div>
                </div>

                {/* Right: Product Details */}
                <div className="w-full md:w-3/5 flex flex-col justify-center px-6 py-10 md:px-16 md:py-12">
                    <div className="max-w-lg">

                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-6">
                            <span>{product.section}</span>
                            <span>/</span>
                            <span>{product.category}</span>
                        </nav>

                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-semibold text-gray-900">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-500 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Stock Status */}
                        <div className="mb-8">
                            {product.quantity > 0 ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    In Stock ({product.quantity} available)
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-8">
                            <button 
                                className="flex-1 bg-gray-900 text-white font-medium py-3.5 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={product.quantity === 0}
                            >
                                Add to Cart
                            </button>
                            <button className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors duration-150 text-lg">
                                ♡
                            </button>
                        </div>

                        {/* Info Badges */}
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                <span>🚚</span>
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                <span>↩️</span>
                                <span>Easy Returns</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                <span>🔒</span>
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                                <span>✅</span>
                                <span>Quality Assured</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ===== SIMILAR PRODUCTS SECTION ===== */}
            <section className="px-6 md:px-16 py-16 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
                <div className="text-gray-400 text-sm">
                    Similar products will go here
                </div>
            </section>

            {/* ===== REVIEWS SECTION ===== */}
            <section className="px-6 md:px-16 py-16 border-t border-gray-100 bg-gray-50/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
                <div className="text-gray-400 text-sm">
                    Reviews will go here
                </div>
            </section>

        </div>
    )
}
