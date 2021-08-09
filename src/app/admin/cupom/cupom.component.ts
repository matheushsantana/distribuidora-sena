import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CupomService } from 'src/app/cupom/cupom.service';

@Component({
  selector: 'app-cupom',
  templateUrl: './cupom.component.html',
  styleUrls: ['./cupom.component.css']
})
export class CupomComponent implements OnInit {

  cupons: Observable<any>;
  cupomPesquisado: any;

  constructor(private cupomService: CupomService) { }

  ngOnInit(): void {

    this.cupons = this.cupomService.getAllCupons()
  }

  deletarCupom(key){
    this.cupomService.deleteCupom(key)
  }

}
