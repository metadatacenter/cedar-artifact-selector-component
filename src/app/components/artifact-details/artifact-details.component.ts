import {Component, Input} from '@angular/core';
import {JsonSchema} from "../../json-schema.model";
import {ArtifactFlatNode} from "../artifact-selector/artifact-selector.component";

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

  @Input() set selectedNode(_node: object) {
    console.log('Details', _node);
    this.node = _node;
    this.showArtifactDetails = true;
    this.readyToRender = true
  }
  inspect(node: object) {
    const lead = "https://cedar.metadatacenter.orgx/";
    let type;
    console.log('Inspecting node', node);
    // @ts-ignore
    if (node[JsonSchema.resourceType] === 'element') {
      type = 'elements';
    } else { // @ts-ignore
      if (node[JsonSchema.resourceType] === 'template'){
            type = 'templates';
          }
    }
    // @ts-ignore
    let full = lead + type + '/edit/' + node[JsonSchema.atId];
    console.log('Full', full);
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
    console.log('Returning instance num for node', instanceNum, node);
    return false;
  }

  protected readonly JsonSchema = JsonSchema;
}
