import {Component, Input} from '@angular/core';
import {JsonSchema} from "../../json-schema.model";
import {ArtifactIconService} from "../../service/artifact-icons.service";

@Component({
  selector: 'app-artifact-details',
  templateUrl: './artifact-details.component.html',
  styleUrls: ['./artifact-details.component.scss']
})

export class ArtifactDetailsComponent{
  // @ts-ignore
  node;
  showArtifactDetails = false;
  readyToRender: boolean = false;
  numOfInstances: number = 0;

  constructor(private _ArtifactIcons : ArtifactIconService) {}


  @Input() set selectedNode(_node: object) {
    this.node = _node;
    this.showArtifactDetails = true;
    this.readyToRender = true
  }

  inspect(node: object) {
    const base = window.location.origin;
    let type;
    // @ts-ignore
    if (node[JsonSchema.resourceType] === 'element') {
      type = 'elements';
    } else { // @ts-ignore
      if (node[JsonSchema.resourceType] === 'template'){
        type = 'templates';
      }
    }
    // @ts-ignore
    let full = base + '/' + type + '/edit/' + node[JsonSchema.atId];
    window.open(full, '_blank');
  }
  getPath(path: string): string {
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex === -1) {
      return path;
    }
    return path.substring(0, lastSlashIndex);
  }

  getNumOfInstances(node: object) {
    // @ts-ignore
    const instanceNum = node[JsonSchema.numberOfInstances];
    if (instanceNum > 0) {
      return true;
    }
    return false;
  }

  getArtifactIcon() {
   return this._ArtifactIcons.getIconClass(this.node);
  }

  protected readonly JsonSchema = JsonSchema;
}
