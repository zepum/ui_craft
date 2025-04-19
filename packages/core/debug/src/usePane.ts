import { Pane } from 'tweakpane';
import { useEffect, useState } from 'react';
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

type PaneProps = PaneConfig & {
  //   추후에 pane 위치를 드래그할 수 있는 기능을 추가하고, 위치를 로컬 스토리지에 저장해두기 위해서 만들어둚
  paneId?: string;
  draggable?: boolean;
};

/**
 * @description
 * 디버그 설정을 위한 패널을 생성
 * https://tweakpane.github.io/docs/
 *
 * @example
 * ```tsx
 * const pane = usePane();
 * useEffect(() => {
 *   const PARAMS = {
 *     speed: 50,
 *   }
 *   const pane = new Pane();
 *   pane.addBinding(PARAMS, 'speed', {
 *     min: 0,
 *     max: 100,
 *   });
 *  return () => {
 *      pane.dispose();
 *  }
 * }, [pane]);
 *
 * ```
 */
export const usePane = ({ paneId, draggable = true, ...config }: PaneProps): Pane | null => {
  const [pane, setPane] = useState<Pane | null>(null);

  useEffect(() => {
    const pane = new Pane({
      ...config,
    });

    setPane(pane);
  }, []);

  return pane;
};
