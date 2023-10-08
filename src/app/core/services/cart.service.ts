import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _ttpClient:HttpClient) { }

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`;

  

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(prodId:string):Observable<any>{
    return this._ttpClient.post(this.baseUrl + `cart` , 
    {
      productId: prodId
    },
    
    )
  }

  getCartUser():Observable<any>{
    return this._ttpClient.get(this.baseUrl + 'cart' ,  
    )
  }

  removeCartItem(prodId:string):Observable<any>{
    return this._ttpClient.delete(this.baseUrl + `cart/${prodId}` ,
    )
  }

  updateCartCount(prodId:string , countNum:number):Observable<any>{
    return this._ttpClient.put(this.baseUrl + `cart/${prodId}` , 
    {
      count: countNum
    },
    )

  }

  clearCart():Observable<any>{
    return this._ttpClient.delete(this.baseUrl + `cart` ,
    
    )
  }

  checkOut(cartId:string | null, orderInfo:object):Observable<any>{
    return this._ttpClient.post(this.baseUrl +
       `orders/checkout-session/${cartId}?url=http://localhost:4200` ,
       {
        shippingAddress:orderInfo        
       },
       )
  }



  
}