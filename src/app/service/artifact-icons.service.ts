import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtifactIconService {

  getIconClass (artifact: any) {
    let className = "";
    switch (artifact.resourceType) {
      case "field": {
        className += "large fa field fa-cube"
        break;
      }
      case "element": {
        className += "large fa element fa-cubes"
        break;
      }
      case "template": {
        className += "large fa template fa-file-text"
        break;
      }
    }
    return className;
  }

}
