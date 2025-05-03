import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { usePane } from 'src/usePane';
import type { BindingParams, Pane as PaneType, FolderApi, FolderParams, ButtonParams } from 'tweakpane';
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

const PaneContext = createContext<{
  pane: PaneType | null;
  initialValue: Record<string, unknown>;
} | null>(null);

const usePaneContext = () => {
  const pane = useContext(PaneContext);
  if (!pane) {
    throw new Error('PaneContext not found');
  }
  return pane;
};

export const Pane = <T extends Record<string, unknown>>({
  initialValue,
  config,
  children,
}: {
  initialValue?: T;
  config?: PaneConfig;
  children: ReactNode;
}) => {
  const { pane } = usePane({
    defaultConfig: initialValue ?? {},
    ...config,
  });

  return (
    <PaneContext.Provider
      value={{
        pane,
        initialValue: initialValue ?? {},
      }}
    >
      {children}
    </PaneContext.Provider>
  );
};

type BindingProps = {
  name: string;
  onChange: (value: unknown) => void;
} & BindingParams;

export const Binding = ({ name, onChange, ...bindingParams }: BindingProps) => {
  const { pane, initialValue } = usePaneContext();

  useEffect(() => {
    if (!pane) {
      return;
    }

    if (!Object.keys(initialValue).includes(name)) {
      throw new Error(`Name ${name} not found in initialValue`);
    }

    const binding = pane.addBinding(initialValue, name, bindingParams).on('change', ({ value }) => onChange(value));

    return () => {
      if (binding) {
        binding.dispose();
      }
    };
  }, [pane, name]);

  return null;
};

// <---------------------------- Folder ---------------------------->

const FolderContext = createContext<{
  folder: FolderApi | null;
  initialValue: Record<string, unknown>;
} | null>(null);

const useFolderContext = () => {
  const folder = useContext(FolderContext);
  if (!folder) {
    throw new Error('FolderContext not found');
  }
  return folder;
};

type FolderProps = FolderParams & {
  initialValue: Record<string, unknown>;
  children: ReactNode;
};

export const Folder = ({ children, initialValue, ...folderParams }: FolderProps) => {
  const { pane } = usePaneContext();
  const [folder, setFolder] = useState<FolderApi | null>(null);

  useEffect(() => {
    if (!pane) {
      return;
    }

    const folder = pane.addFolder(folderParams);
    setFolder(folder);
    return () => {
      if (folder) {
        folder.dispose();
        setFolder(null);
      }
    };
  }, [pane]);

  if (!folder) {
    return null;
  }

  return <FolderContext.Provider value={{ folder, initialValue }}>{children}</FolderContext.Provider>;
};

export const FolderBinding = ({ name, onChange, ...bindingParams }: BindingProps) => {
  const { folder, initialValue } = useFolderContext();

  useEffect(() => {
    if (!folder) {
      return;
    }
    if (!Object.keys(initialValue).includes(name)) {
      throw new Error(`Folder Name ${name} not found in value`);
    }
    const binding = folder.addBinding(initialValue, name, bindingParams).on('change', ({ value }) => onChange(value));

    return () => {
      if (binding) {
        binding.dispose();
      }
    };
  }, [folder, name]);

  return null;
};

type PaneButtonProps = ButtonParams & {
  onClick: () => void;
};

export const PaneButton = ({ onClick, ...buttonParams }: PaneButtonProps) => {
  const { pane } = usePaneContext();

  useEffect(() => {
    if (!pane) {
      return;
    }

    const button = pane.addButton(buttonParams);
    button.on('click', onClick);

    return () => {
      if (button) {
        button.dispose();
      }
    };
  }, [pane]);

  return null;
};
