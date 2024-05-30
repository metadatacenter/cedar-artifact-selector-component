import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtifactDetailsService {

  private nodeDetails = new BehaviorSubject({});
  selectedNodeDetails = this.nodeDetails.asObservable();

  constructor() { }

  selectNode(node: object) {
    console.log('Serviiissss');
    this.nodeDetails.next(node);
  }
}
