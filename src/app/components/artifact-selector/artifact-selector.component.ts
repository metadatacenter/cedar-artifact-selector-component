import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ArtifactDetailsService} from "../../service/artifact-details.service";

export class TreeNode {
  children?: TreeNode[];
  item: string | undefined;
  visible: boolean = false;
  checkbox: boolean = false;
  checked: boolean = false;
  isCategory = false;
}

export class ArtifactFlatNode {
  item: string | undefined;
  level: number | undefined;
  expandable: boolean = false;
  visible: boolean = false;
  checkbox: boolean = false;
  checked: boolean = false;
  isCategory = false;
}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TreeNode[]>([]);

  originalNodeMap = new Map<TreeNode, object>();

  fullData: object = {};

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  get originalData(): object {
    return this.fullData;
  }

  initialize(treeData: object) {

    this.fullData = treeData;
    const data = this.buildFileTree(treeData, 0);
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TreeNode[] {
    return Object.keys(obj).reduce<TreeNode[]>((accumulator, key) => {

      const value = obj[key];
      const node = new TreeNode();
      if ((key === 'elements' || key === 'templates') && value && Object.keys(value).length) {
        node.isCategory = true;
        node.visible = true;
      }
      if (obj[key] && obj[key]['schema:name']){
        node.item = obj[key]['schema:name'];
        node.visible = true;
        node.checkbox = true;
        this.originalNodeMap.set(node, obj[key]);
      }
      else {
        node.item = key;
      }

      if (value != null) {
        if (typeof value === 'object') {
          if('operation' in value && value['operation'] === 'update'){
            node.checked = true;
          }
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-artifact-selector',
  templateUrl: 'artifact-selector.component.html',
  styleUrls: ['artifact-selector.component.scss'],
  providers: [ChecklistDatabase],
})
export class ArtifactSelectorComponent {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ArtifactFlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, ArtifactFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ArtifactFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ArtifactFlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, ArtifactFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, ArtifactFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ArtifactFlatNode>(true /* multiple */);

  // @ts-ignore
  nodeDetails;
  // @ts-ignore
  selectedNode: ArtifactFlatNode = null;

  constructor(private _database: ChecklistDatabase, private _artifactDetails: ArtifactDetailsService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      // @ts-ignore
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    // @ts-ignore
    this.treeControl = new FlatTreeControl<ArtifactFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  @Output() treeSelectionChanged = new EventEmitter<object>();
  @Output() nodeSelectionChanged = new EventEmitter<object>();

  @Input() get artifactsToUpdate(): object {
    return this._database.originalData;
  }
  @Input() set treeData(data: object){
    this._database.initialize(data);
    this.treeControl.expandAll();
    // Need to null the selected artifact details here since ngOnDestroy is not guaranteed to be called
    this.nodeDetails = null;
  }

  @Input() set artifactDetails(data: any){
    this.nodeDetails = data;
  }

  getLevel = (node: ArtifactFlatNode) => node.level;

  isExpandable = (node: ArtifactFlatNode) => node.expandable;
// @ts-ignore
  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: ArtifactFlatNode): boolean => _nodeData.expandable;

  // @ts-ignore
  isVisible = (node: ArtifactFlatNode): boolean => node.visible;


  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item ? existingNode : new ArtifactFlatNode();
    flatNode.item = node.item;
    flatNode.visible = node.visible;
    flatNode.checkbox = node.checkbox;
    flatNode.checked = node.checked;
    flatNode.level = level;
    flatNode.isCategory = node.isCategory;
    flatNode.expandable = !!node?.children?.some((node)=>node.visible);
    // flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ArtifactFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Toggle the tree node. */
  treeNodeSelectionToggle(event: MatCheckboxChange, node: ArtifactFlatNode): void {
    const treeNode = this.flatNodeMap.get(node);
    if(!treeNode) {
      console.error('Node not found');
      return;
    }
    const originalNode = this._database.originalNodeMap.get(treeNode) || {};
    if (event.checked) {
      // @ts-ignore
      originalNode['operation'] = 'update';
    } else {
      // @ts-ignore
      originalNode['operation'] = 'do-not-update';
    }

    this.checklistSelection.toggle(node);

    const hadi = this._database.originalData;

    this.treeSelectionChanged.emit(this._database.originalData);
  }

  handleNodeSelected(node: ArtifactFlatNode) {
    this.selectedNode = node;
    const treeNode = this.flatNodeMap.get(node);
    // @ts-ignore
    const selectedArtifact = this._database.originalNodeMap.get(treeNode);
    const obj = {};
    // @ts-ignore
    obj.type = selectedArtifact.resourceType;
    // @ts-ignore
    obj.atId = selectedArtifact['@id'];
    this.nodeSelectionChanged.emit(obj)
  }
}
