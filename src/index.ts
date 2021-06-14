
import { Network } from "vis-network/standalone";
import { interval } from 'rxjs'
// CSS will be automatically injected into the page.
import './styles.css'
import { take, tap, throttle } from "rxjs/operators";

const llamadas = {
  locales: 0,
  evento: 0
}

class Node{

  public canalesDis: number;
  public capacidad: number;
  public ocupado: number

  constructor(capacidad ?: number){
    this.canalesDis = 0;
    this.capacidad = capacidad ? 200: 250;
    this.ocupado = 0;
  }
}

const nodesC: Node[] = [];
const nodeEvent = new Node();

for(let i = 0; i < 7; i++){
  nodesC.push(new Node());
}

const maxLocales = 10780;
const maxEvento = 10000;

const contador = document.querySelector('#contador') || document;
const datos = document.querySelector('#datos') || document.body;
const tabla = document.querySelector('#tables') || document.body;

const timer$ = interval(60).pipe( take(3601) );

const startButton = document.querySelector('#start');
// create an array with nodes
var nodes = [
    { id: 1, value: 16, physics: false, label: "nodo 1", x: -500, y: 0 },
    { id: 2, value: 16, physics: false, label: "nodo 2", x: 0, y: 0 , color: { background: 'yellow' }},
    { id: 3, value: 16, physics: false, label: "nodo 3", x: 0, y: 300 },
    { id: 4, value: 16, physics: false, label: "nodo 4", x: 50, y: -100 },
    { id: 5, value: 16, physics: false, label: "nodo 5", x: -350, y: 200 },
    { id: 6, value: 16, physics: false, label: "nodo 6", x: -200, y: -100 },
    { id: 7, value: 16, physics: false, label: "nodo 7", x: 175, y: 0 },
  ];

  // create connections between people
  // value corresponds with the amount of contact between two people
  var edges: any[] = [
    // { from: 2, to: 8, value: 4 },
    { from: 2, to: 4, value: 6 },
    { from: 2, to: 3, value: 6 },
    { from: 3, to: 1, value: 6 },
    { from: 4, to: 6, value: 6 },
    { from: 6, to: 1, value: 6 },
    { from: 2, to: 5, value: 6 },
    { from: 5, to: 1, value: 6 },
    { from: 7, to: 3, value: 6 },
    { from: 7, to: 4, value: 6 },
  ];

  // Instantiate our network object.
  var container = document.getElementById("mynetwork") || document.body;
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    nodes: {
      shape: "dot",
      scaling: {
        customScalingFunction: function (min: any, max: any, total: any, value: any) {
          return value / total;
        },
        min: 5,
        max: 150,
      },
    },
    physics:{
        enabled: false,
    }
  };
    var network = new Network(container, data, options);

startButton?.addEventListener('click', (event: any) => {
  timer$.pipe( tap( (res: any) => {
    const minutos = res % 60;
    contador.textContent = `${Math.floor(res/60) < 10? `0${Math.floor(res/60)}`: Math.floor(res/60)}:${Math.round(60*(minutos/100)) < 10 ? `0${Math.round(60*(minutos/100))}` : Math.round(60*(minutos/100))}`;
    }
  ) ).subscribe((res: number) => {
    nodesC[3].ocupado = nodesC[3].ocupado + 30;
    const porcentaje = nodesC[3].ocupado /  nodesC[3].capacidad
    datos.innerHTML = `
      <p> Porcentaje de la celda pricipal ocupada: ${ Math.floor(porcentaje) < 10? `0${Math.floor(porcentaje)}`: Math.floor(porcentaje) }% </p>
    `
    if(porcentaje > 100){
      tabla.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      `
    }
  });
})