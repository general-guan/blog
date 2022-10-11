# canvas

## 方法

### arc（圆）

`CanvasRenderingContext2D.arc()` 是 Canvas 2D API 绘制圆弧路径的方法，圆弧路径的圆心在 (x, y) 位置，半径为 radius，根据 counterclockwise（默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束

```ts
arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
```

| 参数             | 描述                                                  |
| :--------------- | :---------------------------------------------------- |
| x                | 圆弧中心（圆心）的 x 轴坐标                           |
| y                | 圆弧中心（圆心）的 y 轴坐标                           |
| radius           | 圆弧的半径                                            |
| startAngle       | 圆弧的起始点，正 x 轴方向开始计算，单位以弧度表示     |
| endAngle         | 圆弧的终点，单位以弧度表示                            |
| counterclockwise | 可选，如果为 `true`，逆时针绘制圆弧，反之，顺时针绘制 |

### ellipse（椭圆）

`CanvasRenderingContext2D.ellipse()` 是 Canvas 2D API 添加椭圆路径的方法，椭圆的圆心在（x,y）位置，半径分别是 radiusX 和 radiusY，按照 counterclockwise（默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束

```ts
ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
```

| 参数             | 描述                                                  |
| :--------------- | :---------------------------------------------------- |
| x                | 椭圆圆心的 x 轴坐标                                   |
| y                | 椭圆圆心的 y 轴坐标                                   |
| radiusX          | 椭圆长轴的半径                                        |
| radiusY          | 椭圆短轴的半径                                        |
| rotation         | 椭圆的旋转角度，以弧度表示                            |
| startAngle       | 将要绘制的起始点角度                                  |
| endAngle         | 将要绘制的结束点角度                                  |
| counterclockwise | 可选，如果为 `true`，逆时针绘制圆弧，反之，顺时针绘制 |

### quadraticCurveTo（贝塞尔曲线）

`CanvasRenderingContext2D.quadraticCurveTo()` 是 Canvas 2D API 新增二次贝塞尔曲线路径的方法，它需要 2 个点。第一个点是控制点，第二个点是终点，起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变

```ts
quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
```

| 参数 | 描述              |
| :--- | :---------------- |
| cpx  | 控制点的 x 轴坐标 |
| cpy  | 控制点的 y 轴坐标 |
| x    | 终点的 x 轴坐标   |
| y    | 终点的 y 轴坐标   |
