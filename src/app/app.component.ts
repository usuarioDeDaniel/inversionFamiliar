import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Inversiones de la familia';
  inversionSelected = 1;
  capInicial = 9021000;
  usdComprados = 2407;
  precioPorDolar = 3748;

  inversionBTC = 600;
  precioCompraBtc = 39005;
  cantidadBTC = 0;
  valorActualInversionBtc = 0;
  inversionAnchor = 1205;
  UstComprados = 1200;
  disponible = 0;
  precioBTC = 0;

  totalActual = 0;

  constructor (private http: HttpClient) { }

  ngOnInit(): void {
    this.disponible = this.usdComprados -this.inversionBTC - this.inversionAnchor;
    this.cantidadBTC = this.inversionBTC / this.precioCompraBtc;
    this.getPrice();
    setInterval(() => {
      this.getPrice(); 
    }, 30000);
  }

  getPrice(){
    this.getPriceHttp().subscribe(res => {
      console.log(res)
      this.precioBTC = res.price;
      this.valorActualInversionBtc = this.precioBTC * this.cantidadBTC;
      this.totalActual = this.valorActualInversionBtc + this.disponible +this.inversionAnchor;
    });
  }

  getPriceHttp(): Observable<any>{
    return this.http.get('https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
  }

}
