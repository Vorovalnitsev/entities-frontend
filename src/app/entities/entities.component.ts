import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../entities.service';
import { Entity } from '../model/entity-model';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  public actualEntities: Entity[];
  public numberParameters = [];
  public filters = [];
  public isPending = false;
  constructor(private entitiesService: EntitiesService) { }

  ngOnInit() {
    for(let i=1; i<=20; i++){
      this.numberParameters.push(i);
      this.filters.push({
        idColumn: `parameter${i}`,
        conditions: ['sum','min','max','avg'],
        condition: 'sum'
      })
    }
    setInterval(() => {this.getActualEntities()}, 1000)
  }

  getActualEntities(){
    if (this.isPending === false){
      this.isPending = true;
      this.entitiesService.getActualEntities().subscribe(entities => {
        this.actualEntities = entities.map( entity => {
          let parameters = Object.keys(entity).filter(item => item.indexOf('parameter') + 1 > 0
          );
          for(let i=0; i < parameters.length; i++){
            if(entity[parameters[i]] < 0){
              entity[`backgroundColor${i + 1}`] = `rgba(255,140,0,${Math.abs(parseFloat(entity[parameters[i]]))})`;
              entity[`color${i + 1}`] = `rgb(0,0,0)`; 
            }
            if(entity[parameters[i]] > 0){
              entity[`backgroundColor${i + 1}`] = `rgba(0,0,0,${Math.abs(parseFloat(entity[parameters[i]]))})`; 
              entity[`color${i + 1}`] = `rgb(255,255,255)`;
              if (entity[parameters[i]] < 0.5){
                entity[`color${i + 1}`] = `rgb(0,0,255)`;
              }            
            }
            if(entity[parameters[i]] === 0){
              entity[`backgroundColor${i + 1}`] = `rgba(255,255,255,${Math.abs(parseFloat(entity[parameters[i]]))})`;
              entity[`color${i + 1}`] = `rgb(0,0,0)`; 
            }
          }
          this.isPending = false;
          return entity;
        });
        this.refreshFilters();  
      });
    }

  }

  refreshFilters(){
    this.filters = this.filters.map(item => { 
        if(item.condition === 'sum'){
          item.conditionValue = this.actualEntities.reduce((accumulator, currentValue)=>{
            return accumulator + currentValue[item.idColumn];
          },0)
        }
        if(item.condition === 'avg'){
          item.conditionValue = this.actualEntities.reduce((accumulator, currentValue)=>{
            return accumulator + currentValue[item.idColumn];
          },0);
          item.conditionValue = item.conditionValue / 20;
        }
        if(item.condition === 'min'){
          item.conditionValue = this.actualEntities.reduce((accumulator, currentValue)=>{
            let min = accumulator;
            if(min > currentValue[item.idColumn]){
              min = currentValue[item.idColumn];
            }
            return min;
          },0);
        }

        if(item.condition === 'max'){
          item.conditionValue = this.actualEntities.reduce((accumulator, currentValue)=>{
            let max = accumulator;
            if(max < currentValue[item.idColumn]){
              max = currentValue[item.idColumn];
            }
            return max;
          },0);
        }
      return item;
    })
  }

  onChangeCondition(condition, idColumn){
    this.filters = this.filters.map(item => {
      if( item.idColumn === idColumn ){
        item.condition = condition;
      }
      return item;
    })
    this.refreshFilters();
  }
}
