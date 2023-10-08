import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit{

  constructor(private _ProductService:ProductService){};

  brandsData:any[] = [];

  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next:(response)=>{
        this.brandsData = response.data;
      }
    })
    
  }

}
