export interface Product {
    title:string,
    category:CategoryProd,
    imageCover:string,
    ratingsAverage:number,
    price:number,
    _id?:string,
}

export interface CategoryProd{
    name:string;
}
