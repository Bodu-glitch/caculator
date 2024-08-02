import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
export interface Item {
  id :number;
  name: String;
  quantity: number;
  price: number;
  inStock :number;
  img :string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = "hello"
  // stuff = ["đi chợ", "Mua đồ ăn", "Học Bài","Đi ngủ"];
  // completedStuff: string[] = [];

  // newStuff ="";
  // deletedStuff =""
  // addtodolist (){
  //   this.stuff.push(this.newStuff);
  // }

  // deletetodolist (item :number = 0){
  //   this.stuff.splice(item,1);
  // }

  // completetodolist (item :string = "",index :number = 0){
  //   this.deletetodolist (index);
  //   this.completedStuff.push(item);
  // }


  obj1 = { id: 1, name: 'món đồ 1', quantity: 0, price: 100000 ,inStock:10, img: '../assets/1.1.png' } as Item;
  obj2 = { id: 2, name: 'món đồ 2', quantity: 0, price: 200000 ,inStock:10,img: '../assets/1.1.png' } as Item;
  obj3 = { id: 3, name: 'món đồ 3', quantity: 0, price: 300000 ,inStock:10,img: '../assets/1.1.png' } as Item;


  total :number = 0;
  products: Item[] = [this.obj1, this.obj2, this.obj3]
  cart: Item[] = []



  addToCart(index: number) {
    let findIndex = this.cart.findIndex((element) => {
      return element.id == this.products[index].id;
    }); // Đi tìm trong giỏ hàng có tồn tại sp mà mình muốn thêm hay không
    if (findIndex != -1) {// Nếu tồn tại (index != -1)
      this.cart[findIndex].quantity += 1;
      if(this.products[index].inStock <= 0){
        return;
      }else{
        this.products[index].inStock--;
      } // Tăng số lượng lên 1
    } else {// Nếu không tồn tại
      this.cart.push({// Thêm sp mới đó vào
        id: this.products[index].id,
        name: this.products[index].name,
        price: this.products[index].price,
        inStock : this.products[index].price,
        quantity: 1,
        img: '../assets/1.1',
      });
      this.products[index].inStock--;
    }
    console.log(this.cart);
    this.totalcost();
  }

  deletefromCart (index:number){
    let findIndex:any = this.products.find((element) => {
      return element.id == this.cart[index].id;
    }); 
    
    if (this.cart[index].quantity > 0){
      this.cart[index].quantity--;
      findIndex.inStock ++;
    }

    if(this.cart[index].quantity == 0){
      this.cart.splice(index,1);
    }
  }

  totalcost (){
    this.total = 0;

    for (let i = 0; i<this.cart.length;i++){
      this.total = this.total + this.cart[i].price * this.cart[i].quantity;
    }
    
    // this.cart.splice(0,this.cart.length)
  }
}
