export class Category {
    CategoryId: number;
    CategoryName: string;
    CategoryImage: string;
    CategoryDescription: string;
    Products: any[];

    constructor(CategoryId: number, CategoryName: string, CategoryDescription: string,
        CategoryImage: string, products: any[]) {
            this.CategoryId = CategoryId;
            this.CategoryName = CategoryName;
            this.CategoryDescription = CategoryDescription;
            this.CategoryImage = CategoryImage;
            this.Products = products;
        }
}