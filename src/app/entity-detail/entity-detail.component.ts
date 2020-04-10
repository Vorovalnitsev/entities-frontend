import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../entities.service';
import { Entity } from '../model/entity-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.css']
})
export class EntityDetailComponent implements OnInit {
  public entities;
  public numberParameters = [];
  constructor(
    private entitiesService: EntitiesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    for(let i=1; i<=20; i++){
      this.numberParameters.push(i);
    }
    this.entitiesService
    .getEntityById(this.route.snapshot.paramMap.get('id'))
    .subscribe(entities => {
      this.entities = entities.map( entity => {
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
        return entity;
      });
    });
  }
}
