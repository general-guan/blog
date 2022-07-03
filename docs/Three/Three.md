# Three

## 场景

```js
let scene = new THREE.Scene();
```

## 相机

## 渲染器

```js
const renderer = new THREE.WebGLRenderer();
```

### 实例属性

#### domElement

一个 canvas，渲染器在其上绘制输出

```ts
domElement: HTMLCanvasElement;
```

### 实例方法

#### render

用相机（camera）渲染一个场景（scene）

```ts
render(scene: Object3D, camera: Camera): void;
```

#### setSize

设置渲染区域尺寸

```ts
setSize(width: number, height: number, updateStyle?: boolean): void;
```

#### setClearColor

设置背景颜色

```ts
setClearColor(color: ColorRepresentation, alpha?: number): void;
```

## 几何体

```js
//长方体 参数：长，宽，高
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径 60  经纬度细分数 40,40
var geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱 参数：圆柱面顶部、底部直径 50,50 高度100 圆周分段数
var geometry = new THREE.CylinderGeometry(50, 50, 100, 25);
// 正八面体
var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);
```

## 控制器

```js
const controls = new OrbitControls(camera, renderer.domElement);
```
