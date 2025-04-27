export interface Product {
    id: any,
    proname: any,
    protitle: any,
    proprice: any,
    prodesc: any,
    proCategory: any,
    proinfo: any,
    proimgurl: any,
    quantity:any
}

export interface CartItem extends Product {
    quantity: number;
}
export interface LikeItem extends Product {
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
    likeItems:LikeItem[];
}
