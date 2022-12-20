import { Component} from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
})
export class Grafica1Component{
  public labels1: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
  public data = [
       [ 10, 15, 40 ],   
    ];
}
