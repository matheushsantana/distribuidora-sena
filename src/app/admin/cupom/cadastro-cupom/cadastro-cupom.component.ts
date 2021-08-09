import { Component, OnInit } from '@angular/core';
import { Cupom } from 'src/app/cupom/cupom';
import { CupomService } from 'src/app/cupom/cupom.service';

@Component({
  selector: 'app-cadastro-cupom',
  templateUrl: './cadastro-cupom.component.html',
  styleUrls: ['./cadastro-cupom.component.css']
})
export class CadastroCupomComponent implements OnInit {

  cupom: Cupom;

  constructor(private cupomService: CupomService) { }

  ngOnInit(): void {
    this.cupom = new Cupom();
  }

  onSubmit() {
    this.cupomService.insertCupom(this.cupom)
    this.cupom = new Cupom();
  }

}
