import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule, RouterLink , SearchPipe , FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private _ProductService:ProductService,
     private _CartService:CartService,
     private _ToastrService:ToastrService,
     private _Renderer2:Renderer2,
     private _WishlistService:WishlistService
     ){}

  products:Product[] = [];
  categories:Category[] = [];
  wishListData:string[] = [];
  term:string = '';

  ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
     next:(response)=>{
      this.products = response.data;
     }
    });

    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data;
      }
    });

    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        const newData = response.data.map( (item:any)=> item._id );
        this.wishListData = newData;
      },
    })
  }

  addProduct(id:any , element:HTMLButtonElement):void{

    this._Renderer2.setAttribute(element , 'disabled' , 'true')

    this._CartService.addToCart(id).subscribe({
      next:(response)=>{    
        
         this._ToastrService.success(response.message);
         this._Renderer2.removeAttribute(element , 'disabled'); 

         this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element , 'disabled');
      }
    })

  }

  addFav(prodId:string|undefined):void{
    this._WishlistService.addToWishList(prodId).subscribe({
      next:(response)=>{
        console.log(response.data.length);
        
        this._ToastrService.success(response.message);
        this.wishListData = response.data;

        this._WishlistService.prodNumber.next(response.data.length);
      }
    })

  }

  removeFav(prodId:string|undefined):void{
    this._WishlistService.removeWishListItem(prodId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.prodNumber.next(response.data.length);
      },
    })
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:7000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: false
  }



}
