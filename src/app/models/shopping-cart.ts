export class ShoppingCart {
    shoppingCartId: number;
    cartStatus: boolean;
    user: string;
    Products: any[];

    constructor(shoppingCartId?: number, cartStatus?: boolean, user?: string) {
            this.shoppingCartId = shoppingCartId;
            this.cartStatus = cartStatus;
            this.user = user;
            this.Products = [];
    }
}