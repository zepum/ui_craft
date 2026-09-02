import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type FlickeringGridProps = React.HTMLAttributes<HTMLDivElement> & {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
};

export const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  width,
  height,
  maxOpacity = 0.3,
  ...props
}: FlickeringGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const memoizedColor = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) return 'rgba(0, 0, 0,';

    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const [red, green, blue] = Array.from(context.getImageData(0, 0, 1, 1).data);
    return `rgba(${red}, ${green}, ${blue},`;
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, canvasWidth: number, canvasHeight: number) => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * pixelRatio;
      canvas.height = canvasHeight * pixelRatio;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      const columns = Math.floor(canvasWidth / (squareSize + gridGap));
      const rows = Math.floor(canvasHeight / (squareSize + gridGap));
      const squares = new Float32Array(columns * rows);

      for (let index = 0; index < squares.length; index += 1) {
        squares[index] = Math.random() * maxOpacity;
      }

      return { columns, rows, squares, pixelRatio };
    },
    [gridGap, maxOpacity, squareSize],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let index = 0; index < squares.length; index += 1) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[index] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (context: CanvasRenderingContext2D, columns: number, rows: number, squares: Float32Array, pixelRatio: number) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const opacity = squares[column * rows + row];
          context.fillStyle = `${memoizedColor}${opacity})`;
          context.fillRect(
            column * (squareSize + gridGap) * pixelRatio,
            row * (squareSize + gridGap) * pixelRatio,
            squareSize * pixelRatio,
            squareSize * pixelRatio,
          );
        }
      }
    },
    [gridGap, memoizedColor, squareSize],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId = 0;
    let lastFrameTime = 0;
    let grid = setupCanvas(canvas, width ?? container.clientWidth, height ?? container.clientHeight);

    const updateCanvasSize = () => {
      const canvasWidth = width ?? container.clientWidth;
      const canvasHeight = height ?? container.clientHeight;
      grid = setupCanvas(canvas, canvasWidth, canvasHeight);
    };
    const animate = (time: number) => {
      const deltaTime = lastFrameTime === 0 ? 0 : (time - lastFrameTime) / 1000;
      lastFrameTime = time;
      updateSquares(grid.squares, deltaTime);
      drawGrid(context, grid.columns, grid.rows, grid.squares, grid.pixelRatio);
      animationFrameId = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    if (isInView) animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [drawGrid, height, isInView, setupCanvas, updateSquares, width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <div {...props} ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};
