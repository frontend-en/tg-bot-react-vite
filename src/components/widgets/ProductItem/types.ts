export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    img: string;
}

export type ProductItemProps = {
    className?: string;
    product: {
        id: number;
        title: string;
        description: string;
        price: number;
        img: string;
       
    }
    onAdd: (product: Product) => void;
}