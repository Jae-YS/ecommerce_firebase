import { useQuery } from "@tanstack/react-query";

const fetchProductBySlug = async (slug: string) => {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
};

export const useFetchProductBySlug = (slug: string) => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => fetchProductBySlug(slug),
        staleTime: 5 * 60 * 1000,
        enabled: !!slug,
    });
}