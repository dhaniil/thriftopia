interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    product: {
        id: number;
        name: string;
        price: number;
        description: string;
        image: string;
    };
}

export type { CartItem };
